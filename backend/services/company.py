from flask import jsonify
from models.company import Company
from models.database import db

# Create an Company
def create_company(data):
    if not data.get('name'):
        return jsonify({"error": "Company name is required"}), 400 

    new_company = Company(
        name=data.get('name'),
        description=data.get('description'),
        user_id=data.get('user_id'),
        job_offers=data.get('job_offers')
    )
      
    db.session.add(new_company)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Company created successfully",
        "company": new_company.serialize()
    }), 200

# Update an Company 
def update_company(id, data):
    company = Company.query.get(id)
    if not company:
        return jsonify({"error": "Company not found"}), 404
    
    company.name = data.get('name', company.name)
    company.description = data.get('description', company.description)
    company.user_id = data.get('user_id', company.user_id)
    company.job_offers = data.get('job_offers', company.job_offers)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Company updated successfully",
        "company": company.serialize()
    }), 200

# Delete an Company
def delete_company(id):
    company = Company.query.get(id)
    if not company:
        return jsonify({"status": "error", "message": "Company not found"}), 404
    
    db.session.delete(company)
    db.session.commit()
    
    return jsonify({"status": "success", "message": "Company deleted successfully"}), 200

# Get company by id
def get_company(id):
    company = Company.query.get(id)
    if not company:
        return jsonify({"status": "error", "message": "Company not found"}), 404
    return jsonify(company.serialize()), 200

# list of allcompanies
def list_companies():
    companies = Company.query.all()
    return jsonify({
        "status": "success",
        "companies": [company.serialize() for company in companies]
    }), 200
