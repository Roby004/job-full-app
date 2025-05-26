from flask import Blueprint, request, jsonify
from services import company as company_services
from services.utils import token_required

company_bp = Blueprint('company', __name__)

# Route: Create a new company or list all companies
@company_bp.route('/company', methods=['POST', 'GET'])
@token_required
def new_company():
    if request.method == 'POST':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom du company est requis"}), 400
        return company_services.create_company(data)
    elif request.method == 'GET':
        return company_services.list_companies()

# Route: Get, update, or delete a company
@company_bp.route('/company/<string:company_id>', methods=['GET', 'PUT', 'DELETE'])
@token_required
def company_detail(company_id):
    if request.method == 'GET':
        return company_services.get_company(company_id)
    elif request.method == 'PUT':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom du company est requis pour la mise à jour"}), 400
        return company_services.update_company(company_id, data)
    elif request.method == 'DELETE':
        return company_services.delete_company(company_id)
