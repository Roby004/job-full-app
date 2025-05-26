from flask import Blueprint, request, jsonify
from services import jobofferskill as offerskill_services
from services.utils import token_required

offerskill_bp = Blueprint('offerskill', __name__)

# Route: Create a new offerskill or list all offerskills
@offerskill_bp.route('/offerskill', methods=['POST', 'GET'])
@token_required
def new_offerskill():
    if request.method == 'POST':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom du offerskill est requis"}), 400
        return offerskill_services.create_offerskill(data)
    elif request.method == 'GET':
        return offerskill_services.list()

# Route: Get, update, or delete a offerskill
@offerskill_bp.route('/offerskill/<string:offerskill_id>', methods=['GET', 'PUT', 'DELETE'])
@token_required
def offerskill_detail(offerskill_id):
    if request.method == 'GET':
        return offerskill_services.get_offerskill(offerskill_id)
    elif request.method == 'PUT':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom du offerskill est requis pour la mise à jour"}), 400
        return offerskill_services.update_offerskill(offerskill_id, data)
    elif request.method == 'DELETE':
        return offerskill_services.delete_offerskill(offerskill_id)
