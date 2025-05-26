from models.database import db
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class CandidateSkills(db.Model):
    __tablename__ = 'candidateskills'

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidat.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'), nullable=False)

    skill = db.relationship('Skills')
    
    
    def __init__(self, candidate_id, skill_id):
        self.candidate_id = candidate_id
        self.skill_id = skill_id

    def serialize(self):
        return {
            'id': self.id,
            'candidate_id': self.candidate_id,
            'skill_id' : self.skill_id
        }
