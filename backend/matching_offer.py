from datetime import datetime, timezone
today = datetime.now(timezone.utc).date()

def compute_offer_matching(candidat, offre, preferences=None):
    """
    Calcule le score de correspondance d'une offre à un candidat.
    :param candidat: instance de Candidat (avec skills, experiences...)
    :param offre: instance de Offer (avec skills_required, competences_requises...)
    :param preferences: dictionnaire optionnel des préférences du candidat (mode_travail, location...)
    :return: score (0 à 100), détails du matching
    """
    score = 0
    details = {
        'skills': 0,
        'experience': 0,
        'mode_travail': 0,
        'location': 0,
        'cv': 0,
        'type_offre': 0,
        'category': 0,
    }

    # Matching des compétences (40%)
    candidat_skills = {s.skill.name.lower() for s in candidat.skills if s.skill}
    offre_skills = {s.skill.name.lower() for s in offre.skills_required if s.skill}
    if offre_skills:
        matched_skills = candidat_skills.intersection(offre_skills)
        skill_score = (len(matched_skills) / len(offre_skills)) * 40
        details['skills'] = round(skill_score, 2)
        score += details['skills']

    # Matching de l'expérience (20%)
    nb_years = 0
    for exp in candidat.experiences:
            # Normalize both dates to date objects
        deb_date = exp.deb_date.date() if isinstance(exp.deb_date, datetime) else exp.deb_date
        end_date = (exp.fin_date.date() if exp.fin_date and isinstance(exp.fin_date, datetime) 
                    else exp.fin_date or datetime.utcnow().date())
        
        duration = end_date - deb_date
        nb_years += duration.days / 365.0
    if nb_years >= 2:
        details['experience'] = 20
        score += 20
    elif nb_years >= 1:
        details['experience'] = 10
        score += 10

    # Matching mode de travail (10%)
    if preferences and 'mode_travail' in preferences and offre.mode_travail:
        if preferences['mode_travail'].lower() == offre.mode_travail.lower():
            details['mode_travail'] = 10
            score += 10

    # Matching localisation (10%)
    if preferences and 'location' in preferences and offre.location:
        if preferences['location'].lower() in offre.location.lower():
            details['location'] = 10
            score += 10

    # Matching type_offre (5%)
    if preferences and 'type_offre' in preferences and offre.type_offre:
        if preferences['type_offre'].lower() == offre.type_offre.lower():
            details['type_offre'] = 5
            score += 5

    # Matching catégorie (5%)
    if preferences and 'category' in preferences and offre.category:
        if preferences['category'].lower() == offre.category.lower():
            details['category'] = 5
            score += 5

    # Matching basé sur le CV (10%) — Placeholder simplifié
    if candidat.resume:
        details['cv'] = 10  # à améliorer par analyse NLP
        score += 10

    return round(score, 2), details