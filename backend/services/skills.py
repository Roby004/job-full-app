from flask import jsonify
from models.skills import Skills
from models.database import db

# Create an Skills
def create_skills(data):
    if not data.get('name'):
        return jsonify({"error": "Skills name is required"}), 400 

    new_skills = Skills(
        name=data.get('name'),
        description=data.get('description')
    )
      
    db.session.add(new_skills)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Skills created successfully",
        "skills": new_skills.serialize()
    }), 200

# Update an Skills 
def update_skills(id, data):
    skills = Skills.query.get(id)
    if not skills:
        return jsonify({"error": "Skills not found"}), 404
    
    skills.name = data.get('name', skills.name)

    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Skills updated successfully",
        "skills": skills.serialize()
    }), 200

# Delete an Skills
def delete_skills(id):
    skills = Skills.query.get(id)
    if not skills:
        return jsonify({"status": "error", "message": "Skills not found"}), 404
    
    db.session.delete(skills)
    db.session.commit()
    
    return jsonify({"status": "success", "message": "Skills deleted successfully"}), 200

# Get skills by id
def get_skills(id):
    skills = Skills.query.get(id)
    if not skills:
        return jsonify({"status": "error", "message": "Skills not found"}), 404
    return jsonify(skills.serialize()), 200

