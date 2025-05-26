import React, { useState } from 'react';
import '../css/listParticipant.css';

interface Participant {
  name: string;
  email: string;
}

const participants: Participant[] = [
  { name: "Marimar Delmar", email: "mirimar001.delmar@gmail.com" },
  { name: "Jessica Vololona", email: "jessolona24.32@gmail.com" },
  { name: "Irina Menlez", email: "iri43menlez@gmail.com" },
  { name: "Tina Rafaly", email: "tinarafaly007@gmail.com" },
];

const campaigns = [
  { company: "TechNova", position: "Chef de projet" },
  { company: "SoftBridge", position: "Data Analyst" },
  { company: "InnoSphere", position: "UI/UX Designer" },
  { company: "BrightFuture", position: "DevOps Engineer" },
];

const ListParticipant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'participants' | 'campaigns'>('participants');
  const [timeFilter, setTimeFilter] = useState<'semaine' | 'mois' | 'annee'>('semaine');

  return (
    <section className="participants-section">
      <div className="tabs">
        <div className="tabs-left">
          <span
            className={`tab ${activeTab === 'participants' ? 'active' : ''}`}
            onClick={() => setActiveTab('participants')}
          >
            Participants (10)
          </span>
          <span
            className={`tab ${activeTab === 'campaigns' ? 'active' : ''}`}
            onClick={() => setActiveTab('campaigns')}
          >
            Campagnes (14)
          </span>
        </div>
        <select
          className="time-filter"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value as 'semaine' | 'mois' | 'annee')}
        >
          <option value="semaine">Cette semaine</option>
          <option value="mois">Ce mois</option>
          <option value="annee">Cette année</option>
        </select>
      </div>

      <ul className="card-list">
        {activeTab === 'participants'
          ? participants.map((user) => (
              <li key={user.email} className="card">
                <img
                  src={`https://i.pravatar.cc/40?u=${user.email}`}
                  alt={user.name}
                  className="avatar"
                />
                <div className="card-info">
                  <h4 style={{fontWeight : 600 , }}>{user.name}</h4>
                  <p style={{fontSize : '13px', color : 'darkgray'}}>{user.email}</p>
                </div>
                <button className="profile-button">Big Five Profile</button>
                <span className="job-title">Recrutement Chef de projet</span>
              </li>
            ))
          : campaigns.map((c, i) => (
              <li key={i} className="card">
                <img
                  src={`https://ui-avatars.com/api/?name=${c.company}&background=random`}
                  alt={c.company}
                  className="avatar"
                />
                <div className="card-info">
                  <h4 style={{fontWeight : 600 , }}>{c.company}</h4>
                  <p style={{fontSize : '13px', color : 'darkgray'}}>{c.position}</p>
                </div>
                <span className="job-title">Campagne active</span>
              </li>
            ))}
      </ul>
    </section>
  );
};

export default ListParticipant;
