
from datetime import datetime
from flask import jsonify
from models.application import Application
from models.candidat import Candidat
from models.database import db

# Create an Application
def create_application(data , user_id):
    if not data.get('name'):
        return jsonify({"error": "Application name is required"}), 400 
    candidat = Candidat.query.filter_by(user_id=user_id).first()

    new_application = Application(
         candidate_id=candidat.id,
        job_offer_id=data.get('job_offer_id'),
        status=data.get('status'),
         applied_at=datetime.utcnow(),
    )
      
    db.session.add(new_application)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Application created successfully",
        "agent": new_application.serialize()
    }), 200

# Update an Application
def update_application(id, data):
    application = Application.query.get(id)
    if not application:
        return jsonify({"error": "Application not found"}), 404
    
    application.candidate_id = data.get('candidate_id', application.candidate_id)
    application.job_offer_id = data.get('job_offer_id', application.job_offer_id)
    application.status = data.get('status', application.status)
    application.applied_at = data.get('applied_at', application.applied_at)

    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "application updated successfully",
        "application": application.serialize()
    }), 200

# Delete an Application
def delete_application(id):
    application = Application.query.get(id)
    if not application:
        return jsonify({"status": "error", "message": "Application not found"}), 404
    
    db.session.delete(application)
    db.session.commit()
    
    return jsonify({"status": "success", "message": "Agent deleted successfully"}), 200

# Get application by id
def get_application(id):
    application = Application.query.get(id)
    if not application:
        return jsonify({"status": "error", "message": "application not found"}), 404
    return jsonify(application.serialize()), 200

# Associate a site to a candidate
def associate_candidate_to_application(application_id, candidate_id):
    application = db.session.query(Application).filter_by(id=application_id).first()
    
    if not application:
        raise ValueError("application not found")

    new_candidate = Candidat(candidate_id=candidate_id)

    # Associate the site with the agent
    application.candidate_id = new_candidate

    db.session.add(new_candidate)
    db.session.commit()
    
    return new_candidate

# Get all applications of a candidate
def get_applications_by_candidate(candidate_id):
    try:
        applications = Application.query.filter_by(candidate_id=candidate_id).all()
        
        if not applications:
            return jsonify({
                "status": "success",
                "applications": [],
                "message": "No applications found for this candidate"
            }), 200

        return jsonify({
            "status": "success",
            "applications": [app.serialize() for app in applications]
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

