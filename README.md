### SET UP:
#### Install Python, Pipenv and Postgres

#### To install backend dependencies, switch to api directory and run:
    pipenv shell
    pipenv install
    pip install Flask-Script
    pip install Flask-Cors

#### Set environment variables:
    export DATABASE_URL=<your_postgres_url>
    export FLASK_ENV=development

#### To intialize and seed database run:
    python manage.py db init
    python manage.py db migrate
    python manage.py db upgrade
    python manage.py seed

#### To install frontend dependencies, swith to client directory and run:
    npm install
    npm install concurrently
    npm install react-scripts

### Start:
#### Within client directory, run:
    npm run start
