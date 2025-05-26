from flask import Blueprint, request, jsonify
from services import offer as offer_services
from models.company import Company
from models.offer import Offer
from services.utils import token_required

offer_bp = Blueprint('offer', __name__)

# Route: Create a new offer or list all offers
@offer_bp.route('/offer', methods=['POST', 'GET'])
@token_required
def new_offer():
    if request.method == 'POST':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom du offer est requis"}), 400
        return offer_services.create_offer(data)
    elif request.method == 'GET':
        return offer_services.list()

# Route: Get, update, or delete a offer
@offer_bp.route('/offer/<string:offer_id>', methods=['GET', 'PUT', 'DELETE'])
@token_required
def offer_detail(current_user, offer_id):
    if request.method == 'GET':
        return offer_services.get_offer(offer_id)
    elif request.method == 'PUT':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom du offer est requis pour la mise à jour"}), 400
        return offer_services.update_offer(offer_id, data)
    elif request.method == 'DELETE':
        return offer_services.delete_offer(offer_id)
    
@offer_bp.route('/offer/open', methods=['GET'])
def open_offers_route():
    return offer_services.get_open_offers()

@offer_bp.route('/offer/my-offers', methods=['GET'])
@token_required
def get_my_offers(user):
    company = Company.query.filter_by(user_id=user.id).first()

    if not company:
        return jsonify({'status': 'error', 'message': 'No company found'}), 404

    offers = Offer.query.filter_by(company_id=company.id).all()

    return jsonify({
        'status': 'success',
        'offers': [offer.serialize() for offer in offers]
    }), 200
