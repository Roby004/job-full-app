# routes.py or experience_routes.py
from flask import request, jsonify, Blueprint
#from models import Candidat
from models.database import db
from models.candidat import Candidat
from models.usereducation import UserEducation
from datetime import datetime
from services.utils import token_required


usereducation_bp = Blueprint('usereducation', __name__)

@usereducation_bp.route('/education', methods=['POST'])
@token_required
def add_experience(current_user):
    try:
        if current_user.role != 'candidat':
            return jsonify({'status': 'error', 'message': 'Seuls les candidats peuvent ajouter une expérience.'}), 403

        candidat = Candidat.query.filter_by(user_id=current_user.id).first()
        if not candidat:
            return jsonify({'status': 'error', 'message': 'Candidat introuvable.'}), 404

        data = request.get_json()

        new_education= UserEducation(
            formation=data.get('formation'),
            ecole=data.get('ecole'),
            deb_date=datetime.strptime(data.get('debdate_educ'), "%Y-%m-%d").date(),
            fin_date=datetime.strptime(data.get('findate_educ'), "%Y-%m-%d").date() if data.get('findate') else None,
            description=data.get('description_educ'),
            candidat_id=candidat.id
        )

        db.session.add(new_education)
        db.session.commit()

        return jsonify({
            'status': 'success',
            'data': new_education.serialize()  # Assure-toi que `serialize` existe dans `UserExperience`
        }), 201

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
