from flask import jsonify
from models.jobofferskill import OfferSkill
from models.database import db

# Create an Offerskill
def create_offerskill(data):
    if not data.get('id'):
        return jsonify({"error": "Offerskill id is required"}), 400 

    new_offerskill = OfferSkill(
        job_offer_id=data.get('job_offer_id'),
        skill_id=data.get('skill_id')
    )
      
    db.session.add(new_offerskill)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Offerskill created successfully",
        "offerskill": new_offerskill.serialize()
    }), 200

# Update an Offerskill 
def update_offerskill(id, data):
    offerskill = OfferSkill.query.get(id)
    if not offerskill:
        return jsonify({"error": "Offerskill not found"}), 404
    
    offerskill.job_offer = data.get('job_offer', offerskill.job_offer)
    offerskill.skill_id = data.get('skill_id', offerskill.skill_id)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Offerskill updated successfully",
        "offerskill": offerskill.serialize()
    }), 200

# Delete an Offerskill
def delete_offerskill(id):
    offerskill = OfferSkill.query.get(id)
    if not offerskill:
        return jsonify({"status": "error", "message": "Offerskill not found"}), 404
    
    db.session.delete(offerskill)
    db.session.commit()
    
    return jsonify({"status": "success", "message": "Offerskill deleted successfully"}), 200

# Get offerskill by id
def get_offerskill(id):
    offerskill = OfferSkill.query.get(id)
    if not offerskill:
        return jsonify({"status": "error", "message": "Offerskill not found"}), 404
    return jsonify(offerskill.serialize()), 200

