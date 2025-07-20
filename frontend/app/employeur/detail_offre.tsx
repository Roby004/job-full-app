import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import NavbarRecrut from '../components/navbar-recrut';
import { Box, Typography } from '@mui/material';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import FreeCancellationRoundedIcon from '@mui/icons-material/FreeCancellationRounded';
import EtapeRecrut from '~/components/liste_etape_recrut';
import axios from 'axios';
import '../css/listParticipant.css';

/*interface Participant {
  id: number;
  name: string;
  role: string;
  experience: string;
  image: string;
  tags: string[];
  globalScore: number;
  testMatching: number;
  feedback: number;
  cvMatching: number;
  stage: string;
  stepProgress: string;
  progress: number;
  statusColor?: 'green' | 'red';
}*/

/*const participants: Participant[] = [
  {
    id: 1,
    name: 'Marimar Delmar',
    role: 'Administrateur commercial',
    experience: '6 ans d’expérience',
    image: '/app/images/avatar1.png',
    tags: ['tag1', 'tag_long', 'tag2'],
    globalScore: 94,
    testMatching: 40,
    feedback: 5,
    cvMatching: 70,
    stage: '1/6',
    stepProgress: 'Candidature reçue',
    progress: 16,
  },
  {
    id: 2,
    name: 'Jessica Vololona',
    role: 'Commercial',
    experience: '2 ans d’expérience',
    image: '/app/images/avatar2.png',
    tags: ['tag1', 'tag_long', 'tag2'],
    globalScore: 68,
    testMatching: 70,
    feedback: 3,
    cvMatching: 10,
    statusColor: 'red',
    stage: '2/6',
    stepProgress: 'Candidature reçue',
    progress: 32,
  },
  {
    id: 3,
    name: 'Marimar Delmar',
    role: 'Administrateur commercial',
    experience: '6 ans d’expérience',
    image: '/app/images/avatar1.png',
    tags: ['tag1', 'tag_long', 'tag2'],
    globalScore: 94,
    testMatching: 40,
    feedback: 5,
    cvMatching: 70,
    stage: '4/6',
    stepProgress: 'Présélection',
    progress: 66,
  },
  {
    id: 4,
    name: 'Irina Menlez',
    role: 'Commercial',
    experience: '3 ans d’expérience',
    image: '/app/images/avatar3.png',
    tags: ['tag1', 'tag_long', 'tag2'],
    globalScore: 45,
    testMatching: 98,
    feedback: 5,
    cvMatching: 70,
    stage: '6/6',
    stepProgress: 'Proposition',
    progress: 100,
  },
];
*/

const DetailOffrePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"participants" | "description" | "etapes">("participants");
   const { id } = useParams();
  // Fetch data from backend (offer by ID)
const [offer, setOffer] = useState<any | null>(null);
const [participants, setParticipants] = useState([]);

useEffect(() => {
  const fetchOffer = async () => {
  try {
    const token = localStorage.getItem("token"); 
    console.log("user id" , id);// assuming you stored it during login

    const res = await fetch(`http://localhost:5000/offer/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }
      const data = await res.json();
      console.log("Offer data get:", data);
      if (data && data.id) {
        setOffer(data);
           localStorage.setItem("selectedOfferId", offer?.id);
 //localStorage.setItem("SelectedOfferCompanyName", offer.company?.name || "");
      }
    } catch (err) {
      console.error("Erreur lors du chargement de l'offre :", err);
    }
  };
  if (id) {
      fetchOffer();
    
    }
  }, [id])
  console.log("Offer data:", offer?.id, offer?.company?.name, offer?.title);
  
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/offer/${id}/candidats`
        );
        setParticipants(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des participants", err);
      }
    };
    fetchParticipants();
  }, [id]);
  console.log("Participants data:", participants);
  // assuming company name is available
  


  const handleRowClick = (id: number) => {
    navigate(`/recruteur/candidat/${id}`);
  };

  



  return (
    <div className="min-h-screen w-full font-sans">
      {/* Header Tabs */}
      <div className="mb-6 bg-white px-4 w-full pt-6 pb-0 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-1">
          offres / Détail de l'offre
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            Ouvert
          </span>
        </h2>

        <div className="flex items-center space-x-6 pb-0 text-sm text-gray-600 mt-2">
          <button
            className={`relative font-semibold pb-2 ${
              activeTab === "participants" ? "text-[#023047]-600  active" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("participants")}
          >
            Participants{" "}
            <span className="ml-1 text-xs bg-[#023047]-100 text-[#023047]-700 px-2 py-0.5 rounded-full ">
              {participants.length}
            </span>
            {activeTab === "participants" && (
              <div className="-bottom-2 left-0 h-1 w-full bg-[#023047]-600 rounded-t" />
            )}
          </button>

          <button
            className={`font-semibold pb-2 ${
              activeTab === "description" ? "text-[#023047]-700 active" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
            {activeTab === "description" && (
              <div className=" -bottom-2 left-0 h-1 w-full bg-[#023047]-600 rounded-t" />
            )}
          </button>
            <button
            className={`font-semibold pb-2 ${
              activeTab === "etapes" ? "text-[#023047]-800 active" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("etapes")}
          >
            Etapes
            {activeTab === "etapes" && (
              <div className=" -bottom-2 left-0 h-1 w-full bg-[#023047]-600 rounded-t" />
            )}
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 contenu">
        {activeTab === "participants" ? (
          <>
            {/* Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button className="bg-white border border-[#e0e0e0] text-sm px-4 py-2 rounded-lg text-gray-700">
                  Quick Reporting
                </button>
                <button className="bg-white border border-[#e0e0e0] text-sm px-4 py-2 rounded-lg text-gray-700">
                  Filtres
                  <span className="ml-2 bg-[#023047]-600 text-white px-2 py-0.5 rounded-full text-xs">
                    5
                  </span>
                </button>
              </div>
              <input
                type="text"
                placeholder="Rechercher un candidat..."
                className="border border-[#e0e0e0] bg-white px-4 py-2 rounded-md text-sm w-64 focus:ring-1 focus:ring-[#023047]-500"
              />
            </div>

            {/* Participant Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-center text-sm text-gray-500 mb-2">
                    <th className="pb-2 w-2/5" >Candidat</th>
                    <th className="pb-2 w-[100px]  break-words whitespace-normal">Score global</th>
                    <th className="pb-2 w-[100px] break-words whitespace-normal">Test matching</th>
                    <th className="pb-2 w-[100px]">Feedback</th>
                    <th className="pb-2 w-[100px]  break-words whitespace-normal">CV matching</th>
                    <th className="pb-2 w-1/4">Progression</th>
                  </tr>
                </thead>
                  <tbody className="space-y-4">
                  {participants.map((p, index) => (
                    <tr key={index}>
                      <td colSpan={6}>
                        <div
                          className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
                          onClick={() => handleRowClick(p.id)}
                        >
                          {/* Colonne Candidat */}
                          <div className="flex items-center w-2/5">
                            <input type="checkbox" className="mr-4" />
                            <img src='/app/images/avatar1.png' alt={p?.fullname} className="w-10 h-10 rounded-full mr-4" />
                            <div>
                              <p className="font-semibold text-sm">{p?.fullname}</p>
                             <div className="flex gap-1 mt-2 flex-wrap">
                              {p.skills?.map((tag, i) => (
                                <span
                                  key={i}
                                  className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full"
                                >
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                            </div>
                          </div>

                          {/* Colonne Score global */}
                          <div className="w-[100px] text-center text-xl font-semibold text-gray-800">
                            70%
                          </div>

                          {/* Colonne Test matching */}
                          <div className="text-center w-[100px] text-sm">80%</div>

                          {/* Colonne Feedback */}
                          <div className="text-center w-[100px] text-sm">
                            <div className="text-yellow-500 text-xl">★</div>
                            <div>{p.avis_general}/5</div>
                          </div>

                          {/* Colonne CV matching */}
                          <div className="text-center w-[100px] text-sm">
                            <div
                              className={`text-sm font-medium ${
                                p.cv_matching < 60 ? "text-red-500" : "text-green-600"
                              }`}
                            >
                              {p.cv_matching}%
                            </div>
                          </div>

                          {/* Colonne Progression */}
                          <div className="text-right text-sm w-1/4">
                            <div className="mb-1">
                              {p.stage}
                              <span className="ml-2 text-gray-600">{p.step_progress}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${p.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </>
        ) : (activeTab === "description" ? (
          // DESCRIPTION TAB
          <div className="bg-white p-6 rounded shadow-sm max-w-4xl mx-auto text-sm leading-6 text-gray-700">
           {offer && (
  <div className="bg-white p-6 rounded shadow-sm max-w-5xl mx-auto" >
      <div className="flex flex-row sm:flex-col  justify-between mb-4" style = {{display: 'flex', flexDirection: 'row'}}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{offer.title} </h2>

        <div className="flex flex-row  items-center justify-between mt-2">
           <button className=" ml-2 text-sm  px-4 py-2 rounded-xl" style={{
            fontSize: '14px',
            background: 'linear-gradient(273.65deg, #7547DA 1.4%, #1B0939 113.96%), linear-gradient(274.98deg, #7547DA 38.27%, #68E1FD 121.18%)',
            color: 'white',
            }}>
              <FreeCancellationRoundedIcon className="mr-1" />Fermer l'offre
            
            </button>
            <button className=" w- 100 ml-2 text-sm  border boder-[#023047]-700  px-2 py-2 rounded-xl">
                <BorderColorRoundedIcon className="mr-1" />
              Modifier l'offre
            </button> 
        </div>
       
      </div>
    <p className="text-sm text-gray-500 mb-2">{offer.company?.name} · {offer.location}</p>
    <div className="text-gray-700 leading-relaxed text-sm mb-4 whitespace-pre-line">
      {offer.description}
    </div>
    <div className="text-gray-700 leading-relaxed text-sm mb-4 whitespace-pre-line">
      <p>Compétences requises</p>
      {offer.competences_requises}
    </div>
     <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2">Télétravail ou présentiel</Typography>
              <Typography variant="body2">{offer.mode_travail}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2">Type de contrat</Typography>
              <Typography variant="body2">{offer.type_offre}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2">Fourchette de salaire</Typography>
              <Typography variant="body2">
                {offer.salaire} Ar
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2">Catégorie</Typography>
              <Typography variant="body2">{offer.category}</Typography>
            </Box>
          </Box>
    
          

    <div>
      <h3 className="text-md font-semibold text-gray-800 mb-2">Compétences requises</h3>
     <div className="flex flex-wrap gap-3">
  {offer.skills_required?.map((skill: { id: number; name: string }, index: number) => (
    <span
      key={skill.id || index}
      className="bg-[#fff1cc] text-[#c79202] px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition"
    >
      {skill.name}
    </span>
  ))}
</div>
<Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Documents requis
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['CV', 'Lettre de motivation', 'Profil LinkedIn'].map((doc) => (
                <span key={doc} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                  {doc}
                </span>
              ))}
            </Box>
          </Box>
    </div>
  </div>
)}

          </div>
        ) : (
          // ETAPES TAB
          <EtapeRecrut />
            ))}
              
      </div>
    </div>
  );
};

export default DetailOffrePage;
