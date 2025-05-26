from flask import jsonify
from models.candidat import Candidat
from models.application import Application
from models.database import db

# Create an Candidat
def create_Candidat(data):
    if not data.get('name'):
        return jsonify({"error": "Candidat name is required"}), 400 

    new_candidat = Candidat(
        fullname=data.get('fullname'),
        resume=data.get('resume'),
        user_id=data.get('user_id'),
        skills=data.get('skills'),
        applications=data.get('application'),
    )
      
    db.session.add(new_candidat)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Candidat created successfully",
        "agent": new_candidat.serialize()
    }), 200

# Update an Candidat
def update_Candidat(id, data):
    candidat = Candidat.query.get(id)
    if not candidat:
        return jsonify({"error": "Candidat not found"}), 404
    
    candidat.fullname = data.get('fullname', candidat.fullname)
    candidat.resume = data.get('resume', candidat.resume)
    candidat.user_id = data.get('user_id', candidat.user_id)
    candidat.skills = data.get('skills', candidat.skills)
    candidat.applications = data.get('applications', candidat.applications)

    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Candidat updated successfully",
        "candidat": candidat.serialize()
    }), 200

# Delete an Candidat
def delete_candidat(id):
    candidat = Candidat.query.get(id)
    if not candidat:
        return jsonify({"status": "error", "message": "Candidat not found"}), 404
    
    db.session.delete(candidat)
    db.session.commit()
    
    return jsonify({"status": "success", "message": "Candidat deleted successfully"}), 200

# Get candidat by id
def get_candidat(id):
    candidat = Candidat.query.get(id)
    if not candidat:
        return jsonify({"status": "error", "message": "candidat not found"}), 404
    return jsonify(candidat.serialize()), 200

from models.application import Application

# get candidat by application
def get_candidates_by_application(application_id):
    try:
        application = Application.query.get(application_id)
        if not application:
            return jsonify({"status": "error", "message": "Application not found"}), 404
        
        return jsonify({
            "status": "success",
            "candidates": [candidate.serialize() for candidate in application.candidates]
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


#list of all candidat
def list_candidate():
    candidats = Candidat.query.all()
    candidat_list = [c.serialize() for c in candidats]
    return jsonify({"status": "success", "candidates": candidat_list}), 200
