from flask import jsonify
from models.offer import Offer
from models.database import db

# Create an Offer
def create_offer(data):
    if not data.get('id'):
        return jsonify({"error": "Offer id is required"}), 400 

    new_offer = Offer(
        title=data.get('title'),
        description=data.get('description'),
        location=data.get('location'),
        posted_at=data.get('posted_at'),
        company_id=data.get('company_id')

    )
      
    db.session.add(new_offer)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Offer created successfully",
        "offer": new_offer.serialize()
    }), 200

# Update an Offer 
def update_offer(id, data):
    offer = Offer.query.get(id)
    if not offer:
        return jsonify({"error": "Offer not found"}), 404
    
    offer.title = data.get('title', offer.title)
    offer.description = data.get('description', offer.description)
    offer.location = data.get('location', offer.location)
    offer.posted_at = data.get('posted_at', offer.posted_at)
    offer.company_id = data.get('company_id', offer.company_id)

    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Offer updated successfully",
        "offer": offer.serialize()
    }), 200

# Delete an Offer
def delete_offer(id):
    offer = Offer.query.get(id)
    if not offer:
        return jsonify({"status": "error", "message": "Offer not found"}), 404
    
    db.session.delete(offer)
    db.session.commit()
    
    return jsonify({"status": "success", "message": "Offer deleted successfully"}), 200

# Get offer by id
def get_offer(id):
    offer = Offer.query.get(id)
    if not offer:
        return jsonify({"status": "error", "message": "Offer not found"}), 404
    return jsonify(offer.serialize()), 200

# Get all open offers (statut_offre=True)
def get_open_offers():
    offers = Offer.query.filter_by(statut_offre=True).all()
    return jsonify({
        "status": "success",
        "offers": [offer.serialize() for offer in offers]
    }), 200