import React from "react";
import { Box, Button, Typography, Grid, styled, Paper } from "@mui/material";

// Exemple statique, à remplacer par des données dynamiques
const roles = [
  {
    title: "Évaluateurs en marketing",
    users: ["AB", "CD"], // Initiales ou images
  },
  {
    title: "Évaluateurs en développement",
    users: ["EF", "GH", "IJ"],
  },
  {
    title: "Évaluateurs en design",
    users: ["KL"],
  },
  {
    title: "Évaluateurs en gestion de projet",
    users: ["MN", "OP"],
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const rights = [
  { label: "Voir le CVS", allowed: true },
  { label: "Afficher toutes les fiches", allowed: false },
  { label: "Donner des commentaires", allowed: true },
  { label: "Gérer les participants", allowed: true },

  { label: "Gérer le rôle et le modèle prédictif", allowed: true },
   { label: "Gérer les entretiens", allowed: true },
    { label: "Supprimer un évaluateur", allowed: true },
     { label: "Ajouter un évaluateur", allowed: true },
      { label: "Afficher les rapports d'évaluations", allowed: true },
];

const Step3Evaluator = ({ data, onChange, onSubmit, onBack }) => {
  return (
    <Box sx={{ mt: 6, px: 2, }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Gérer les équipes et les droits
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 , backgroundColor: '#f6f8f9', p: 2 }}>
        {/* Colonne gauche - rôles */}
        <Grid  size ={{xs: 12, sm: 6, md: 8}}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
              
            {roles.map((role, index) => (
              <Grid  key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                 <Item sx={{border: "1px solid #ddd",}}>
                  <Box
                  sx={{
                    p: 2,
                    
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    height: "100%",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mb: 1, borderBottom: "1px solid #ddd" , py: 1, fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}>
                    {role.title}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                    {role.users.map((user, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          backgroundColor: "#e0e0e0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {user}
                      </Box>
                    ))}
                  </Box>
                </Box>
                 </Item>
                
              </Grid>
            ))}
        
          </Grid>
         
        </Grid>

        {/* Colonne droite - droits */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              backgroundColor: "#fafafa",
              p: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2, fontFamily: 'Arial, sans-serif', fontWeight: 'bold', borderBottom: "1px solid #ddd", py: 2 }}>
              Droits du groupe
            </Typography>
            <ul style={{ padding: 0, listStyle: "none" }}>
              {rights.map((right, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    
                    backgroundColor: right.allowed === true ? "#f0f0f0" : "#fff",
                    padding: "8px 12px",
                    marginBottom: "8px",
                    borderRadius: "4px",
                  }}
                >
                  <span>{right.label}</span>
                  <span>{right.allowed ? "✅" : "❌"}</span>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
      </Grid>

      {/* Navigation */}
      
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
                    onClick={onSubmit}>
              
                Suivant
              </Button>
                  </Box>
    </Box>
  );
};

export default Step3Evaluator;
