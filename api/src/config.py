import os

class Development(object):
	"""
	Dev config
	"""
	DEBUG = True
	TESTING = False
	JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
	SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')

class Production(object):
	"""
	Prod config
	"""
	DEBUG = False
	TESTING = False
	SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
	JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

app_config = {
	'development': Development,
	'production': Production,
}