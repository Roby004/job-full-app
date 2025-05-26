from functools import wraps
from flask import request, jsonify
from models.user import User, TokenBlocklist
import jwt
import os

SECRET_KEY = os.getenv('SECRET_KEY')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        authorization = request.headers.get('Authorization')
        if not authorization:
            return jsonify({'status': 'error', 'message': 'Token is missing'}), 401

        try:
            token = authorization.split('Bearer ')[1].strip()

            revoked_token = TokenBlocklist.query.filter_by(token=token).first()
            if revoked_token:
                return jsonify({'status': 'error', 'message': 'Token has been revoked'}), 401

            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except jwt.ExpiredSignatureError:
            return jsonify({'status': 'error', 'message': 'Token has expired'}), 401
        except (jwt.InvalidTokenError, Exception):
            return jsonify({'status': 'error', 'message': 'Invalid token'}), 401

        return f(current_user, *args, **kwargs)

    return decorated
