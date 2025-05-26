from models.database import db
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class Company(db.Model):
    __tablename__ = 'company'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    job_offers = db.relationship('Offer', backref='company', lazy=True)
    
    def __init__(self, name, description, user_id):
        self.name = name
        self.description = description
        self.user_id = user_id

    def serialize(self):
        return {
            'id': self.id,
            'description': self.description,
            'user_id': self.user_id
        }
