import os

class Development(object):
	"""
	Dev config
	"""
	DEBUG = True
	TESTING = False
	SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')

class Production(object):
	"""
	Prod config
	"""
	DEBUG = False
	TESTING = False
	SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')

app_config = {
	'development': Development,
	'production': Production,
}