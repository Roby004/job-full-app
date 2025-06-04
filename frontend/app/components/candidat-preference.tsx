import { useState } from "react";

const CandidatePreferencesModal = ({ open, onClose, onSubmit }) => {
  const [preferences, setPreferences] = useState({
    mode_travail: '',
    type_offre: '',
    min_salaire: '',
    categories: [],
    skills: [],
  });

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (skill) => {
    setPreferences((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const submitPreferences = () => {
    onSubmit(preferences);
    onClose();
  };

  return open ? (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Vos préférences d'emploi</h2>

        <label>Mode de travail :</label>
        <select name="mode_travail" onChange={handleChange} className="w-full mb-3">
          <option value="">Peu importe</option>
          <option value="télétravail">Télétravail</option>
          <option value="présentiel">Présentiel</option>
        </select>

        <label>Type d'offre :</label>
        <select name="type_offre" onChange={handleChange} className="w-full mb-3">
          <option value="">Peu importe</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Freelance">Freelance</option>
        </select>

        <label>Salaire minimum souhaité (€) :</label>
        <input type="number" name="min_salaire" onChange={handleChange} className="w-full mb-3" />

        <label>Compétences préférées :</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {['Python', 'Django', 'React', 'Laravel'].map((skill) => (
            <button
              key={skill}
              type="button"
              className={`px-3 py-1 rounded-full border ${preferences.skills.includes(skill) ? 'bg-blue-200' : ''}`}
              onClick={() => handleSkillChange(skill)}
            >
              {skill}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Annuler</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={submitPreferences}>
            Appliquer
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
