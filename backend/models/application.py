from models.database import db
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime


class Application(db.Model):
    __tablename__ = 'application'

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidat.id'), nullable=False)
    job_offer_id = db.Column(db.Integer, db.ForeignKey('offer.id'), nullable=False)
    status = db.Column(db.String(50), default='en attente')  # ou "acceptée", "refusée"
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)

    
    def __init__(self, candidate_id, job_offer_id, status, applied_at):
        self.candidate_id = candidate_id
        self.job_offer_id = job_offer_id
        self.status = status
        self.applied_at = applied_at

    def serialize(self):
        return {
            'id': self.id,
            'candidate_id': self.candidate_id,
            'job_offer_id': self.job_offer_id,
            'status': self.status,
            'applied_at': self.applied_at,
        }
