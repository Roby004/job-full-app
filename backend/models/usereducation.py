from models.database import db
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
#sfrom models.candidat import Candidat

class UserEducation(db.Model):
    __tablename__ = 'usereducation'

    id = db.Column(db.Integer, primary_key=True)
    formation = db.Column(db.String(150), nullable=False)
    ecole = db.Column(db.String(150), nullable=False)
    deb_date = db.Column(db.Date, nullable=False)
    fin_date = db.Column(db.Date, nullable=True)
    description = db.Column(db.Text)
    candidat_id = db.Column(db.Integer, db.ForeignKey('candidat.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "formation": self.formation,
            "ecole": self.ecole,
            "deb_date": self.deb_date.isoformat(),
            "fin_date": self.fin_date.isoformat() if self.fin_date else None,
            "description": self.description,
        }
