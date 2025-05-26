import { type RouteConfig, index, route,prefix, layout } from "@react-router/dev/routes";

// src/routes.ts
import DashboardLayoutSlots from './employeur/dash_recrut';
//import ParticipantsPage from './employeur/participants';
import TalentMatcherPage from './employeur/talent_matcher';
import ModelePredictifPage from './employeur/modele_predictif';
import EvaluationPage from './employeur/evaluation';
import type { JSX } from "react";

export interface AppRoute {
  path: string;
  segment: string;
  element: React.ComponentType;
}

export const appRoutes: AppRoute[] = [
  { path: 'recruteur/dashboard-contenu',  segment: 'recruteur/dashboard-contenu',  element: DashboardLayoutSlots },
  
  { path: 'recruteur/talent-matcher', segment: 'recruteur/talent-matcher',  element: TalentMatcherPage },
  { path: 'recruteur/modele-predictif', segment: 'recruteur/modele-predictif',  element: ModelePredictifPage },
  { path: 'recruteur/evaluation', segment: 'recruteur/evaluation',  element: EvaluationPage },
];

export default [
    index("routes/home.tsx"),
    ...prefix("auth", [
      
        route("signin", "./auth/sign-in/SignIn.tsx"),
        route("signup", "./auth/sign-up/SignUp.tsx"),
         route("recruteur/signup", "./auth/sign-up/SignUpRecrut.tsx"),
        route("forgotmdp", "./auth/forgotmdp/forgotmdp.tsx"),
      ]),
    ...prefix("employe", [
        route("dashboard", "./employe/dashboard.tsx"),
       ...prefix("accueil", [
    route("", "./employe/accueil.tsx"), // => /employe/accueil
    route("jobDetail/:id", "./employe/job_detail.tsx"), // => /employe/accueil/jobDetail/:id
  ]),
        route("profil", "./employe/profil.tsx"),
        route("test", "./employe/postuler/job_test.tsx"),
       // route("employee/:id", "./employee/Employee.tsx"),
    ]),
    ...prefix("recruteur", [
       layout( 
    "./employeur/dash_recrut.tsx",
    [
       route("dashboard", "./employeur/dash_content.tsx"),   // Default dashboard content
        route("detail-de-l-offre/:id", "./employeur/detail_offre.tsx"),
        route("talent_matcher", "./employeur/talent_matcher.tsx"),
        route("modele_predictif", "./employeur/modele_predictif.tsx"),
        route("evaluation", "./employeur/evaluation.tsx"),
      
    ],
  
  ),
     route("candidat/:id", "./employeur/profil_candidat.tsx"),
    route("ajouter-offre", "./employeur/ajouter_offre.tsx"),
]),
     


] satisfies RouteConfig;
