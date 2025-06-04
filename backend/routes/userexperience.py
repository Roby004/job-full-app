# routes.py or experience_routes.py
from flask import request, jsonify, Blueprint
#from models import Candidat
from models.database import db
from models.candidat import Candidat
from models.userexperience import UserExperience
from datetime import datetime
from services.utils import token_required


userexperience_bp = Blueprint('userexperience', __name__)

@userexperience_bp.route('/experience', methods=['POST'])
@token_required
def add_experience(current_user):
    try:
        if current_user.role != 'candidat':
            return jsonify({'status': 'error', 'message': 'Seuls les candidats peuvent ajouter une expérience.'}), 403

        candidat = Candidat.query.filter_by(user_id=current_user.id).first()
        if not candidat:
            return jsonify({'status': 'error', 'message': 'Candidat introuvable.'}), 404

        data = request.get_json()

        new_exp = UserExperience(
            title=data.get('title'),
            entreprise=data.get('entreprise'),
            deb_date=datetime.strptime(data.get('debdate'), "%Y-%m-%d").date(),
            fin_date=datetime.strptime(data.get('findate'), "%Y-%m-%d").date() if data.get('findate') else None,
            description=data.get('description'),
            candidat_id=candidat.id
        )

        db.session.add(new_exp)
        db.session.commit()

        return jsonify({
            'status': 'success',
            'data': new_exp.serialize()  # Assure-toi que `serialize` existe dans `UserExperience`
        }), 201

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
