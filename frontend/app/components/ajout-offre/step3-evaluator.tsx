import { Radio } from "@mui/icons-material";
import { Box, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Typography } from "@mui/material";
import React from "react";

const Step3Evaluator= ({ data, onChange, onSubmit, onBack}) => {
    const formData = data || {};
    return (
        <div>
    <Typography variant="h6" sx={{ mb: 2 }}>Choix des participants</Typography>
    <FormControl>
      <FormLabel>Participants</FormLabel>
      <RadioGroup
        value={data.matchingModel}
        onChange={(e) => onChange( 'matchingModel', e.target.value)}
      >
          <FormControlLabel value="self" control={<Radio />} label="Moi uniquement" />
        <FormControlLabel value="group" control={<Radio />} label="Un groupe d’évaluateurs" />
      </RadioGroup>
    </FormControl>

    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
      <Button variant="outlined" onClick={onBack}>Retour</Button>
      <Button variant="contained" onClick={onSubmit}>Suivant</Button>
    </Box>
  </div>
    );
    };
export default Step3Evaluator;
