from models.database import db
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime


class Offer(db.Model):
    __tablename__ = 'offer'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(100))
    posted_at = db.Column(db.DateTime, default=datetime.utcnow)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    #nouvelles colonne pour la table offer
    statut_offre = db.Column(db.Boolean, default=False) 
    category = db.Column(db.String(150), nullable=False)
    type_offre = db.Column(db.String(50), nullable=False)

    skills_required = db.relationship('OfferSkill', backref='Offer', lazy=True)
    applications = db.relationship('Application', backref='Offer', lazy=True)
    
    def __init__(self, title, description, location, posted_at, company_id,statut_offre, category, type_offre):
        self.title = title
        self.description = description
        self.location = location
        self.posted_at = posted_at
        self.company_id = company_id
        self.statut_offre = statut_offre
        self.category = category
        self.type_offre = type_offre

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'posted_at': self.posted_at,
            'company_id': self.company_id,
             'company': {
            'id': self.company.id,
            'name': self.company.name,
            'description': self.company.description,
        } if self.company else None,
            'statut_offre': self.statut_offre,
            'category': self.category,
            'type_offre': self.type_offre,
        }
