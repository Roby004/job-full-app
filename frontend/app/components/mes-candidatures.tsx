import React from 'react';

interface MesCandidaturesProps {
  candidatures: any[];
}

const MesCandidatures: React.FC<MesCandidaturesProps> = ({ candidatures }) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Mes candidatures</h2>
      {candidatures.length === 0 ? (
        <p className="text-gray-600">Aucune candidature pour le moment.</p>
      ) : (
        <ul className="space-y-2">
          {candidatures.map((c, i) => (
            <li key={i} className="p-4 border rounded-md bg-white shadow-sm">
              <p className="font-medium">{c.titre || 'Titre inconnu'}</p>
              <p className="text-gray-500 text-sm">{c.statut || 'Statut inconnu'}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MesCandidatures;
