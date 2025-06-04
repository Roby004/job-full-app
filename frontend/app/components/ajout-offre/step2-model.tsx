import { Radio } from "@mui/icons-material";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Typography } from "@mui/material";
import React from "react";

const Step2MatchingModel= ({ data, onChange, onNext, onBack}) => {
    const formData = data || {};
    return (
             <Grid container spacing={0} sx={{ mt: 6, px: 2, width: '100%' ,sm: { display:'flex', flexDirection:'column' } }}>

    <Typography variant="h6" sx={{ mb: 2 }}>Choix du modèle de matching</Typography>
    <FormControl>
      <FormLabel>Modèle</FormLabel>
      <RadioGroup
        value={data.matchingModel}
        onChange={(e) => onChange( 'matchingModel', e.target.value)}
      >
        <FormControlLabel value="IA" control={<Radio />} label="Modèle IA" />
        <FormControlLabel value="manuel" control={<Radio />} label="Matching manuel" />
      </RadioGroup>
    </FormControl>

    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
      <Button variant="outlined" onClick={onBack}>Retour</Button>
      <Button variant="contained" onClick={onNext}>Suivant</Button>
    </Box>
  </Grid>
    );
    };

export default Step2MatchingModel;