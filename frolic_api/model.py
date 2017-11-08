# This file is used for all the connections and setting up of tables in frolic


from sqlalchemy import Column, ForeignKey, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from config import DB_URI
from passlib.apps import custom_app_context as pwd_context

Base = declarative_base()

# Class for category table


class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)

    '''Property to serialize the returned the data'''
    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }


# Class for user table


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    email = Column(String(80))
    password = Column(String(500))

    def hash_password(self, password):
        self.password = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password)

# Class for item table


class Item(Base):
    __tablename__ = 'items'
    id = Column(Integer, primary_key=True)
    title = Column(String(80), nullable=False)
    description = Column(String(500))
    long_description = Column(String(2000))
    item_photo = Column(String(2000))
    category_item_fkey = Column(Integer, ForeignKey('categories.id'))
    category = relationship(Category)
    item_user_fkey = Column(Integer, ForeignKey('users.id'))
    user = relationship(User)

    # property to serialize the returned the data
    @property
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'cat_id': self.category_item_fkey,
            'item_photo': self.item_photo,
            'user_id': self.item_user_fkey
        }

    # property to serialize the returned the data with long description
    @property
    def serialize_item_details(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'long_description': self.long_description,
            'item_photo': self.item_photo
        }


# create the engine with database url

engine = create_engine(DB_URI)
Base.metadata.create_all(engine)