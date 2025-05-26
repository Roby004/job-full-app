from flask import current_app
from flask_mail import Message, Mail
from models.offer import Offer
from models.candidat import Candidat


def match_candidates_and_notify(offer_id, threshold=0.5):
    offer = Offer.query.get(offer_id)
    if not offer:
        return {"error": "Offre introuvable"}

    offer_skills = {s.skill.name.lower() for s in offer.skills_required if s.skill}
    if not offer_skills:
        return {"error": "Aucune compétence requise pour cette offre."}

    matches = []
    for candidate in Candidat.query.all():
        candidate_skills = {s.skill.name.lower() for s in candidate.skills if s.skill}
        if not candidate_skills:
            continue

        common_skills = offer_skills & candidate_skills
        score = len(common_skills) / len(offer_skills)

        if score >= threshold:
            user = candidate.user
            if user and user.email:
                send_match_email(
                    to_email=user.email,
                    candidate_name=candidate.fullname,
                    offer_title=offer.title,
                    skills=common_skills,
                    score=score
                )
                matches.append({
                    "candidat_id": candidate.id,
                    "email": user.email,
                    "score": round(score, 2),
                    "matching_skills": list(common_skills)
                })

    return {
        "offer_id": offer.id,
        "offer_title": offer.title,
        "matches_sent": matches
    }

mail=Mail()
def send_match_email(to_email, candidate_name, offer_title, skills, score):
    subject = f"Nouvelle opportunité pour {candidate_name} !"
    body = (
        f"Bonjour {candidate_name},\n\n"
        f"Une offre correspondant à votre profil est disponible : « {offer_title} ».\n"
        f"Compétences communes : {', '.join(skills)}\n"
        f"Taux de correspondance : {round(score * 100)}%\n\n"
        f"Consultez l'offre dès maintenant !\n\n"
        f"Bien à vous,\nL'équipe TalentMatcher"
    )

    msg = Message(
        subject=subject,
        recipients=[to_email],
        body=body
    )
    mail.send(msg)
