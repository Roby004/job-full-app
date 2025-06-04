from models.database import db

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class Candidat(db.Model):
    __tablename__ = 'candidat'

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(150), nullable=False)
    resume = db.Column(db.String(300))  # lien vers le CV
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    

    skills = db.relationship('CandidateSkills', backref='candidate', lazy=True)
    applications = db.relationship('Application', backref='candidate', lazy=True)
    experiences = db.relationship('UserExperience', backref='candidat', lazy=True)
    
    
    def __init__(self, fullname, resume, user_id):
        self.fullname = fullname
        self.resume = resume
        self.user_id = user_id

    def serialize(self):
        return {
            'id': self.id,
            'fullname': self.fullname,
            'user_id': self.user_id,
          
             'skills': [
                {
                    'id': s.skill.id,
                    'name': s.skill.name
                } for s in self.skills if s.skill is not None],
            'applications': [app.id for app in self.applications],
            'experiences': [exp.serialize() for exp in self.experiences],
        }
