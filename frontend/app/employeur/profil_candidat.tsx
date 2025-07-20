import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CloudDownload, Star } from '@mui/icons-material';
import StepRecrutement from '~/components/step-recrutement';
import NavbarRecrut from '../components/navbar-recrut';
import axios from 'axios';

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  deb_date: string;
  fin_date: string;
  description: string;
}

interface Education {
  id: number;
  school: string;
  degree: string;
  location: string;
}

interface Certification {
  id: number;
  name: string;
  date_obtained: string;
}

interface Candidate {
  id: number;
  fullname: string;
  email: string;
  avatar_url?: string;
  resume?: string;
  skills: { id: number; name: string }[];
  experiences: Experience[];
  formations: Education[];
  certifications: Certification[];
  languages: string[];
}

const CandidateProfilePage = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [openSteps, setOpenSteps] = useState(false);

 useEffect(() => {
    const fetchCandidatDetails = async () => {
       const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `http://localhost:5000/candidat/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
        );
        setCandidate(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des candidats", err);
      }
    };
    fetchCandidatDetails();
  }, [id]);
 
  if (!candidate) return <div className="p-10">Chargement...</div>;

  return (
    <div className="bg-[#f6f8f9] min-h-screen font-sans pb-6 pt-0">
      <NavbarRecrut />
      <Link to="/" className="text-md font-light mb-1 ml-50 my-4">
        &larr; offres / détail de l'offre / Profil de {candidate.fullname}{' '}
        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
          Active
        </span>
      </Link>

      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6 mx-50 mt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src='/app/images/avatar1.png'
              alt={candidate.fullname}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold">{candidate.fullname}</h2>
              <p className="text-sm text-gray-500">{candidate.email}</p>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full mt-1 inline-block">
                Candidature reçue
              </span>
            </div>
          </div>
          <div className="flex gap-4">
           
            <button
              onClick={() => setOpenSteps(!openSteps)}
              className="bg-[#023047] text-white px-4 py-2 rounded-lg hover:bg-[#03507f]"
            >
              📋 Étapes de recrutement
            </button>
            {openSteps && (
              <div className="absolute z-40 mt-2 w-[400px] right-0 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-base font-semibold text-[#023047]">
                      Suivi du recrutement
                    </h2>
                    <button
                      onClick={() => setOpenSteps(false)}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      ✖
                    </button>
                  </div>
                  <StepRecrutement candidat={candidate} />
                </div>
              </div>
            )}
          </div>
        </div>

       
      </div>

      {/* Cards statiques */}
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

      {/* Résumé */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 mx-50">
        <div className="flex justify-between mb-4">
          <h3 className="text-md font-semibold">Curriculum Vitae</h3>
          <button className="flex bg-[#023047] text-white px-4 py-2 rounded-full w-[20%]">
            <CloudDownload className="mr-2" /> Télécharger
          </button>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-sm font-bold mb-2">Compétences</h4>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((s) => (
              <span key={s.id} className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">
                {s.name}
              </span>
            ))}
          </div>
        </div>

        {/* Experiences */}
        <div>
          <h4 className="text-sm font-bold mb-2">Expériences</h4>
          <ul className="text-sm space-y-4">
            {candidate.experiences.map((exp) => (
              <li key={exp.id}>
                <p className="font-semibold">{exp.title}</p>
                <p className="text-xs text-gray-500">
                  {exp.location} · {exp.company} · {exp.deb_date} - {exp.fin_date || 'Aujourd’hui'}
                </p>
                <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
              </li>
            ))}
          </ul>
        </div>
             {/* Documents attachés */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h4 className="text-sm font-bold mb-4">Documents attachés</h4>
        <div className="flex gap-3 text-sm">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">📎 Lettre de motivation</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">📎 Autre document</span>
        </div>
      </div>
       
      </div>

     
    </div>
  );
};

export default CandidateProfilePage;
