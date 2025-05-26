from flask import Flask
from flasgger import Swagger
from routes.auth import auth_bp 
from routes.application import application_bp
from routes.candidat import candidat_bp
from routes.candidatskill import candidatskills_bp
from routes.company import company_bp
from routes.jobofferskill import offerskill_bp
from routes.offer import offer_bp
from routes.skills import skills_bp
#from routes.notify import match_bp
import os
import models
from dotenv import load_dotenv 
from flask_cors import CORS
from flask_migrate import Migrate
from config import TestingConfig, ProductionConfig, DevelopmentConfig
from models.database import db
load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

def create_app(config_name='development'):
    app = Flask(__name__)
    
    if config_name == 'development':
        app.config.from_object(DevelopmentConfig)
    elif config_name == 'production':
        app.config.from_object(ProductionConfig)
    elif config_name == 'testing':
        app.config.from_object(TestingConfig)
        
    # CORS Configuration
    #cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    cors = CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}})
    db.init_app(app)
    migrate = Migrate(app, db)
    swagger = Swagger(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(application_bp)
    app.register_blueprint(candidat_bp)
    app.register_blueprint(candidatskills_bp)
    app.register_blueprint(company_bp)
    app.register_blueprint(offerskill_bp)
    app.register_blueprint(offer_bp)
    app.register_blueprint(skills_bp)
    #app.register_blueprint(match_bp)
    return app

if __name__ == "__main__":
    app = create_app('development')
    app.run(debug=True)
    
