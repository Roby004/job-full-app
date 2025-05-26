from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash
from models.database import db
from sqlalchemy.orm import relationship
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)  # allows unlimited length
    role = db.Column(db.String(20), nullable=False)  # 'recruteur' ou 'candidat'

    company = db.relationship('Company', backref='user', uselist=False)
    candidate_profile = db.relationship('Candidat', backref='user', uselist=False)

    def __init__(self, email, password, role):
        self.email = email
        self.role = role
        self.password = generate_password_hash(password)
       # self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    
    def serialize(self):
        return {
            "id": str(self.id),
            "email": self.email,
            "role": self.role
        }

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<Token {self.token}>"
