import React from 'react';
import { Star, CloudDownload } from '@mui/icons-material';
import NavbarRecrut from '../components/navbar-recrut';
import { Link } from 'react-router';



const CandidateProfilePage: React.FC = () => {
  return (
    <div className="bg-[#f6f8f9] min-h-screen font-sans  pb-6 pt-0">
      <NavbarRecrut />
              <Link to='/' className="text-md font-light mb-1 ml-50 my-4"> &larr; Talent matcher / detail de l'offre / Profil de Rasoa <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span></Link>

      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6 mx-50 mt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={`https://i.pravatar.cc/40?u=7`} alt="Irina Menlez" className="w-20 h-20 rounded-full" />
            <div>
              <h2 className="text-2xl font-semibold">Irina Menlez</h2>
              <p className="text-sm text-gray-500">irina.menlez@gmail.com</p>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full mt-1 inline-block">Candidature reçue</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">Ajouter dans une campagne</button>
            <button className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium">📩 Inviter</button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex gap-6 text-sm text-gray-600 border-b">
          {['Aperçu', 'Insight', 'Résultats', 'Évaluation', 'Talent map'].map((tab, i) => (
            <button key={i} className={`pb-2 ${i === 0 ? 'text-purple-700 font-semibold border-b-2 border-purple-700' : ''}`}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 mx-50">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
          <h3 className="text-sm font-semibold mb-1">Talent matching</h3>
          <p className="text-2xl font-bold">98%</p>
          <p className="text-xs">Commercial Grand compte</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center shadow-sm">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Score global</h3>
          <p className="text-2xl font-bold">45%</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center shadow-sm">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Feedback</h3>
          <div className="flex justify-center">
            {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400" />)}
          </div>
          <p className="text-sm mt-1">5/5</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center shadow-sm">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">CV Matching</h3>
          <p className="text-2xl font-bold text-green-600">70%</p>
        </div>
      </div>

      {/* CV + Tabs Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 mx-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold">Curriculum Vitae</h3>
          <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-full">
            <CloudDownload className="mr-2" /> Télécharger
          </button>
        </div>

        {/* Tab header */}
        <div className="flex gap-4 text-sm font-medium text-gray-500 border-b mb-4">
          {['Tout', 'Expériences', 'Formations', 'Certifications', 'Langues'].map((label, i) => (
            <button key={i} className={`pb-2 ${i === 0 ? 'text-purple-600 border-b-2 border-purple-600' : ''}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Experience Section */}
        <div>
          <h4 className="text-sm font-bold mb-2">Expériences</h4>
          <ul className="text-sm space-y-4">
            <li>
              <p className="font-semibold">International Key Manager</p>
              <p className="text-xs text-gray-500">Paris, France · CapsuleSoft · Juin 2013 - aujourd’hui</p>
              <p className="text-sm text-gray-600 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
            </li>
            <li>
              <p className="font-semibold">MachetePix</p>
              <p className="text-xs text-gray-500">Paris · Commerciale Grand compte · Septembre 2010 - Juin 2013</p>
              <p className="text-sm text-gray-600 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
            </li>
          </ul>
        </div>

        {/* Formations */}
        <div className="mt-6">
          <h4 className="text-sm font-bold mb-2">Formations</h4>
          <ul className="text-sm space-y-3">
            <li>
              <p className="font-semibold">Université des Elites</p>
              <p className="text-xs text-gray-500">Master 2 en Marketing – Paris, France</p>
            </li>
            <li>
              <p className="font-semibold">California Institute of the Arts</p>
              <p className="text-xs text-gray-500">Graphic Design Specialization – Paris, France</p>
            </li>
          </ul>
        </div>

        {/* Certifications */}
        <div className="mt-6">
          <h4 className="text-sm font-bold mb-2">Certifications</h4>
          <ul className="text-sm space-y-3">
            <li>
              <p className="font-semibold">Canvas - Communication and Children</p>
              <p className="text-xs text-gray-500">Graphic Design Specialization – Juin 2013 - aujourd’hui</p>
            </li>
          </ul>
        </div>

        {/* Langues */}
        <div className="mt-6">
          <h4 className="text-sm font-bold mb-2">Langues</h4>
          <ul className="flex gap-4 text-sm">
            {['Français', 'Espagnol', 'Mandarin'].map(lang => (
              <li key={lang} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{lang}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Documents Attachés */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h4 className="text-sm font-bold mb-4">Documents attachés</h4>
        <div className="flex gap-3 text-sm">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">📎 Lettre de motivation</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">📎 Autre document</span>
        </div>
      </div>

      {/* Preliminary Question */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h4 className="text-sm font-bold mb-4">Questions préliminaires</h4>
        <p className="text-sm font-medium mb-2">Avez-vous un permis de conduire ?</p>
        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Oui</span>
      </div>

      {/* Activity Feed */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="text-sm font-bold mb-4">Activités</h4>
        <ul className="space-y-3 text-sm text-gray-700">
          <li><strong>19.05.2022 – 08:43:</strong> White Houzz rejoint l’entreprise.</li>
          <li><strong>19.05.2022 – 08:43:</strong> Sonya Hajj a déplacé la candidate Maria Delmar...</li>
          <li><strong>19.05.2022 – 08:43:</strong> Rannoyer Clui a envoyé un message à Maria Delmar.</li>
          <li><strong>01.01.2022 – 08:43:</strong> Marte Altz est invitée à prendre AVATAR.</li>
          <li><strong>01.01.2022 – 08:43:</strong> Sonya Hajj a donné un retour sur Monome.</li>
        </ul>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
