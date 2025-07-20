# routes/recruitment_step.py

from flask import Blueprint, request, jsonify
from models.etaperecrutement import EtapeRecrutement
from models.database import db
from services.utils import token_required


etaperecrutement_bp = Blueprint('etaperecrutement', __name__)

@etaperecrutement_bp.route('/recruitment-step', methods=['POST'])
@token_required
def create_step():
    data = request.get_json()
    step = EtapeRecrutement(
        candidat_id=data['candidat_id'],
        offer_id=data['offer_id'],
        avis_general=data.get('avis_general'),
        test_score=data.get('test_score'),
        avis_test=data.get('avis_test'),
        statut=data.get('statut', '-')
    )
    db.session.add(step)
    db.session.commit()
    return jsonify({"message": "Étape enregistrée", "id": step.id}), 201

