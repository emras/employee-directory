
from flask_sqlalchemy import SQLAlchemy

# initialize our db
db = SQLAlchemy()

from .models import UserModel, UserSchema