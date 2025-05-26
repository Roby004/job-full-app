import React, { useState } from 'react';
import NavbarCli from "../components/navbar-cli";

interface Experience {
  role: string;
  company: string;
  years: string;
  description: string;
}

const Profil: React.FC = () => {

    const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'JavaScript', 'CSS', 'Git']);
  const [newSkill, setNewSkill] = useState('');
 // const [resumeFile, setResumeFile] = useState<File | null>(null);
const [experience, setExperience] = useState<Experience[]>([
    { role: 'Frontend Developer Intern', company: 'Tech Solutions Inc.', years: '2023', description: 'Worked on developing user interfaces using React and TypeScript.' },
    { role: 'Junior Web Developer', company: 'Creative Web Studio', years: '2022 - 2023', description: 'Assisted in building responsive websites and web applications.' }
  ]);
  const [newExp, setNewExp] = useState<Experience>({ role: '', company: '', years: '' , description : ''});

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const user = {
    name: 'Jane Doe',
    profilePic: 'https://via.placeholder.com/150',
    bio: 'Aspiring software engineer with a passion for front-end development and user experience design.',
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Git'],
    experience: [
      { role: 'Frontend Developer Intern', company: 'Tech Solutions Inc.', years: '2023' },
      { role: 'Junior Web Developer', company: 'Creative Web Studio', years: '2022 - 2023' }
    ],
    suggestedCompanies: ['OpenAI', 'Meta', 'Google', 'Spotify', 'Netflix']
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    if (newExp.role && newExp.company && newExp.years) {
      setExperience([...experience, newExp]);
      setNewExp({ role: '', company: '', years: '' , description: '' });
    }
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6 pt-2">
            <NavbarCli />

            <div className="max-w-4xl mx-auto p-6 mt-6 font-sans text-gray-800 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-6">
        <img src={user.profilePic} alt="Profile" className="w-32 h-32 rounded-full border shadow-sm" />
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="mt-2 text-gray-600">{user.bio}</p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Upload Resume/CV</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
        {resumeFile && <p className="mt-2 text-sm text-green-700">Uploaded: {resumeFile.name}</p>}
      </section>

       <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
              <button onClick={() => removeSkill(index)} className="ml-2 text-red-500 hover:text-red-700">&times;</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add skill"
            className="border px-3 py-2 rounded-md w-full"
          />
          <button onClick={addSkill} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        <ul className="space-y-2 mb-4">
          {experience.map((exp, index) => (
            <li key={index} className="p-4 border rounded-md bg-white shadow-sm relative">
              <button
                onClick={() => removeExperience(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
              >
                &times;
              </button>
              <p className="font-semibold">{exp.role}</p>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.years}</p>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
          <input
            value={newExp.role}
            onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
            placeholder="Role"
            className="border px-3 py-2 rounded-md"
          />
          <input
            value={newExp.company}
            onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
            placeholder="Company"
            className="border px-3 py-2 rounded-md"
          />
          <input
            value={newExp.years}
            onChange={(e) => setNewExp({ ...newExp, years: e.target.value })}
            placeholder="Years"
            className="border px-3 py-2 rounded-md"
          />
        </div>
        <button onClick={addExperience} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Experience</button>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Suggested Companies</h2>
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
