import React, { useEffect, useState } from 'react';
import {
  Switch,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Box,
   Autocomplete, 
   Chip,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  WorkOutline,
  Description,
  LocationOn,
  AttachMoney,
  BusinessCenter,
  People,
  Preview,
} from '@mui/icons-material';

import DescriptionIcon from '@mui/icons-material/Description';
import NavbarRecrut from '~/components/navbar-recrut';
import Step1OfferInfo from '~/components/ajout-offre/step1-offre-detail';
import Step2MatchingModel from '~/components/ajout-offre/step2-model';
import Step3Evaluator from '~/components/ajout-offre/step3-evaluator';
import axios from 'axios';

const contractTypes = ['CDI', 'CDD', 'Stage', 'Temporaire', 'Prestataire', 'Autre'];
const workModes = ['100% Télétravail', 'Télétravail et présentiel', '100% Présentiel'];

const CreateOfferPage: React.FC = () => {
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    competences: '',
    workMode: 'Présentiel',
    contract: 'CDI',
    salaryFrom: '',
    salaryTo: '',
    positions: '',
    location: '',
    country: 'France',
    generateOffer: true,
    selectedSkills: [],
    matchingModel: null,
    evaluatorType: null,
  });
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };


  const handleSubmit = async () => {
   const payload = {
    title : formData.title,
    description : formData.description,
    location :`${formData.location} , ${formData.country}` ,
    statut_offre:true,
    category: formData.positions,
    type_offre: formData.contract,
    competences_requises: formData.competences,
    salaire: `${formData.salaryFrom} - ${formData.salaryTo}`,
    mode_travail: formData.workMode,
    generate_offer: formData.generateOffer,
    matching_model: formData.matchingModel,
    evaluator_type: formData.evaluatorType,
    skills: formData.selectedSkills.map(skill => skill.id),
    
  };
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post('http://localhost:5000/offer', payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // 🔑 token JWT récupéré après login
      },
    });

    alert('Offre créée avec succès !');
    console.log(response.data.offer);
    // Optionnel : reset du formulaire
  } catch (error) {
    if (error.response) {
      alert(`Erreur: ${error.response.data.error}`);
      console.error(error.response.data);
    } else {
      alert('Erreur réseau ou serveur.');
      console.error(error);
    }
  }
};


  return (
      <Box sx={{ backgroundColor: '#f6f8f9', minHeight: '100vh' , marginTop: "0px", fontFamily : 'Open Sans'}}>
        <NavbarRecrut/>
                        <h2 className="text-xl font-semibold mb-1 ml-6 mt-6">Talent matcher / ajouter un nouvel offre <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span></h2>
      <div>
      {step === 1 && (
        <Step1OfferInfo
          data={formData}
          onChange={handleChange}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <Step2MatchingModel
          data={formData}
          onChange={handleChange}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <Step3Evaluator
          data={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onBack={prevStep}
        />
      )}
      </div>

    </Box>
    
  );
};

export default CreateOfferPage;
