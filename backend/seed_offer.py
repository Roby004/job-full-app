from datetime import datetime
from models.database import db
from models.offer import Offer
from models.jobofferskill import OfferSkill
import random

def seed_data_offers():
    titles = [
        "Développeur Backend Python",
        "Ingénieur DevOps Cloud",
        "Analyste Données",
        "Designer UX Senior",
        "Architecte Logiciel",
        "Scrum Master",
        "Spécialiste Réseaux",
        "Consultant ERP",
        "Formateur IT",
        "Développeur Frontend React"
    ]

    locations = [
        "Antananarivo, Madagascar", "Lyon, France", "Bruxelles, Belgique", "Bamako, Mali",
        "Dakar, Sénégal", "Port-Louis, Maurice", "Abidjan, Côte d'Ivoire", "Tunis, Tunisie"
    ]

    categories = ["Développement", "Infrastructure", "Design", "Data", "Éducation"]
    types = ["CDI", "Stage", "Freelance"]
    company_ids = [10,11,12,13]
    skill_ids = list(range(1, 28))

    def generate_description(title, category):
        return f"""
**Description générale** :
Nous recherchons un(e) {title} passionné(e) par le domaine de {category.lower()}. Vous intégrerez une équipe dynamique œuvrant sur des projets à fort impact.

**Missions principales** :
- Analyser les besoins techniques et fonctionnels
- Développer, tester et maintenir des applications robustes
- Collaborer avec des équipes multidisciplinaires
- Participer aux cérémonies agiles (daily, sprint, review)

**Compétences requises** :
- Excellente maîtrise des outils et langages en lien avec {category.lower()}
- Bonne communication, autonomie et sens de l'organisation
- 2+ années d'expérience (ou équivalent stage pour les juniors)

**Rémunération** :
1000 $
"""

    offers = []
    for i in range(10):
        offer = Offer(
            title=titles[i],
            description=generate_description(titles[i], random.choice(categories)),
            location=random.choice(locations),
            posted_at=datetime.utcnow(),
            company_id=random.choice(company_ids),
            statut_offre=random.choice([True, False]),
            category=random.choice(categories),
            type_offre=random.choice(types)
        )
        db.session.add(offer)
        offers.append(offer)

    db.session.commit()

    # Add skills
    for offer in offers:
        linked_skills = random.sample(skill_ids, k=random.randint(2, 4))
        for sid in linked_skills:
            os = OfferSkill(job_offer_id=offer.id, skill_id=sid)
            db.session.add(os)

    db.session.commit()
    print("✅ 10 detailed offers with skills seeded.")
