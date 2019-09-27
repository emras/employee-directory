from marshmallow import fields, Schema

import datetime
from . import db

class UserModel(db.Model):
  """
  User Model
  """

  # table name
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(128), nullable=False)
  title = db.Column(db.String(128), nullable=True)
  department = db.Column(db.String(128), nullable=True)
  location = db.Column(db.String(128), nullable=True)
  picture = db.Column(db.String(128), nullable=True)
  email = db.Column(db.String(128), nullable=True, unique=True)
  created_at = db.Column(db.DateTime)
  modified_at = db.Column(db.DateTime)

  # class constructor
  def __init__(self, data):
    """
    Class constructor
    """

    self.name = data.get('name')
    self.title = data.get('title')
    self.department = data.get('department')
    self.location = data.get('location')
    self.picture = data.get('picture')
    self.email = data.get('email')
    self.created_at = datetime.datetime.utcnow()
    self.modified_at = datetime.datetime.utcnow()

  def save(self):
    db.session.add(self)
    db.session.commit()

  def update(self, data):
    for key, item in data.items():
      setattr(self, key, item)
    self.modified_at = datetime.datetime.utcnow()
    db.session.commit()

  def delete(self):
    db.session.delete(self)
    db.session.commit()

  @staticmethod
  def get_all_users():
    return UserModel.query.order_by("name").all()

  @staticmethod
  def get_one_user(id):
    return UserModel.query.get(id)

  @staticmethod
  def get_users_by_search_string(search_string):
    return UserModel.query.filter(UserModel.name.contains(search_string))
  
  def __repr(self):
    return '<id {}>'.format(self.id)


class UserSchema(Schema):
  """
  User Schema
  """
  id = fields.Int(dump_only=True)
  name = fields.Str(required=True)
  title = fields.Str(required=False)
  department = fields.Str(required=False)
  location = fields.Str(required=False)
  picture = fields.Str(required=False)
  email = fields.Str(required=False)
  created_at = fields.DateTime(dump_only=True)
  modified_at = fields.DateTime(dump_only=True)