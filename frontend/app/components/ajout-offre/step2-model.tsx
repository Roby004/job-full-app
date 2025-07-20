import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

const models = [
  {
    id: "IA",
    title: "Modèle IA",
    description: "Matching basé sur l’intelligence artificielle.",
  },
  {
    id: "manuel",
    title: "Matching manuel",
    description: "Matching basé sur les préférences manuelles du candidat.",
  },
];

const Step2MatchingModel = ({ data, onChange, onNext, onBack }) => {
  const selectedModel = data?.matchingModel;

  const handleSelect = (modelId) => {
    onChange("matchingModel", modelId);
  };

  return (
    <Grid container spacing={0} sx={{ mt: 6, px: 2, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 3 }}>Choix du modèle de matching</Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {models.map((model) => {
          const isSelected = selectedModel === model.id;
          return (
            <div
              key={model.id}
              onClick={() => handleSelect(model.id)}
              className={`cursor-pointer p-4 rounded-lg shadow-sm border transition ${
                isSelected ? "border-[#023047]-600 bg-[#023047]-50" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#023047]-100 w-8 h-8 rounded flex items-center justify-center text-[#023047]-600 text-lg">
                  📁
                </div>
                <div>
                  <p className="font-semibold text-sm">{model.title}</p>
                  <p className="text-xs text-gray-500">{model.description}</p>
                </div>
              </div>

              <button className="w-full mt-4 text-sm text-[#023047]-600 border border-[#023047]-200 px-4 py-2 rounded-full font-medium hover:bg-[#023047]-100">
                📄 Afficher les compétences
              </button>
            </div>
          );
        })}
      </div>

     
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4, mt: 4, width: '100%', mb: 2 }}>
              <Button  variant="text"   sx={{
                  background: 'linear-gradient(264.79deg,rgb(204, 204, 204) 47.52%,rgb(188, 222, 255) 126.2%)',
                  borderRadius: '40px',
                  color: 'gray',
                  width: '150px',
                }} onClick={onBack}>Retour</Button>
             <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(264.79deg, #023047 47.52%, #206EBB 126.2%)',
                  borderRadius: '40px',
                   width: '150px',
                   color: 'white',
                }}
              onClick={onNext}
          disabled={!selectedModel}
        >
          Suivant
        </Button>
            </Box>
    </Grid>
  );
};

export default Step2MatchingModel;
