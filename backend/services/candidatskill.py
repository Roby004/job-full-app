from flask import jsonify
from models.candidateskill import CandidateSkills
from models.database import db

# Create an Candidat Skills
def create_candidateskills(data):
    if not data.get('name'):
        return jsonify({"error": "Candidat Skills name is required"}), 400 

    new_candidateskills = CandidateSkills(
        candidate_id=data.get('candidate_id'),
        skill_id=data.get('skill_id'),
        skill=data.get('skill')
    )
      
    db.session.add(new_candidateskills)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Candidat Skills created successfully",
        "agent": new_candidateskills.serialize()
    }), 200

# Update an CandidatSkills 
def update_candidateskills(id, data):
    candidateskills = CandidateSkills.query.get(id)
    if not candidateskills:
        return jsonify({"error": "Candidat Skills not found"}), 404
    
    candidateskills.candidate_id = data.get('candidate_id', candidateskills.candidate_id)
    candidateskills.skill_id = data.get('skill_id', candidateskills.skill_id)
    candidateskills.skill = data.get('skill', candidateskills.skill)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Candidat Skills updated successfully",
        "candidateskills": candidateskills.serialize()
    }), 200

# Delete an Candidat
def delete_candidateskills(id):
    candidateskills = CandidateSkills.query.get(id)
    if not candidateskills:
        return jsonify({"status": "error", "message": "Candidat Skills not found"}), 404
    
    db.session.delete(candidateskills)
    db.session.commit()
    
    return jsonify({"status": "success", "message": "Candidat Skills deleted successfully"}), 200

# Get candidateskills by id
def get_candidateskills(id):
    candidateskills = CandidateSkills.query.get(id)
    if not candidateskills:
        return jsonify({"status": "error", "message": "Candidat Skills not found"}), 404
    return jsonify(candidateskills.serialize()), 200

# Get all skills of a candidate
def get_skills_by_candidate(candidate_id):
    skills = CandidateSkills.query.filter_by(candidate_id=candidate_id).all()
    
    if not skills:
        return jsonify({"status": "error", "message": "No skills found for this candidate"}), 404
    
    return jsonify({
        "status": "success",
        "skills": [skill.serialize() for skill in skills]
    }), 200
