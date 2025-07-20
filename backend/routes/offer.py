from datetime import datetime
from flask import Blueprint, request, jsonify
from models.application import Application
from models.etaperecrutement import EtapeRecrutement
from services import offer as offer_services
from models.company import Company
from models.candidat import Candidat
from models.offer import Offer
from models.jobofferskill import OfferSkill
from services.utils import token_required
from models.database import db
from matching_offer import compute_offer_matching

offer_bp = Blueprint('offer', __name__)

# Route: Create a new offer or list all offers
@offer_bp.route('/offer', methods=['POST', 'GET'])
@token_required
def new_offer(current_user):
    if request.method == 'POST':
        
        data = request.get_json()

        required_fields = ['title', 'description', 'category', 'type_offre']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"'{field}' est requis"}), 400

        # Récupérer la compagnie liée à l'utilisateur connecté
        company = Company.query.filter_by(user_id=current_user.id).first()

        if not company:
            return jsonify({"error": "Aucune entreprise associée à cet utilisateur"}), 404

        # Création de l'offre avec company_id automatiquement trouvé
        offer = Offer(
            title=data['title'],
            description=data['description'],
            location=data.get('location'),
            posted_at=datetime.utcnow(),
            company_id=company.id,  # Utilise l’ID de la company trouvée
            statut_offre=data.get('statut_offre', False),
            category=data['category'],
            type_offre=data['type_offre'],
            competences_requises=data.get('competences_requises'),
            salaire=data.get('salaire'),
            mode_travail=data.get('mode_travail')
        )

        db.session.add(offer)
        db.session.commit()

        # Ajout des skills liés à cette offre
        skill_ids = data.get('skills', [])  # ex: [1, 2, 3]
        for skill_id in skill_ids:
            skill_relation = OfferSkill(job_offer_id=offer.id, skill_id=skill_id)
            db.session.add(skill_relation)

        db.session.commit()

        return jsonify({"message": "Offre créée avec succès", "offer": offer.serialize()}), 201
        #return offer_services.create_offer(data)
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

@offer_bp.route('/matching', methods=['POST'])
@token_required

def match_offer_to_candidate(current_user):  
    try:
        data = request.get_json()

        offer_id = data.get("offer", {}).get("id")
        preferences = data.get("preferences", {})

        if not offer_id:
            return jsonify({"error": "ID de l'offre manquant"}), 400

        candidat = Candidat.query.filter_by(user_id=current_user.id).first()
        offre = Offer.query.get(offer_id)

        if not candidat or not offre:
            return jsonify({"error": "Candidat ou offre introuvable"}), 404

        score, details = compute_offer_matching(candidat, offre, preferences)

        return jsonify({
            "matching_score": score,
            "details": details
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@offer_bp.route('/offer/<int:offer_id>/candidats', methods=['GET'])
def get_candidates_for_offer(offer_id):
    applications = Application.query.filter_by(job_offer_id=offer_id).all()
    result = []

    for app in applications:
        candidat = app.candidate

        # On récupère les étapes de recrutement liées à cette application
        etapes = EtapeRecrutement.query.filter_by(candidat_id=candidat.id).first()

        result.append({
            'id': candidat.id,
            'fullname': candidat.fullname,
            'skills': [
                {
                    'id': s.skill.id,
                    'name': s.skill.name
                } for s in candidat.skills if s.skill is not None
            ],
            'status': app.status,
            'avis_general': etapes.avis_general if etapes else None,
            'avis_test': etapes.avis_test if etapes else None
        })

    return jsonify(result)

