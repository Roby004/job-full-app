from flask import Blueprint, request, jsonify, current_app
from models.candidat import Candidat
from models.database import db
from services import candidat as candidat_services
from services.utils import token_required
from werkzeug.utils import secure_filename
import os

candidat_bp = Blueprint('candidat', __name__)

# Route: Create a new candidat or list all candidats
@candidat_bp.route('/candidat', methods=['POST', 'GET'])
@token_required
def new_candidat():
    if request.method == 'POST':
        data = request.json
        if not data.get('fullname'):
            return jsonify({"error": "Le nom du candidat est requis"}), 400
        return candidat_services.create_Candidat(data)
    elif request.method == 'GET':
        return candidat_services.list_candidate()

# Route: Get, update, or delete a candidat
@candidat_bp.route('/candidat/<string:candidat_id>', methods=['GET', 'PUT', 'DELETE'])
@token_required
def application_detail(candidat_id):
    if request.method == 'GET':
        return candidat_services.get_candidat(candidat_id)
    elif request.method == 'PUT':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom du candidat est requis pour la mise à jour"}), 400
        return candidat_services.update_Candidat(candidat_id, data)
    elif request.method == 'DELETE':
        return candidat_services.delete_candidat(candidat_id)

#Route to get candidat by application
@candidat_bp.route('/candidates/<int:application_id>/applications', methods=['GET'])
@token_required
def get_candidates_by_application_route(application_id):
    return candidat_services.get_candidates_by_application(application_id)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']



@candidat_bp.route('/upload_cv', methods=['POST'])
@token_required
def upload_cv(current_user):
    if 'cv' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['cv']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], f"user_{current_user.id}_{filename}")
        file.save(filepath)

        candidat = Candidat.query.filter_by(user_id=current_user.id).first()
        if candidat:
            candidat.resume = filepath
            db.session.commit()
            return jsonify({'message': 'CV uploaded successfully', 'cv_path': filepath}), 200
        else:
            return jsonify({'error': 'Candidat not found'}), 404

    return jsonify({'error': 'Invalid file type'}), 400
