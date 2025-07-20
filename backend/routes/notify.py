from flask import Blueprint, jsonify
from services.utils import token_required

from services.talentmatcher import match_candidates_and_notify

match_bp = Blueprint('match', __name__)

@match_bp.route('/offers/<int:offer_id>/match-and-notify', methods=['POST'])
@token_required
def match_and_notify(offer_id):
    result = match_candidates_and_notify(offer_id)
    return jsonify(result), 200

