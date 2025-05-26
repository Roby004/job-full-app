import jwt
import os
from datetime import datetime, timedelta
from flask import jsonify, request
from models.user import User, TokenBlocklist
from models.database import db
from sqlalchemy import exc
from models.candidat import Candidat
from models.company import Company

SECRET_KEY = os.getenv('SECRET_KEY')

def login_user(data):
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'status': 'error', 'message': 'Invalid email or password'}), 401
    
    access_token = jwt.encode(
        {'user_id': user.id, 'exp': datetime.utcnow() + timedelta(minutes=15)},
        SECRET_KEY,
        algorithm='HS256'
    )
    refresh_token = jwt.encode(
        {'user_id': user.id, 'exp': datetime.utcnow() + timedelta(days=30)},
        SECRET_KEY,
        algorithm='HS256'
    )
    return jsonify({
        'status': 'success',
        'access_token': access_token,
        'refresh_token': refresh_token
    }), 200

def refresh_token(refresh_token):
    if not refresh_token:
        return jsonify({'status': 'error', 'message': 'Refresh token is missing'}), 400
    
    try:
        data = jwt.decode(refresh_token, SECRET_KEY, algorithms=['HS256'])
        user_id = data['user_id']
        new_access_token = jwt.encode(
            {'user_id': user_id, 'exp': datetime.utcnow() + timedelta(minutes=15)},
            SECRET_KEY,
            algorithm='HS256'
        )
        return jsonify({'status': 'success', 'access_token': new_access_token}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'status': 'error', 'message': 'Refresh token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'status': 'error', 'message': 'Invalid refresh token'}), 401

def logout_user(user):
    token = request.headers.get('Authorization').split('Bearer ')[1].strip()
    blocked_token = TokenBlocklist(token=token, blacklisted_on=datetime.utcnow())
    db.session.add(blocked_token)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Successfully logged out'}), 200

def add_user(data):
    try:
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')

        if not all([email, password, role]):
            return jsonify({'status': 'error', 'message': 'Email, password and role are required'}), 400

        if role not in ['candidat', 'recruteur']:
            return jsonify({'status': 'error', 'message': 'Role must be either "candidat" or "recruteur"'}), 400

        # Créer utilisateur
        new_user = User(email=email, password=password, role=role)
        db.session.add(new_user)
        db.session.commit()  # commit ici pour garantir que l'utilisateur est ajouté

        # Ajouter le profil lié
        if role == 'candidat':
            fullname = data.get('fullname', 'Unnamed Candidat')
            resume = data.get('resume', '')
            candidat_profile = Candidat(
                fullname=fullname,
                resume=resume,
                user_id=new_user.id
            )
            db.session.add(candidat_profile)

        elif role == 'recruteur':
            company_name = data.get('company_name', 'Unnamed Company')
            description = data.get('description', '')
            company = Company(
                name=company_name,
                description=description,
                user_id=new_user.id
            )
            db.session.add(company)

        db.session.commit()

        return jsonify({'status': 'success', 'user': new_user.serialize()}), 201

    except exc.IntegrityError as e:
        db.session.rollback()
        print("IntegrityError:", e.orig)  # 👈 print actual error
        return jsonify({'status': 'error', 'message': f'User with email {data.get("email")} already exists!'}), 400

    #except exc.IntegrityError:
    #    db.session.rollback()
     #   return jsonify({'status': 'error', 'message': f'User with email {data.get("email")} already exists!'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'status': 'error', 'message': str(e)}), 500

def get_user_info(user):
    try:
        return jsonify({
            'status': 'success',
            'data': user.serialize()
        }), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
