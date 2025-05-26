from models.database import db
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class OfferSkill(db.Model):
    __tablename__ = 'offerskill'

    id = db.Column(db.Integer, primary_key=True)
    job_offer_id = db.Column(db.Integer, db.ForeignKey('offer.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'), nullable=False)

    skill = db.relationship('Skills', backref='offer_skills')
    
    def __init__(self, job_offer_id, skill_id):
        self.job_offer_id = job_offer_id
        self.skill_id = skill_id

    def serialize(self):
        return {
            'id': self.id,
            'job_offer_id': self.job_offer_id,
            'skill_id' : self.skill_id
        }
