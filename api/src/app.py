from flask import Flask

from flask_cors import CORS

from .config import app_config
from .models import db

# import user_api blueprint
from .views.UserView import user_api as user_blueprint

def create_app(env_name):
  """
  Create app
  """
  
  # app initiliazation
  app = Flask(__name__)
  CORS(app)

  app.config.from_object(app_config[env_name])

  # initializing bcrypt and db
  db.init_app(app)

  app.register_blueprint(user_blueprint, url_prefix='/api/users')

  return app
