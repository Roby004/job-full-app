from flask import Blueprint, request, jsonify
from services import application as application_services
from services.utils import token_required

application_bp = Blueprint('application', __name__)

# Route: Associate a site to an application
@application_bp.route('/agents/<application_id>/sites', methods=['POST'])
@token_required
def add_site_to_application(agent_id):
    data = request.json
    site_name = data.get('name')

    if not site_name:
        return jsonify({"error": "Le nom du site est requis"}), 400

    try:
        new_site = application_services.associate_site_to_agent(agent_id, site_name)
        return jsonify({
            "status": "success",
            "message": "Agent et site associés avec succès",
            "agent_site": new_site.serialize()
        }), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

# Route: Create a new application or list all applications
@application_bp.route('/application', methods=['POST', 'GET'])
#@token_required
def new_applicationt():
    if request.method == 'POST':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom de l'application est requis"}), 400
        return application_services.create_application(data)
    elif request.method == 'GET':
        return application_services.list()

# Route: Get, update, or delete an application
@application_bp.route('/application/<string:application_id>', methods=['GET', 'PUT', 'DELETE'])
@token_required
def application_detail(application_id):
    if request.method == 'GET':
        return application_services.get_application(application_id)
    elif request.method == 'PUT':
        data = request.json
        if not data.get('name'):
            return jsonify({"error": "Le nom de l'application est requis pour la mise à jour"}), 400
        return application_services.update_application(application_id, data)
    elif request.method == 'DELETE':
        return application_services.delete_application(application_id)
    

@application_bp.route('/candidates/<int:candidate_id>/applications', methods=['GET'])
@token_required
def get_candidate_applications(candidate_id):
    return application_services.get_applications_by_candidate(candidate_id)

