from flask import Blueprint, request, jsonify
from models.user import User, TokenBlocklist
from models.database import db
from services.utils import token_required
from services import auth as auth_service
from flasgger import swag_from

auth_bp = Blueprint('auth_bp', __name__,
                    template_folder='../templates',
                    static_folder='static', static_url_path='/assets')

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return auth_service.login_user(data)

# Token refresh route
@auth_bp.route('/auth/refresh', methods=['POST'])
def refresh():
    refresh_token = request.json.get('refresh_token')
    return auth_service.refresh_token(refresh_token)

# Logout route
@auth_bp.route('/logout', methods=['GET'])
@token_required
def logout(user):
    return auth_service.logout_user(user)

# Signup route
@auth_bp.route('/signup', methods=['POST'])
def add_user_route():
    data = request.get_json()
    return auth_service.add_user(data)

# Retrieve user info
@auth_bp.route('/me', methods=['GET'])
@token_required
def me(user):
    return auth_service.get_user_info(user)
