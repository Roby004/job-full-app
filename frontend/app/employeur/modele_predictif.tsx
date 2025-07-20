import React from 'react';

interface Model {
  id: number;
  title: string;
  description: string;
  groupAction?: boolean;
}

const models: Model[] = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: 'Administration réseaux',
  description: 'Métiers: Personnalité et profil professionnel',
  groupAction: i % 2 === 0,
}));

const ModelePredictifPage: React.FC = () => {
  return (
    <div className="bg-[#f6f8f9] min-h-screen p-10 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Modèle prédictif</h2>
        <div className="flex items-center space-x-6 border-b pb-2 text-sm text-gray-600">
          <button className="relative text-[#023047]-600 font-semibold">
            Mes modèles <span className="ml-1 text-xs bg-[#023047] text-[#023047]px-2 py-0.5 rounded-full">10</span>
            <div className="absolute -bottom-2 left-0 h-1 w-full bg-[#023047]-600 rounded-t" />
          </button>
          <button className="text-gray-500 hover:text-[#023047]-500 transition">Modèles standards <span className="ml-1 text-xs bg-gray-200 px-2 py-0.5 rounded-full">14</span></button>
        </div>
      </div>

      {/* View Switch + Add */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button className="bg-['#023047'] text-white px-4 py-1.5 text-sm rounded-full">Liste</button>
          <button className="bg-gray-100 text-gray-600 px-4 py-1.5 text-sm rounded-full">Groupe</button>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center bg-white border border-[#023047] text-[#023047] px-4 py-2 rounded-lg hover:bg-[#023047]/10 text-sm font-medium">
  <span className="mr-2 text-lg">＋</span> Ajouter
</button>

          <input
            type="text"
            placeholder="Rechercher une campagne…"
            className="border px-4 py-2 rounded-md text-sm w-64 focus:ring-1 focus:ring-[#023047]-500"
          />
        </div>
      </div>

      {/* Description */}
      <div className="text-sm text-gray-500 mb-6">
        <p>Insérez les modèles ci-dessous dans un (des) groupe(s) afin de les utiliser sur la Talent Map ou sur des rapports personnalisés.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div key={model.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="bg-[#023047]-100 w-8 h-8 rounded flex items-center justify-center text-[#023047]-600 text-lg">📁</div>
                <div>
                  <p className="font-semibold text-sm">{model.title}</p>
                  <p className="text-xs text-gray-500">{model.description}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 text-xl">⋮</button>
            </div>

            {model.groupAction && (
              <button className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full mb-3">
                ➕ Ajouter à un offre
              </button>
            )}

            <button className="w-full text-sm text-[#023047]-600 border border-[#023047]-200 px-4 py-2 rounded-full font-medium hover:bg-[#023047]-50">
              📄 Afficher les compétences
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelePredictifPage;
