import axios from 'axios';
import React, { useState } from 'react';

interface InformationsGeneralesProps {
  resumeFile: File | null;
  handleResumeUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  skills: string[];
  newSkill: string;
  setNewSkill: (val: string) => void;
  addSkill: () => void;
  removeSkill: (index: number) => void;
  availableSkills: any[];
  experiences: any[];
  removeExperience: (index: number) => void;
  newExp: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const InformationsGenerales: React.FC<InformationsGeneralesProps> = ({
  resumeFile, skills, newSkill, setNewSkill, addSkill, removeSkill, availableSkills,
  experiences, removeExperience, newExp, handleChange, handleSubmit
}) => {
    const [resume, setResume] = useState<File | null>(null);
    const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setResume(file);

  const formData = new FormData();
  formData.append("cv", file);

  try {
    const res = await axios.post("http://localhost:5000/upload_cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Upload success:", res.data);
  } catch (error) {
    console.error("Upload error:", error);
  }
};

  return (
    <>
      {/* Upload CV */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Upload Resume/CV</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {resume && <p className="mt-2 text-sm text-green-700">Uploaded: {resume.name}</p>}
      </section>

      {/* Skills */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {skill}
              <button onClick={() => removeSkill(index)} className="ml-2 text-red-500 hover:text-red-700">&times;</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <select value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="border px-3 py-2 rounded-md w-full">
            <option value="">-- Select a skill --</option>
            {availableSkills.filter((skill) => !skills.includes(skill.name)).map((skill, idx) => (
              <option key={idx} value={skill.name}>{skill.name}</option>
            ))}
          </select>
          <button onClick={addSkill} disabled={skills.length >= 8} className={`px-4 py-2 rounded ${skills.length >= 8 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
            Ajouter
          </button>
        </div>
        {skills.length >= 8 && <p className="text-sm text-red-500 mt-1">8 skills au maximum.</p>}
      </section>

      {/* Expériences */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        <ul className="space-y-2 mb-4">
          {experiences.map((exp, index) => (
            <li key={index} className="p-4 border rounded-md bg-white shadow-sm relative">
              <button onClick={() => removeExperience(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl">&times;</button>
              <p className="font-semibold">{exp.title}</p>
              <p className="text-gray-600">{exp.entreprise}</p>
              <p className="text-sm text-gray-500">
                {new Date(exp.deb_date).toLocaleDateString()} - {exp.fin_date ? new Date(exp.fin_date).toLocaleDateString() : "Présent"}
              </p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
            <input name='title' value={newExp.title} onChange={handleChange} placeholder="Titre poste" className="border px-3 py-2 rounded-md" />
            <input name="entreprise" value={newExp.entreprise} onChange={handleChange} placeholder="Entreprise" className="border px-3 py-2 rounded-md" />
            <input name="debdate" value={newExp.debdate} type="date" onChange={handleChange} className="border px-3 py-2 rounded-md" />
            <input name="findate" value={newExp.findate} type="date" onChange={handleChange} className="border px-3 py-2 rounded-md" />
            <input name="description" value={newExp.description} onChange={handleChange} placeholder="Description" className="border px-3 py-2 rounded-md" />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Ajouter</button>
        </form>
      </section>
    </>
  );
};

export default InformationsGenerales;
