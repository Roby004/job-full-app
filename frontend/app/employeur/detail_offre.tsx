import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import NavbarRecrut from '../components/navbar-recrut';

interface Participant {
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
}

const participants: Participant[] = [
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

const DetailOffrePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"participants" | "description">("participants");
   const { id } = useParams();
  // Fetch data from backend (offer by ID)
const [offer, setOffer] = useState<any | null>(null);

useEffect(() => {
  const fetchOffer = async () => {
  try {
    const token = localStorage.getItem("token"); // assuming you stored it during login

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
      }
    } catch (err) {
      console.error("Erreur lors du chargement de l'offre :", err);
    }
  };
  if (id) {
      fetchOffer();
    }
  }, [id]);

  const handleRowClick = (id: number) => {
    navigate(`/recruteur/candidat/${id}`);
  };

  



  return (
    <div className="min-h-screen w-full font-sans">
      {/* Header Tabs */}
      <div className="mb-6 bg-white px-4 w-full pt-6 pb-0 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-1">
          Talent matcher / Détail de l'offre
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            Active
          </span>
        </h2>

        <div className="flex items-center space-x-6 pb-2 text-sm text-gray-600 mt-2">
          <button
            className={`relative font-semibold ${
              activeTab === "participants" ? "text-purple-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("participants")}
          >
            Participants{" "}
            <span className="ml-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
              {participants.length}
            </span>
            {activeTab === "participants" && (
              <div className="absolute -bottom-2 left-0 h-1 w-full bg-purple-600 rounded-t" />
            )}
          </button>

          <button
            className={`font-semibold ${
              activeTab === "description" ? "text-purple-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
            {activeTab === "description" && (
              <div className=" -bottom-2 left-0 h-1 w-full bg-purple-600 rounded-t" />
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
                <button className="bg-white border text-sm px-4 py-2 rounded-lg text-gray-700">
                  Quick Reporting
                </button>
                <button className="bg-white border text-sm px-4 py-2 rounded-lg text-gray-700">
                  Filtres
                  <span className="ml-2 bg-purple-600 text-white px-2 py-0.5 rounded-full text-xs">
                    5
                  </span>
                </button>
              </div>
              <input
                type="text"
                placeholder="Rechercher un candidat..."
                className="border px-4 py-2 rounded-md text-sm w-64 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Participant Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-center text-sm text-gray-500 mb-2">
                    <th className="pb-2">Candidat</th>
                    <th className="pb-2">Score global</th>
                    <th className="pb-2">Test matching</th>
                    <th className="pb-2">Feedback</th>
                    <th className="pb-2">CV matching</th>
                    <th className="pb-2">Progression</th>
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
                          <div className="flex items-center w-2/5">
                            <input type="checkbox" className="mr-4" />
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-full mr-4" />
                            <div>
                              <p className="font-semibold text-sm">{p.name}</p>
                              <p className="text-xs text-gray-500">
                                {p.role} · {p.experience}
                              </p>
                              <div className="flex gap-1 mt-2 flex-wrap">
                                {p.tags.map((tag, i) => (
                                  <span
                                    key={i}
                                    className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="w-[80px] text-center text-xl font-semibold text-gray-800">
                            {p.globalScore}%
                          </div>

                          <div className="text-center w-[80px] text-sm">{p.testMatching}%</div>

                          <div className="text-center w-[80px] text-sm">
                            <div className="text-yellow-500 text-xl">★</div>
                            <div>{p.feedback}/5</div>
                          </div>

                          <div className="text-center w-[80px] text-sm">
                            <div
                              className={`text-sm font-medium ${
                                p.statusColor === "red" ? "text-red-500" : "text-green-600"
                              }`}
                            >
                              {p.cvMatching}%
                            </div>
                          </div>

                          <div className="text-right text-sm w-1/4">
                            <div className="mb-1">
                              {p.stage}
                              <span className="ml-2 text-gray-600">{p.stepProgress}</span>
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
        ) : (
          // DESCRIPTION TAB
          <div className="bg-white p-6 rounded shadow-sm max-w-4xl mx-auto text-sm leading-6 text-gray-700">
           {offer && (
  <div className="bg-white p-6 rounded shadow-sm max-w-5xl mx-auto" >
      <div className="flex flex-row sm:flex-col  justify-between mb-4" style = {{display: 'flex', flexDirection: 'row'}}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{offer.title} </h2>

        <button className=" w- 100 ml-2 text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-xl">
              Fermer l'offre
            </button>
      </div>
    <p className="text-sm text-gray-500 mb-2">{offer.company?.name} · {offer.location}</p>
    <div className="text-gray-700 leading-relaxed text-sm mb-4 whitespace-pre-line">
      {offer.description}
    </div>

    <div>
      <h3 className="text-md font-semibold text-gray-800 mb-2">Compétences requises</h3>
      <div className="flex flex-wrap gap-3">
        {offer.skills?.map((skill: string, index: number) => (
          <span
            key={index}
            className="border border-gray-300 bg-gray-50 text-gray-700 text-xs px-3 py-1 rounded-full shadow-sm hover:shadow-md transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
)}

          </div>
        )}
      </div>
    </div>
  );
};

export default DetailOffrePage;
