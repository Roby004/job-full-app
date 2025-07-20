import React from "react";

const EtapeRecrut: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded shadow-sm max-w-4xl mx-auto text-sm leading-6 text-gray-700">
        <h2 className="text-lg font-semibold mb-4">Étapes du Recrutement</h2>
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
        <ul className="list-disc pl-5 space-y-2">
            <li>Analyse des candidatures</li>
            <li>Entretien téléphonique</li>
            <li>Entretien en personne</li>
            <li>Test technique</li>
            <li>Décision finale</li>
        </ul>
        </div>
    );
    }
    export default EtapeRecrut;