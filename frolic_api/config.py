# This file defines all the important constants
import json

DB_URI = "postgresql:///frolic"
UPLOAD_FOLDER = 'items_photos'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
NO_IMAGE = "no-image.png"
CLIENT_ID = json.loads(open('client_secrets.json', 'r').read())['web']['client_id']
APPLICATION_NAME = "Frolic App"
