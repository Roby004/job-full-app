from flask import Blueprint, request, jsonify
from services import skills as skills_services
from services.utils import token_required

skills_bp = Blueprint('skills', __name__)

# Route: Create a new skills or list all skillss
@skills_bp.route('/skills', methods=['POST', 'GET'])
@token_required
def new_skills():
    if request.method == 'POST':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom du skills est requis"}), 400
        return skills_services.create_skills(data)
    elif request.method == 'GET':
        return skills_services.list()

# Route: Get, update, or delete a skills
@skills_bp.route('/skills/<string:skills_id>', methods=['GET', 'PUT', 'DELETE'])
@token_required
def skills_detail(skills_id):
    if request.method == 'GET':
        return skills_services.get_skills(skills_id)
    elif request.method == 'PUT':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom du skills est requis pour la mise à jour"}), 400
        return skills_services.update_skills(skills_id, data)
    elif request.method == 'DELETE':
        return skills_services.delete_skills(skills_id)
