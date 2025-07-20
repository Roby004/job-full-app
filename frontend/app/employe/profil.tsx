import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import NavbarCli from '../components/navbar-cli';
import InformationsGenerales from '../components/info-gen';
import MesCandidatures from '../components/mes-candidatures';
//import CandidatePreferencesModal from '../components/candidat-preference';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

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
          {['Python', 'Développement web', 'React', 'Communication'].map((skill) => (
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


const Profil: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'infos' | 'candidatures'>('infos');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [availableSkills, setAvailableSkills] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [newEducation, setNewEducation] = useState({ formation: '', ecole: '', debdate_educ: '', findate_educ: '', description_educ : '' });
  const [newExp, setNewExp] = useState({ title: '', entreprise: '', debdate: '', findate: '', description: '' });
const user = {
   
    suggestedCompanies: ['OpenAI', 'Meta', 'Google', 'Spotify', 'Netflix']
  };
 const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const [matchScore, setMatchScore] = useState(null);

 const handleSubmitPreferences = (preferences) => {
    // Sauvegarder dans localStorage
    localStorage.setItem('candidatePreferences', JSON.stringify(preferences));
       const pref = JSON.parse(localStorage.getItem("candidatePreferences"));
    console.log("Préférences sauvegardées :", pref);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = res.data.data;
      setUserData(data);
      setExperiences(data?.candidat?.experiences || []);
      setEducation(data?.candidat?.educations || []);
      setResumeFile(data?.candidat?.resume ? new File([data.candidat.resume], 'resume.pdf') : null);
      console.log('User Data:', data);
      console.log('skills',data?.candidat?.skills);
      setSkills(data?.candidat?.skills.map((s: any) => s.name));    };
    const fetchSkills = async () => {
      const res = await axios.get("http://localhost:5000/skills", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAvailableSkills(res.data || []);
    };
    fetchData();
    fetchSkills();
  }, []);
 // console.log("User Data:", skills);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewExp({ ...newExp, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/experience", newExp, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.data.status === "success") {
      setExperiences([...experiences, response.data.data]);
      setNewExp({ title: '', entreprise: '', debdate: '', findate: '', description: '' });
    }
  };
    const handleEducChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewEducation({ ...newEducation, [e.target.name]: e.target.value });

   const handleEducSubmit = async (e: React.FormEvent) => {
    const eduData = {
  formation: newEducation.formation,
  ecole: newEducation.ecole,
  deb_date: newEducation.debdate_educ,
  fin_date: newEducation.findate_educ || null,
  description: newEducation.description_educ
};
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/education", newEducation, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.data.status === "success") {
      setEducation([...education, response.data.data]);
      setNewEducation({ formation: '', ecole: '', debdate_educ: '', findate_educ: '', description_educ: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6 pt-2">
      <NavbarCli />
      <div className="max-w-4xl mx-auto p-6 mt-6 font-sans text-gray-800 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-6">
          <img src={'https://via.placeholder.com/150'} className="w-32 h-32 rounded-full border shadow-sm" />
          <div>
            <h1 className="text-3xl font-bold">{userData?.candidat.fullname || 'Loading...'}</h1>
            <p className="mt-2 text-gray-600">{userData?.candidat?.bio || 'Bio non disponible'}</p>
          </div>
        </div>

        {/* Onglets */}
        <div className="flex gap-4 mt-6 border-b border-[#dadada] pb-0">
          <button className={`${activeTab === 'infos' ? 'border-b-3 border-[#BAA3EC]  text-[#023047]' : ''} pb-2 flex`} onClick={() => setActiveTab('infos')}>
            <LightbulbOutlinedIcon className="ml-1 " />
            Informations générales
          </button>
          <button className={`${activeTab === 'candidatures' ? 'border-b-3 border-[#BAA3EC]  text-[#023047]' : ''} pb-2 flex `} onClick={() => setActiveTab('candidatures')}>
            <ArticleOutlinedIcon className="ml-1" fontSize="small" />
            Mes candidatures
          </button>
        </div>

        {/* Contenu */}
        {activeTab === 'infos' ? (
          <InformationsGenerales
            resumeFile={resumeFile}
          
            skills={skills}
            newSkill={newSkill}
            setNewSkill={setNewSkill}
            addSkill={() => { if (newSkill && !skills.includes(newSkill)) setSkills([...skills, newSkill]) }}
            removeSkill={(index) => setSkills(skills.filter((_, i) => i !== index))}
            availableSkills={availableSkills}
            experiences={experiences}
            education={education}
            newEducation={newEducation}
            addEducation={handleEducSubmit}
            removeEducation={(index) => setEducation(education.filter((_, i) => i !== index))}
            handleEducChange={handleEducChange}
            removeExperience={(index) => setExperiences(experiences.filter((_, i) => i !== index))}
            newExp={newExp}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <MesCandidatures candidatures={userData?.candidat?.candidatures || []} />
        )}

         <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Suggested Companies</h2>
       <button onClick={handleOpen} className="bg-blue-500 text-white px-4 py-2 rounded">
        Préférences de matching
      </button>

      <CandidatePreferencesModal
        open={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmitPreferences}
      />
        <ul className="grid grid-cols-2 gap-3">
          {user.suggestedCompanies.map(company => (
            <li key={company} className="p-3 bg-gray-100 rounded-md text-center font-medium text-gray-700">
              {company}
            </li>
          ))}
        </ul>
      </section>
      </div>
        
   
    </div>
   
 
    
  );
};

export default Profil;
function setOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}

