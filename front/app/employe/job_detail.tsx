import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import NavbarCli from "../components/navbar-cli";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  Grid,
} from '@mui/material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};


const jobstest = [
  {
    id: 1,
    title: 'React Developer Needed',
    description: 'We are seeking an experienced React developer...',
    company: 'Tech Solutions Inc.',
    requirements: [
      '3+ years experience in React',
      'Strong understanding of RESTful APIs',
      'Experience with Tailwind CSS',
    ],
    profile: 'Intermediate',
    budget: 300,
  },
  {
    id: 2,
    title: 'UI/UX Designer for Mobile App',
    description: 'Join our team to design a modern UI for a job app...',
    company: 'Designify',
    requirements: [
      'Experience in mobile UX design',
      'Portfolio of past projects',
      'Familiarity with Figma',
    ],
    profile: 'Entry',
    budget: 150,
  },
];

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const JobDetailsPage = () => {
     const [open, setOpen] = useState(false);
     const [offer, setOffer] = useState<any | null>(null);
      const [similarJobs, setSimilarJobs] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  

    const handleOpen = () => setOpen(true);
  const handleProceed = async () => {
      const token = localStorage.getItem("token");
       const decoded = parseJwt(token);

  if (!decoded || !decoded.user_id) {
    alert("Utilisateur non connecté ou token invalide.");
    return;
  }

   
  try {
    const response = await fetch('http://localhost:5000/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
          body: JSON.stringify({
        name: offer.title,
        job_offer_id: offer.id,
        status: 'en attente',
      }),
    });
    console.log("Offer title:", offer.title);
    console.log("Offer title:", offer.id);
    console.log("Offer user title:", decoded.user_id);
    console.log('response:', response);
    const result = await response.json();
    

    if (response.ok) {
      alert("Votre candidature a été enregistrée avec succès !");
      setOpen(false); // Ferme le modal
    } else {
      console.error(result);
      alert(result.error || "Une erreur s'est produite lors de la candidature.");
    }
  } catch (error) {
    console.error(error);
    alert("Erreur réseau : impossible d’envoyer la candidature.");
  }
   setOpen(false);
    //navigate('/employe/test');
  };

  //const job = jobs.find((j) => j.id === parseInt(id ?? ""));
  useEffect(() => {
    const fetchOffer = async () => {
    try {
      const token = localStorage.getItem("token"); // assuming you stored it during login
  
      const res = await fetch(`http://localhost:5000/offer/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
        const data = await res.json();
        console.log("Offer data get:", data);
        if (data && data.id) {
          setOffer(data);
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'offre :", err);
      }
    };
    if (id) {
        fetchOffer();
      }
    }, [id]);
// Echec : ici
  if (!offer) return <div className="p-8">Job not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6 pt-2" style={{ fontFamily: 'Open Sans', marginTop: "0px" }}>
        <NavbarCli />
                  <Link to="/" className="max-w-4xl mx-50 p-6 mt-6 text-green-600 hover:underline my-4">&larr; Retour aux offres </Link>

            <div className="max-w-4xl mx-auto p-6 mt-6 font-sans text-gray-800 bg-white rounded-lg shadow-md flex flex-row">
        <div className="lside ml-10" style={{ width: '70%' , minWidth: '50%'}}>

             <h1 className="text-2xl font-bold text-green-700">{offer.title}</h1>
        <p className="text-sm text-gray-600 mt-1">{offer.company?.name} · {offer.location}</p>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Description de l'offre</h2>
          <p className="text-gray-700 mt-2"> {offer.description}</p>
        </div>

       <div className="mt-4">
  <h2 className="text-lg font-semibold">Compétences</h2>
  <div className="flex flex-wrap gap-3 mt-2">
    {offer.skills_required && offer.skills_required.length > 0 ? (
      offer.skills_required.map((skill, index) => (
        <span
          key={index}
          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
        >
          {skill.name}
        </span>
      ))
    ) : (
      <span className="text-gray-500">Aucune compétences spécifiques requises</span>
    )}
  </div>
</div>

        
          <Button variant="contained"  onClick={handleOpen} className="mt-8" sx={{marginTop: '20px', backgroundColor: '#0a8051', color: 'white', '&:hover': { backgroundColor: '#45a049' } }}>
        Postuler
      </Button>
        </div>
        <div id="rside">
            <Stack spacing={2} className="bg-white p-4 rounded shadow-md">
                <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , backgroundColor: '#f6f8f9', padding: '20px', borderRadius: '10px' }}>
                    <h2 className="text-lg font-semibold">Matching</h2>
                    <p className="text-gray-700 mt-2">cet offre, correspond à votre profil de : </p>
                    <p className="text-gray-700 mt-2"> 60%</p>
                  
                </Grid>
                <h2 className="text-lg font-semibold">Similar Jobs</h2>
                 <ul className="list-disc ml-5 text-gray-700 mt-2">
              {(similarJobs || []).map((similarJob) => (
                <li key={similarJob.id}>
                  <Link to={`/employe/jobDetail/${similarJob.id}`} className="text-blue-600 hover:underline">
                    {similarJob.title}
                  </Link>
                </li>
              ))}
            </ul>
            </Stack>
        </div>
       

     

     
      </div>

       <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-title">
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            En postulant vous acceptez de donner votre accord pour que le recruteur puisse accéder à votre profil et vous contacter.
          </Typography>
          <Button
            onClick={handleProceed}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Procéder
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default JobDetailsPage;
