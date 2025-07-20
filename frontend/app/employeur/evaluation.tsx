import React, { useState } from 'react';

interface Evaluation {
  id: string;
  title: string;
  credit: number;
  isSelected: boolean;
  premium?: boolean;
}

const initialEvaluations: Evaluation[] = [
  { id: 'bfs', title: 'BFS', credit: 25, isSelected: true },
  { id: 'competences2', title: 'Profil Compétences 2', credit: 30, isSelected: true },
  { id: 'ctpir', title: 'CTPI-R', credit: 45, isSelected: true },
  { id: 'entrepreneur', title: 'Test entrepreneur', credit: 20, isSelected: true },
  { id: 'pro2', title: 'Profil pro 2', credit: 40, isSelected: false, premium: true },
  { id: 'etix', title: 'ETIX', credit: 30, isSelected: false, premium: true },
  { id: 'culture', title: 'Test de culture générale', credit: 30, isSelected: false },
  { id: 'work_old', title: 'Work profile old', credit: 30, isSelected: false, premium: true },
];

const EvaluationPage: React.FC = () => {
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [proctoring, setProctoring] = useState(false);

  const toggleSelect = (id: string) => {
    setEvaluations((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, isSelected: !e.isSelected } : e
      )
    );
  };

  const selected = evaluations.filter((e) => e.isSelected);
  const totalCredits = selected.reduce((acc, curr) => acc + curr.credit, 0);

  return (
    <div className="bg-[#f6f8f9] min-h-screen p-10 font-sans">
      <h2 className="text-xl font-semibold mb-6">Ajouter des évaluations</h2>

      <div className="flex flex-wrap gap-3 mb-8">
        {['Tous', 'Personnalité et profil professionnel', 'Intérêts et motivations', 'Aptitudes commerciales', 'Raisonnement et pensée critique', 'Intelligence émotionnelle et gestion du stress', 'Connaissances métiers', 'MyLab', 'Smart interview', 'Informatique et Technique'].map((cat) => (
          <button key={cat} className="px-4 py-1 rounded-full text-sm bg-[#023047]-100 text-[#023047]-700">
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Evaluations */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {evaluations.map((evalItem) => (
            <div key={evalItem.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-[#023047]-100 rounded-md" />
                <span className="text-sm font-semibold text-gray-700">{evalItem.credit} <span className="text-xs">Crédit</span></span>
              </div>
              <p className="text-sm font-semibold mb-1">{evalItem.title}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center text-xs text-gray-500 gap-1">
                  🇫🇷 <span>Language</span>
                </div>
                <button
                  onClick={() => toggleSelect(evalItem.id)}
                  className={`w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs font-semibold ${
                    evalItem.isSelected
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {evalItem.isSelected ? '✓' : '+'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm w-full lg:w-80">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">News <span className="text-xs text-gray-500">{selected.length}</span></h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {selected.map((e, i) => (
                <li key={e.id} className="flex justify-between">
                  <span>{i + 1}. {e.title}</span>
                  <span>{e.credit}<span className="text-xs ml-1">crédit</span></span>
                </li>
              ))}
            </ul>
            <div className="border-t border-dashed my-3" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{totalCredits} <span className="text-xs font-normal">crédit</span></span>
            </div>
          </div>

          <div className="text-sm space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-2">
                🛡️ Activer le proctoring
              </span>
              <input
                type="checkbox"
                checked={proctoring}
                onChange={() => setProctoring(!proctoring)}
                className="toggle toggle-sm"
              />
            </label>

            <button className="w-full text-left text-gray-700 hover:text-[#023047]-600 flex items-center gap-2">⚙️ Paramétrer l’envoi</button>
            <button
              onClick={() =>
                setEvaluations((prev) => prev.map((e) => ({ ...e, isSelected: false })))
              }
              className="w-full text-left text-red-500 hover:text-red-700 flex items-center gap-2"
            >
              🗑️ Enlever tout
            </button>
          </div>

          <button className="mt-6 w-full bg-gradient-to-r from-[#023047]-600 to-[#023047]-700 text-white py-2 rounded-full text-sm font-semibold shadow hover:from-[#023047]-700 hover:to-[#023047]-800">
            📤 Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
