import { useState, useEffect } from "react";

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
import axios from 'axios';


const contractTypes = ['CDI', 'CDD', 'Stage', 'Temporaire', 'Prestataire', 'Autre'];
const workModes = ['100% Télétravail', 'Télétravail et présentiel', '100% Présentiel'];
const Step1OfferInfo = ({ data, onChange, onNext }) => {
    const [generateOffer, setGenerateOffer] = useState(true);
      const [title, setTitle] = useState('');
      const [tags, setTags] = useState('');
      const [description, setDescription] = useState('');
      const [competences, setCompetences] = useState('');
      const [workMode, setWorkMode] = useState(workModes[0]);
      const [contract, setContract] = useState(contractTypes[0]);
      const [salaryFrom, setSalaryFrom] = useState('');
      const [salaryTo, setSalaryTo] = useState('');
      const [positions, setPositions] = useState('');
      const [location, setLocation] = useState('');
      const [country, setCountry] = useState('France');
      const [customForm, setCustomForm] = useState(false);
      const [preliminaryQuestions, setPreliminaryQuestions] = useState(false);
      const [skills, setSkills] = useState<any[]>([]);
      const [selectedSkills, setSelectedSkills] = useState<any[]>([]);

        // Récupérer les skills existants
        useEffect(() => {
          axios
            .get('http://localhost:5000/skills', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // adapte selon ton auth
              }
            })
            .then((res) => {
              if (Array.isArray(res.data)) {
                setSkills(res.data);
              }
            })
            .catch((err) => {
              console.error('Erreur récupération skills:', err);
            });
        }, []);
      
  return (
   <div>

     <Grid container spacing={0} sx={{ mt: 6, px: 2, width: '100%' ,sm: { display:'flex', flexDirection:'column' } }}>
      {/* Form Section - Left Side */}
         <div className="bg-white rounded-lg shadow-md p-0 " style={{marginRight: '1px', width: '50%' , minWidth: '48%' }}>
          <Box sx={{ backgroundColor: '#fff', borderRadius: 2, p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Créer une nouvelle offre</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={generateOffer}
                    onChange={() => setGenerateOffer(!generateOffer)}
                    color="primary"
                  />
                }
                label="Générer offre"
              />
            </Box>

            <TextField
              fullWidth
              label="Titre du projet"
              variant="outlined"
              size="small"
               value={data.title}
                onChange={(e) => {onChange('title', e.target.value), setTitle(e.target.value)}}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <WorkOutline sx={{ mr: 1 }} />,
              }}
            />
            <Grid xs={4}>
                <TextField
                  label="Catégorie"
                  type="text"
                  fullWidth
                  size="small"
                   value={data.positions}
                onChange={(e) => {onChange('positions', e.target.value), setPositions(e.target.value)}}
                 
                  InputProps={{
                    startAdornment: <People sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>

           <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Compétences (skills)
      </Typography>
      <Autocomplete
        multiple
        options={skills}
        getOptionLabel={(option) => option.name}
        value={data.selectedSkills}
        onChange={(event, newValue) => {setSelectedSkills(newValue), onChange('selectedSkills', newValue)}}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              sx={{
                border: '1px solid #4d08a1',
                color: '#4d08a1',
                backgroundColor: '#f7f1ff',
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="outlined"
            size="small"
            label="Skills Tags"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <DescriptionIcon sx={{ mr: 1 }} />
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>

            <TextField
              fullWidth
              label="Description du projet"
              variant="outlined"
              size="small"
              multiline
              rows={4}
              value={data.description}
              onChange={(e) => {onChange('description', e.target.value), setDescription(e.target.value)}}
             
              sx={{ mb: 2 }}
            />
              <TextField
              fullWidth
              label="Compétences requises"
              variant="outlined"
              size="small"
              multiline
              rows={4}
              value={data.competences}
              onChange= {(e) => {onChange('competences', e.target.value), setCompetences(e.target.value)}}
            
              sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Télétravail ou présentiel
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {workModes.map((mode) => {
                    const isActive = workMode === mode;
                    return (
                      <Button
                        key={mode}
                        variant={isActive ? 'contained' : 'outlined'}
                        onClick={() =>{ setWorkMode(mode), onChange('workMode', mode)}}
                        sx={{
                          bgcolor: isActive ? '#6531ad' : 'transparent',
                          color: isActive ? '#fff' : '#6531ad',
                          borderColor: '#6531ad',
                          '&:hover': {
                            bgcolor: isActive ? '#3a067e' : '#f3eaff', // un hover plus doux
                            borderColor: '#6531ad',
                            color: '#6531ad',
                          },
                        }}
                      >
                        {mode}
                      </Button>
                    );
                  })}
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Type de contrat
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {contractTypes.map((type) => {
                    const isActive = contract === type;
                    return (
                      <Button
                        key={type}
                        variant={isActive ? 'contained' : 'outlined'}
                        onClick={() => {setContract(type), onChange('contract', type)}}
                        sx={{
                          bgcolor: isActive ? '#6531ad' : 'transparent',
                          color: isActive ? '#fff' : '#6531ad',
                          borderColor: '#6531ad',
                          '&:hover': {
                            bgcolor: isActive ? '#3a067e' : '#f3eaff',
                            borderColor: '#6531ad',
                            color: '#6531ad',
                          },
                        }}
                      >
                        {type}
                      </Button>
                    );
                  })}
                </Box>
              </Box>


            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid xs={4}>
                <TextField
                  label="Salaire min"
                  type="number"
                  fullWidth
                  size="small"
                  value={data.salaryFrom}
                  onChange={(e) => { onChange('salaryFrom', e.target.value) , setSalaryFrom(e.target.value)}}
                  InputProps={{
                    startAdornment: <AttachMoney sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  label="Salaire max"
                  type="number"
                  fullWidth
                  size="small"
                  value={salaryTo}
                  onChange={(e) =>{ setSalaryTo(e.target.value), onChange('salaryTo', e.target.value)}}
                  InputProps={{
                    startAdornment: <AttachMoney sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid xs={6}>
                <TextField
                  label="Pays"
                  select
                  fullWidth
                  size="small"
                  value={data.country}
                  onChange={(e) =>{ setCountry(e.target.value), onChange('country', e.target.value)}}
                >
                  <MenuItem value="France">France</MenuItem>
                  <MenuItem value="Madagascar">Madagascar</MenuItem>
                  {/* Add more countries as needed */}
                </TextField>
              </Grid>
              <Grid  xs={6}>
                <TextField
                  label="Ville"
                  fullWidth
                  size="small"
                  value={data.location}
                  onChange={(e) => {setLocation(e.target.value), onChange('location', e.target.value)}}
                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={customForm}
                    onChange={() => setCustomForm(!customForm)}
                  />
                }
                label="Personnaliser le formulaire"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={preliminaryQuestions}
                    onChange={() => setPreliminaryQuestions(!preliminaryQuestions)}
                  />
                }
                label="Questions préliminaires"
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="text">Annuler</Button>
             <Button
                variant="contained"
                color="primary"
                onClick={onNext}
              >
                Suivant
              </Button>
            </Box>
          </Box>
        </div>

      {/* Preview Section - Right Side */}
  <div className="bg-white rounded-lg shadow-md p-4 w-1/2 "style={{marginLeft:'20px', width: '48%' , minWidth: '48%', height: 'fit-content'}}>
    <Box sx={{ backgroundColor: '#fff', borderRadius: 2, p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Aperçu
      </Typography>

      <Box sx={{ backgroundColor: '#f0f0f0', borderRadius: 1, p: 2, mb: 2 }}>
        <Typography variant="subtitle1">{ title ? title : 'Titre du projet'}</Typography>
        <Typography variant="caption" color="textSecondary">
          Publié le August 7, 2023
        </Typography>
      </Box>

      <Typography variant="body2" color="textSecondary">
       <LocationOn sx={{ mr: 1 }} /> {location}, {country}
      </Typography>

          <Box sx={{ display: 'flex', gap: 1, my: 1, flexWrap: 'wrap' }}>
          {selectedSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full"
            >
              {skill.name}
            </span>
          ))}
        </Box>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {description || 'Description du projet à venir.'}
      </Typography>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
          <Typography variant="body2">Télétravail ou présentiel</Typography>
          <Typography variant="body2">{workMode}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
          <Typography variant="body2">Type de contrat</Typography>
          <Typography variant="body2">{contract}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
          <Typography variant="body2">Fourchette de salaire</Typography>
          <Typography variant="body2">
            {salaryFrom}€ - {salaryTo}€
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
          <Typography variant="body2">Catégorie</Typography>
          <Typography variant="body2">{positions}</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Documents requis
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['CV', 'Lettre de motivation', 'Profil LinkedIn'].map((doc) => (
            <span key={doc} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
              {doc}
            </span>
          ))}
        </Box>
      </Box>
    </Box>
  </div>
      </Grid>
    </div>
  );
};

export default Step1OfferInfo;