# routes/mail.py
from flask import Blueprint, request, jsonify
from flask_mail import Message
from extension import mail  # ✅ Utiliser l'import depuis extensions.py
from models.candidat import Candidat
from models.offer import Offer

mail_bp = Blueprint('mail', __name__)

@mail_bp.route('/send-email', methods=['POST'])
def send_selection_email():
    data = request.get_json()
    candidat_info = data.get("candidat")

    if not candidat_info:
        return jsonify({"error": "Candidat ou offre introuvable"}), 404

    message_html = f"""
    <div style="font-family: Arial, sans-serif; color: #023047; padding: 20px;">
      <img src="https://res.cloudinary.com/dvikewhye/image/upload/v1751608050/logo-icon2_gvua60.png" alt="Logo" width="120"/>
      <h2>Chère {candidat_info['nom']},</h2>
      <p>
        Félicitations ! 🎉<br/>
        Vous avez franchi avec succès la première étape du processus de recrutement pour le poste <strong>{candidat_info['nom_offre']}</strong> chez <strong>{candidat_info['entreprise']}</strong>.
      </p>
      <p>
        Pour continuer vers la phase d'évaluation, veuillez suivre le lien ci-dessous :
      </p>
      <a href="http://localhost:5173/employe/test" style="color: #fff; background-color: #023047; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
        Accéder à l’évaluation
      </a>
      <br/><br/>
      <p>
        Bien à vous,<br/>
        L'équipe de recrutement de <strong>{candidat_info['entreprise']}</strong>
        <img src="https://res.cloudinary.com/dvikewhye/image/upload/v1751608074/Logo_hvimnw.png" alt="Signature" width="100"/>
      </p>
    </div>
    """

    msg = Message(
        subject="🎉 Félicitations pour votre sélection !",
        recipients=[candidat_info['email']],
        html=message_html,
        sender="amboarampitiavana8@gmail.com"
    )

    try:
        mail.send(msg)
        return jsonify({"success": True, "message": "Email envoyé avec succès"})
    except Exception as e:
      print(f"Erreur d'envoi de mail : {e}")  # 🛠️ Affiche l'erreur dans la console
      return jsonify({"error": str(e)}), 500

@mail_bp.route('/preview-email', methods=['GET'])
def preview_selection_email():
    candidat_info = {
        "nom": "Amboara",
        "email": "amboarampitiavana8@gmail.com",
        "nom_offre": "Développeur Full Stack",
        "entreprise": "EduSmart"
    }

    message_html = f"""
    <div style="font-family: Arial, sans-serif; color: #023047; padding: 20px;">
      <img src="https://res.cloudinary.com/dvikewhye/image/upload/v1751608050/logo-icon2_gvua60.png" alt="Logo" width="120"/>
      <h2>Chère {candidat_info['nom']},</h2>
      <p>
        Félicitations ! 🎉<br/>
        Vous avez franchi avec succès la première étape du processus de recrutement pour le poste <strong>{candidat_info['nom_offre']}</strong> chez <strong>{candidat_info['entreprise']}</strong>.
      </p>
      <p>
        Pour continuer vers la phase d'évaluation, veuillez suivre le lien ci-dessous :
      </p>
      <a href="http://localhost:5173/employe/test" style="color: #fff; background-color: #023047; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
        Accéder à l’évaluation
      </a>
      <br/><br/>
      <p>
        Bien à vous,<br/>
        L'équipe de recrutement de <strong>{candidat_info['entreprise']}</strong>
        <img src="https://res.cloudinary.com/dvikewhye/image/upload/v1751608074/Logo_hvimnw.png" alt="Signature" width="100"/>
      </p>
    </div>
    """
    return message_html
