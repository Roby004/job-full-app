# models/recruitment_step.py

from models.database import db
from datetime import datetime

class EtapeRecrutement(db.Model):
    __tablename__ = 'etape_recrutement'

    id = db.Column(db.Integer, primary_key=True)
    
    candidat_id = db.Column(db.Integer, db.ForeignKey('candidat.id'), nullable=False)
    offer_id = db.Column(db.Integer, db.ForeignKey('offer.id'), nullable=False)
    
    avis_general = db.Column(db.Integer)  # Note sur 5
    test_score = db.Column(db.Float)  # Score du test
    avis_test = db.Column(db.Integer)  # Note sur 5
    statut = db.Column(db.String(1), default='-')  # '-', 'O', 'N'
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relations
    candidat = db.relationship("Candidat", backref="etape_recrutement")
    offer = db.relationship("Offer", backref="etape_recrutement")
