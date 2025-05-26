import React, { useState } from 'react';
import {
  Switch,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Box,
  
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
import NavbarRecrut from '~/components/navbar-recrut';

const contractTypes = ['CDI', 'CDD', 'Stage', 'Temporaire', 'Prestataire', 'Autre'];
const workModes = ['100% Télétravail', 'Télétravail et présentiel', '100% Présentiel'];

const CreateOfferPage: React.FC = () => {
  const [generateOffer, setGenerateOffer] = useState(true);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [workMode, setWorkMode] = useState(workModes[0]);
  const [contract, setContract] = useState(contractTypes[0]);
  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');
  const [positions, setPositions] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('France');
  const [customForm, setCustomForm] = useState(false);
  const [preliminaryQuestions, setPreliminaryQuestions] = useState(false);

  return (
    <Box sx={{ backgroundColor: '#f6f8f9', minHeight: '100vh' , marginTop: "0px", fontFamily : 'Open Sans'}}>
        <NavbarRecrut/>
                        <h2 className="text-xl font-semibold mb-1 ml-6 mt-6">Talent matcher / ajouter un nouvel offre <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span></h2>

      <Grid container spacing={1} sx={{mt:6}} >

        {/* Form Section */}
        <Grid    sx={{ mb: 4 }} className='grid-container  px-4 items-center w-lg-2'>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <WorkOutline sx={{ mr: 1 }} />,
              }}
            />

            <TextField
              fullWidth
              label="Tags"
              variant="outlined"
              size="small"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <Description sx={{ mr: 1 }} />,
              }}
            />

            <TextField
              fullWidth
              label="Description du projet"
              variant="outlined"
              size="small"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Télétravail ou présentiel
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {workModes.map((mode) => (
                  <Button
                    key={mode}
                    variant={workMode === mode ? 'contained' : 'outlined'}
                    onClick={() => setWorkMode(mode)}
                  >
                    {mode}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Type de contrat
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {contractTypes.map((type) => (
                  <Button
                    key={type}
                    variant={contract === type ? 'contained' : 'outlined'}
                    onClick={() => setContract(type)}
                  >
                    {type}
                  </Button>
                ))}
              </Box>
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={4}>
                <TextField
                  label="Salaire min"
                  type="number"
                  fullWidth
                  size="small"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                  InputProps={{
                    startAdornment: <AttachMoney sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Salaire max"
                  type="number"
                  fullWidth
                  size="small"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                  InputProps={{
                    startAdornment: <AttachMoney sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Nombre de postes"
                  type="number"
                  fullWidth
                  size="small"
                  value={positions}
                  onChange={(e) => setPositions(e.target.value)}
                  InputProps={{
                    startAdornment: <People sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  label="Pays"
                  select
                  fullWidth
                  size="small"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <MenuItem value="France">France</MenuItem>
                  <MenuItem value="Madagascar">Madagascar</MenuItem>
                  {/* Add more countries as needed */}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Ville"
                  fullWidth
                  size="small"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
              <Button variant="contained" color="primary">
                Valider
              </Button>
            </Box>
          </Box>
        </Grid>

         {/* Preview */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex flex-col justify-between mb-4">
          <h3 className="font-semibold text-md">Aperçu</h3>
          <div className="flex flex-row justify-between bg-gray-100 rounded-lg p-2 w-full">
            <div className="flex flex-col">
                 <p className="font-semibold text-lg mb-1">Développement Informatique</p>
                    <p className="text-xs text-gray-500 mb-2">Publié le August 7, 2023</p>
            </div>

          </div>
        </div>
        <div className="text-sm text-gray-800">
         
          <p className="text-xs text-gray-500 mb-2">📍 {location}, {country}</p>
          <div className="flex gap-2 mb-2">
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">Application web</span>
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">Développeur</span>
          </div>
          <p className="text-sm mb-3">{description || 'Description du projet à venir.'}</p>
          <div >
            <div className="grid grid-cols-2 gap-10 justify-between py-2">
              <p className="font-medium">Télétravail ou présentiel</p>
              <p>{workMode}</p>
            </div>
            <div className="grid grid-cols-2 gap-10 justify-between py-2" >
              <p className="font-medium">Type de contrat</p>
              <p>{contract}</p>
            </div>
            <div className="grid grid-cols-2 gap-10 justify-between py-2">
              <p className="font-medium">Fourchette de salaire</p>
              <p>{salaryFrom}€ - {salaryTo}€</p>
            </div>
            <div className="grid grid-cols-2 gap-10 justify-between py-2">
              <p className="font-medium">Nombre de postes</p>
              <p>{positions}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-medium text-sm mb-1">Documents requis</p>
            <div className="flex gap-2 flex-wrap">
              {['CV', 'Lettre de motivation', 'Profil LinkedIn'].map((doc) => (
                <span key={doc} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">{doc}</span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-purple-700 text-white w-full py-2 rounded-full text-sm font-medium">Postuler</button>
          </div>
        </div>
      </div>
      </Grid>
    </Box>
  );
};

export default CreateOfferPage;
