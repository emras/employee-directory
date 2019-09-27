import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from src.app import create_app, db


from src.config import app_config
from flask import Flask, Blueprint
from src.models import UserModel, UserSchema
import requests
from src.views.UserView import user_api as user_blueprint
import random

env_name = os.getenv('FLASK_ENV')
app = create_app(env_name)

migrate = Migrate(app=app, db=db)

manager = Manager(app=app)


@manager.command
def seed():

  departments = ['Sales','Engineering','Marketing','Human Resources']
  titles = ['Junior','Lead','Senior']

  app = Flask(__name__)
  with app.app_context():
	  app.config.from_object(app_config[env_name])

	  # initializing bcrypt and db
	  db.init_app(app)
	  
	  user_api = Blueprint('users', __name__)
	  user_schema = UserSchema()


	  #load source data
	  url = 'https://randomuser.me/api/'

	  i = 1 
	  while i <= 20:
	    department = departments[random.randint(0,3)]
	    title = titles[random.randint(0,2)] + " " + department + " Associate"

	    r = requests.get(url)
	    data = r.json()["results"][0]
	    user_data = {
	      "name": data["name"]["first"] + " " + data["name"]["last"],
	      "location": data["location"]["city"] +", "+ data["location"]["state"],
	      "title": title,
	      "department": department,
	      "email": data["email"],
	      "picture": data["picture"]["large"]
	    }
	    user = UserModel(user_data)
	    user.save()
	    i+=1

manager.add_command('db', MigrateCommand)
if __name__ == '__main__':
  manager.run()



