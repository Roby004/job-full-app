import React, { type JSX } from 'react';
import '../css/dashstat_style.css';
import partIcon from '../images/Participants.png';
import expressIcon from '../images/Express.png';
import recrutementIcon from '../images/Recrutement.png';
import developpementIcon from '../images/Développement.png';


// Material UI Icons
import GroupIcon from '@mui/icons-material/Group';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';


type StatLabel = 'Participants' | 'Express' | 'Recrutement' | 'Développement';

const iconMap: Record<StatLabel, JSX.Element> = {
  Participants: <img src={partIcon} style = {{}} color="primary" />,
  Express: <img src={expressIcon} style = {{}} color="primary" />,
  Recrutement: <img src={recrutementIcon} style = {{}} color="primary" />,
  Développement: <img src={developpementIcon} style = {{}} color="primary" />,
};

function DashStat() {
  const stats: { label: StatLabel; value: number }[] = [
    { label: 'Participants', value: 736 },
    { label: 'Express', value: 1423 },
    { label: 'Recrutement', value: 32 },
    { label: 'Développement', value: 1035 },
  ];

  return (
    <div className="dash-stat-container px-4">
      {stats.map((item) => (
        <div key={item.label} className="dash-stat-card">
          <div className="icon-wrapper">{iconMap[item.label]}</div>
          <div className="label">{item.label}</div>
          <div className="value">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export default DashStat;
