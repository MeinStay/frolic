# This file is used for all the database operations in frolic project


import os
from flask import Flask, request, jsonify, send_from_directory, g
from flask_httpauth import HTTPBasicAuth
from werkzeug.utils import secure_filename
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from model import Base, Category, Item, User
from config import DB_URI, UPLOAD_FOLDER, ALLOWED_EXTENSIONS, NO_IMAGE,\
    CLIENT_ID, APPLICATION_NAME


# Google signin related imports

from flask import session as login_session
from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
import httplib2
import json
from flask import make_response
import requests


# create the engine with database URI
engine = create_engine(DB_URI)
DBSession = sessionmaker(bind=engine)
session = DBSession()


# create the app
app = Flask(__name__, static_url_path="", static_folder="items_photos")
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
auth = HTTPBasicAuth()

# @params none
# @description This google signin for users
# @method POST


@app.route('/gconnect', methods=['POST'])
def g_connect():
    try:
        code = request.data
        # Upgrade the authorization code into a credentials object
        oauth_flow = flow_from_clientsecrets('client_secrets.json', scope='')
        oauth_flow.redirect_uri = 'http://localhost:9001'
        credentials = oauth_flow.step2_exchange(code)

    except FlowExchangeError as e:
        return jsonify(message="Some unexpected error occurred", code="7864")

    # Check that the access token is valid.
    access_token = credentials.access_token
    url = ('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=%s'
           % access_token)
    h = httplib2.Http()
    result = json.loads(h.request(url, 'GET')[1])
    # If there was an error in the access token info, abort.
    if result.get('error') is not None:
        response = make_response(json.dumps(result.get('error')), 500)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Verify that the access token is used for the intended user.
    gplus_id = credentials.id_token['sub']
    if result['user_id'] != gplus_id:
        response = make_response(
            json.dumps("Token's user ID doesn't match given user ID."), 401)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Verify that the access token is valid for this app.
    if result['issued_to'] != CLIENT_ID:
        response = make_response(
            json.dumps("Token's client ID does not match app's."), 401)
        print "Token's client ID does not match app's."
        response.headers['Content-Type'] = 'application/json'
        return response

    stored_access_token = login_session.get('access_token')
    stored_gplus_id = login_session.get('gplus_id')
    if stored_access_token is not None and gplus_id == stored_gplus_id:
        response = make_response(json.dumps('Current user is connected.'),
                                 200)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Store the access token in the session for later use.
    login_session['access_token'] = credentials.access_token
    login_session['gplus_id'] = gplus_id

    # Get user info
    userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
    params = {'access_token': credentials.access_token, 'alt': 'json'}
    answer = requests.get(userinfo_url, params=params)

    data = answer.json()

    login_session['username'] = data['name']
    login_session['picture'] = data['picture']
    login_session['email'] = data['email']

    return jsonify(message="valid user", code="0000", is_authentic=True,
                   username=login_session['email'])


# @params none
# @description This method registers user
# @method POST


@app.route('/register', methods=['POST'])
def create_user():
    try:
        fullname = request.json.get('name')
        username = request.json.get('email')
        password = request.json.get('password')

        # check whether username and password are blank
        if username is None or password is None:
            return jsonify(message="problem in request", code="7865")

        # check whether username already exists
        if session.query(User).filter_by(email=username).first() is not None:
            return jsonify(message="User account already exists", code="7866")

        # create new user
        new_user = User(name=fullname, email=username)
        new_user.hash_password(password)
        session.add(new_user)
        session.commit()
        return jsonify(message="New user account created successfully",
                       code="0000")

    except:
        return jsonify(message="Some unexpected error occurred", code="7864")


# @params none
# @description This method checks username and password for login
# @method POST


@app.route('/login', methods=['POST'])
def verify_user():
    try:
        username = request.json.get('email')
        password = request.json.get('password')

        # check whether username and password are blank
        if username is None or password is None:
            return jsonify(message="request error", code="7861")

        # retrieve the user record based on username
        user_details = session.query(User).filter_by(email=username).first()

        # check whether user record is found
        if user_details is None:
            return jsonify(message="User account doesn't exists", code="7862")

        user = User(password=user_details.password)

        # validate user
        if user.verify_password(password) is True:
            return jsonify(message="valid user", code="0000",
                           is_authentic=True, username=user_details.id)
        else:
            return jsonify(message="invalid user", code="7863")

    except:
        return jsonify(message="error", code="7864")


# @params none
# @description This method returns all the categories in the database
# @method GET


@app.route('/categories/all', methods=['GET'])
def get_categories():
    try:
        result = session.query(Category).all()
        return jsonify(categories=[i.serialize for i in result])

    except:
        return jsonify(message="error")


# @params none
# @description This method returns the items in the database
# method GET


@app.route('/items/all', methods=['GET'])
def get_items():
    try:
        result = session.query(Item).all()
        return jsonify(items=[i.serialize for i in result])

    except:
        return jsonify(message="error")

# @params none
# @description This method returns the items in the database
# method GET


@app.route('/items/<int:item_id>', methods=['GET'])
def get_items_by_id(item_id):
    try:
        result = session.query(Item).filter_by(id=item_id).first()
        cat_data = (
                    session.query(Category)
                    .filter_by(id=result.category_item_fkey)
                    .first()
                   )
        category = Category(name=cat_data.name)
        return jsonify(items=result.serialize_item_details,
                       category=category.name)

    except:
        return jsonify(message="error")


# @params none
# @description This method gets items by category
# @method GET


@app.route('/items/category/<int:category_id>', methods=['GET'])
def get_items_by_category(category_id):
    try:
        result = (
                  session.query(Item)
                  .filter_by(category_item_fkey=category_id)
                  .all()
                 )
        return jsonify(items=[i.serialize for i in result])
    except:
        return jsonify(message="error")


# @params none
# @description This method registers user
# @method POST


@app.route('/items/add', methods=['POST'])
@auth.login_required
def add_items():
    try:
        category = request.json.get('category')
        item_name = request.json.get('name')
        short_desc = request.json.get('shortdesc')
        long_desc = request.json.get('longdesc')
        picture_name = request.json.get('pictureName')
        user_id = request.json.get("username")

        # check whether inputs are blank
        if not picture_name or picture_name is None:
            picture_name = NO_IMAGE
        print picture_name
        # check whether category is present in the database
        category_row = session.query(Category).filter_by(name=category).first()
        if category_row is None:
            return jsonify(message="Category doesn't exists", code="7867")

        # insert new item
        new_item = Item(
            category_item_fkey=category_row.id,
            title=item_name,
            description=short_desc,
            long_description=long_desc,
            item_photo=picture_name,
            item_user_fkey=user_id
        )
        session.add(new_item)
        session.commit()

        return jsonify(message="New item created successfully", code="0000")

    except:
        return jsonify(message="Some unexpected error occurred", code="7864")


# @params filename
# @description This method checks for allowed extensions of a file
# method none


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() \
        in ALLOWED_EXTENSIONS


# @params none
# @description This method uploads item's photo
# @method POST


@app.route('/upload', methods=['POST'])
def upload_item_picture():
    try:
        file_obj = request.files['file']
        # upload the image
        if file_obj and allowed_file(file_obj.filename):
            filename = secure_filename(file_obj.filename)
            file_obj.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return jsonify(message="File uploaded successfully", code="0000")
        else:
            return jsonify(message="Error occurred in file upload",
                           code="7868")

    except:
        return jsonify(message="Some unexpected error occurred", code="7864")


# @params none
# @description This method updates items
# @method POST

@app.route('/items/edit', methods=['POST'])
@auth.login_required
def edit_items():
    try:
        category = request.json.get('category')
        item_name = request.json.get('title')
        short_desc = request.json.get('description')
        long_desc = request.json.get('long_description')
        picture_name = request.json.get('pictureName')
        item_id = request.json.get("id")
        user_id = request.json.get("username")

        # check whether inputs are blank
        if not picture_name or picture_name is None:
            picture_name = NO_IMAGE

        # check whether category is present in the database
        category_row = session.query(Category).filter_by(name=category).first()
        if category_row is None:
            return jsonify(message="Category doesn't exists", code="7867")

        # check whether user is authorized to edit this item
        user_row = (
                    session.query(Item).
                    filter_by(item_user_fkey=user_id).
                    first()
                   )
        if user_row is None:
            return jsonify(message="Your are not authorized", code="7867")

        edited_item = session.query(Item).filter_by(id=item_id).one()
        if edited_item is None:
            return jsonify(message="Item doesn't exists", code="7867")

        # update item data
        edited_item.category_item_fkey = category_row.id
        edited_item.title = item_name
        edited_item.description = short_desc
        edited_item.long_description = long_desc
        edited_item.item_photo = picture_name
        edited_item.item_user_fkey = user_id
        session.add(edited_item)
        session.commit()
        return jsonify(message="Item updated successfully", code="0000")

    except:
        return jsonify(message="Some unexpected error occurred", code="7864")


# @params none
# @description This method deletes items
# @method POST


@app.route('/items/delete', methods=['POST'])
@auth.login_required
def delete_items():
    try:
        item_id = request.json.get("itemId")
        item_to_delete = session.query(Item).filter_by(id=item_id).one()
        user_id = request.json.get("username")

        # check whether item is present in the database
        if item_to_delete is None:
            return jsonify(message="Item doesn't exists", code="7867")

        # check whether user is authorized to delete this item
        user_row = (
                    session.query(Item)
                    .filter_by(item_user_fkey=user_id)
                    .first()
                   )
        if user_row is None:
            return jsonify(message="Your are not authorized", code="7867")

        session.delete(item_to_delete)
        session.commit()
        return jsonify(message="Item deleted successfully", code="0000")

    except:
        return jsonify(message="Some unexpected error occurred", code="7864")


# @params none
# @description This method gets the item images
# @method POST


@app.route('/uploads/<path:filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename,
                               as_attachment=True)


# Function to verify password and username on each request

@auth.verify_password
def verify_password(username, password):
    username = request.json.get('username')
    user = session.query(User).filter_by(id=username).first()
    if not user:
        return False
    return True


# Run the app

if __name__ == "__main__":
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000, threaded=True)
