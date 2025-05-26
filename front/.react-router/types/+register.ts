import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/auth/signin": {};
  "/auth/signup": {};
  "/auth/recruteur/signup": {};
  "/auth/forgotmdp": {};
  "/employe/dashboard": {};
  "/employe/accueil": {};
  "/employe/accueil/jobDetail/:id": {
    "id": string;
  };
  "/employe/profil": {};
  "/employe/test": {};
  "/recruteur/dashboard": {};
  "/recruteur/detail-de-l-offre/:id": {
    "id": string;
  };
  "/recruteur/talent_matcher": {};
  "/recruteur/modele_predictif": {};
  "/recruteur/evaluation": {};
  "/recruteur/candidat/:id": {
    "id": string;
  };
  "/recruteur/ajouter-offre": {};
};