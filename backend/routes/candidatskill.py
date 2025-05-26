from flask import Blueprint, request, jsonify
from services import candidatskill as candidatskills_services
from services.utils import token_required

candidatskills_bp = Blueprint('candidatskills', __name__)

# Route: Create a new candidat skills or list all candidat Skills
@candidatskills_bp.route('/candidat', methods=['POST', 'GET'])
@token_required
def new_candidatskills():
    if request.method == 'POST':
        data = request.json
        if not data.get('id'):
            return jsonify({"error": "Le id du candidat skills est requis"}), 400
        return candidatskills_services.create_candidateskills(data)
    elif request.method == 'GET':
        return candidatskills_services.list()

# Route: Get, update, or delete a candidat Skills
@candidatskills_bp.route('/candidatskills/<string:candidatskills_id>', methods=['GET', 'PUT', 'DELETE'])
@token_required
def candidatskills_detail(candidatskills_id):
    if request.method == 'GET':
        return candidatskills_services.get_candidateskills(candidatskills_id)
    elif request.method == 'PUT':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom du candidat skills est requis pour la mise à jour"}), 400
        return candidatskills_services.update_candidateskills(candidatskills_id, data)
    elif request.method == 'DELETE':
        return candidatskills_services.delete_candidateskills(candidatskills_id)


@candidatskills_bp.route('/candidates/<int:candidate_id>/skills', methods=['GET'])
@token_required
def get_skills_by_candidate_route(candidate_id):
    return candidatskills_services.get_skills_by_candidate(candidate_id)