# Naya QA
## SETUP
- rename .env.example to .env
- python3 -m venv env
- pip install -r requirements.txt
## MIGRATIONS
- CREATE MODEL (models.py)
- CREATE DATABASE
- flask db init (initial)
- flask db migrate -m "Initial migration"
- flask db upgrade
## RUN
- export FLASK_DEBUG=1
- flask run