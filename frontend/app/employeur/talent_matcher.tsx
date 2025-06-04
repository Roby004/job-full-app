import { useDemoRouter } from '@toolpad/core/internal';
import React from 'react';
import { useNavigate } from 'react-router-dom';

//import useToolpadRouter  from '@toolpad/core/internal';
//import { useToolpadRouter } from '@toolpad/core/router';


import { useEffect, useState } from "react";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import axios from 'axios';
import { Link } from 'react-router';


interface Offer {
  id: number;
  title: string;
  description: string;
  location: string;
  posted_at: string;
  statut_offre: boolean;
  category: string;
  type_offre: string;
  company: {
    name: string;
  };
}

export default function TalentMatcherPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/recruteur/detail-de-l-offre/${id}`);
  };

  useEffect(() => {
  const fetchOffers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/offer/my-offers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data; // Axios parse déjà en JSON

      if (result.status === "success") {
        console.log("Offers fetched successfully:", result);
        setOffers(result.offers);
      } else {
        console.error("Failed to fetch offers:", result.message);
      }
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  fetchOffers();
}, []);

  return (
    <div className="bg-[#f6f8f9] min-h-screen px-10 py-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div className='flex flex-row gap-4 items-center'>
     <h1 className="text-2xl font-semibold">Liste de vos campagnes</h1>
     <Link to='/recruteur/ajouter-offre'>
      <button className="flex items-center bg-white border border-[#4d08a1] text-[#4d08a1] px-4 py-1 rounded-full hover:bg-purple-50 text-sm font-medium">
          <span className="mr-2 text-lg"> <AddCircleRoundedIcon sx={{color:'#4d08a1'}}/> </span> Ajouter
        </button>
     </Link>

       
        </div>
         <input
                type="text"
                placeholder="Rechercher un candidat..."
                className="border border-[#eeedf0] bg-white px-4 py-2 rounded-md text-sm w-64 focus:ring-1 focus:ring-purple-500"
              />
       
      </div>

      <div className="overflow-x-auto">
       
<table className="w-full table-auto border-collapse">
  <thead>
    <tr className="text-center text-sm text-gray-500">
      <th className="py-2 px-4 font-medium">Nom de l’offre</th>
      <th className="py-2 px-4 font-medium">Candidats</th>
      <th className="py-2 px-4 font-medium">Localisation</th>
      <th className="py-2 px-4 font-medium">Type</th>
      <th className="py-2 px-4 font-medium">Date</th>
      <th className="py-2 px-4 font-medium">Statut</th>
    </tr>
  </thead>
</table>

<div className="space-y-4 mt-4">
  {offers.map((offer) => (
    <div
      key={offer.id}
      className="bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition cursor-pointer"
      onClick={() => handleRowClick(offer.id)}
    >
      <div className="grid grid-cols-7 gap-4 text-sm text-gray-700 items-center p-4">
        <div className="col-span-2 text-left">
          <p className="font-semibold">{offer.title}</p>
          <p className="text-xs text-purple-600">{offer.category}</p>
        </div>
        <div className="text-center">100</div>
        <div className="text-center">{offer.location}</div>
        <div className="text-center">{offer.type_offre}</div>
        <div className="text-center">{new Date(offer.posted_at).toLocaleDateString()}</div>
        <div className="text-center">
          <span
            className={`px-2 py-1 text-xs rounded-full font-medium ${
              offer.statut_offre
                ? "bg-green-100 text-green-600"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {offer.statut_offre ? "Ouverte" : "Fermée"}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>


      </div>

      <div className="mt-6 flex justify-center">
        <button className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold px-6 py-2 rounded-full">Voir plus</button>
      </div>
    </div>
  );
}
