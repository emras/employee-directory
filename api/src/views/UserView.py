from flask import request, json, Response, Blueprint, jsonify, g
from ..models import UserModel, UserSchema

user_api = Blueprint('users', __name__)
user_schema = UserSchema()

# YES
@user_api.route('/', methods=['POST'])
def create():
  """
  Create User Function
  """
  req_data = request.get_json()
  try:
    data = user_schema.load(req_data)
  except:
    return custom_response('Error adding new user', 400)

  user = UserModel(data)

  user.save()

  user_data = user_schema.dump(user)
  token = user_data.get('id')
  return custom_response({'jwt_token': token}, 201)

# YES
@user_api.route('/<int:user_id>', methods=['GET'])
def get_a_user(user_id):
  """
  Get a single user
  """
  user = UserModel.get_one_user(user_id)
  if not user:
    return custom_response({'error': 'user not found'}, 404)
  
  user_user = user_schema.dump(user)
  return custom_response(user_user, 200)

# YES
@user_api.route('/', methods=['GET'])
def get_all():
  users = UserModel.get_all_users()
  ser_users = user_schema.dump(users, many=True)
  return custom_response(ser_users, 200)

# YES
@user_api.route('/<int:user_id>', methods=['PUT'])
def update(user_id):
  """
  Update me
  """
  req_data = request.get_json()

  user = UserModel.get_one_user(user_id)
  if not user:
    return custom_response({'error':'user not found'}, 404)
  data = user_schema.dump(user)

  data = user_schema.load(req_data, partial=True)

  user.update(data)
  ser_user = user_schema.dump(user)
  return custom_response(ser_user, 200)

# YES
@user_api.route('/<int:user_id>', methods=['DELETE'])
def delete(user_id):
  """
  Delete a user
  """
  user = UserModel.get_one_user(user_id)
  if not user:
    return custom_response({'error':'user not found'}, 404)
  data = user_schema.dump(user)

  user.delete()
  return custom_response({'message': 'deleted'}, 204)


def custom_response(res, status_code):
  """
  Custom Response Function
  """
  return Response(
    headers={"Access-Control-Allow-Origin":"http://localhost:3000","Access-Control-Allow-Methods":"GET, POST, DELETE, PUT"},
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )