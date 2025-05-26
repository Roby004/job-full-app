import sidepic from "../../images/Login.png";
import '../signstyle.css';
import * as React from 'react';
import {
  TextField, FormControl, IconButton, InputAdornment,
  InputLabel, OutlinedInput, FormGroup
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router";

export default function SignUpCompany() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyDescription: '',
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
      role: "recruteur",
      company_name: formData.companyName,
      description: formData.companyDescription,
    };

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Inscription réussie !");
        navigate("/auth/signin");
      } else {
        alert(`Erreur: ${result.message || 'Une erreur est survenue.'}`)
        console.log("Erreur lors de l'inscription", result);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      alert("Une erreur technique est survenue.");
    }
  };

  return (
    <div className="flex flex-row">
      <div className="login px-4 py-2">
        <img src={sidepic} alt="login" className="h-auto" width="790px" height="200px" />
      </div>

      <div className="layout flex flex-col items-center pt-0 pb-4 px-20" style={{ marginTop: '30px' }}>
        <div className="w-100 items-center justify-center mt-10">
          <h1 className="text-3xl font-bold text-center">Créer un compte entreprise</h1>
          <p className="label-simple">Remplissez les informations ci-dessous pour vous inscrire sur Key Predict.</p>
        </div>

        <div className="input-forms">
              <TextField
            required
            name="companyName"
            label="Nom de l'entreprise"
            value={formData.companyName}
            onChange={handleChange}
            className="inpute w-full py-4 px-2"
             sx={{ marginTop: '5px', marginBottom: '20px' }}
          />

          <TextField
            required
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            className="inpute w-full py-4 px-2"
           
          />
           <TextField
            name="companyDescription"
            label="Description de l'entreprise"
            multiline
            rows={3}
            value={formData.companyDescription}
            onChange={handleChange}
            className="inpute w-full py-4 px-2"
            sx={{ mt: 2 }}
          />

          <FormGroup className="inpute w-full ">
            <FormControl variant="outlined" className="w-full mb-6 pb-4" sx={{ mt: 2 , order: '1' }}>
              <InputLabel htmlFor="password">Mot de passe</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Mot de passe"
              />
            </FormControl>

            <FormControl variant="outlined" className="w-full pb-4" sx={{ mt: 4 , order: '1' }}>
              <InputLabel htmlFor="confirmPassword">Confirmer le mot de passe</InputLabel>
              <OutlinedInput
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmer le mot de passe"
              />
            </FormControl>
          </FormGroup>

        
         
        </div>

        <div style={{ marginTop: '50%', order :'6',width: '100%' }}>
          <button className="btn-valider w-full" onClick={handleSubmit}>
            Créer votre compte
          </button>
        </div>

        <div className="inscription mt-4">
          <p>Vous avez déjà un compte Key Predict ?</p>
          <NavLink to="/auth/signin" className="label">
            <p className="link" style={{ color: 'purple', fontWeight: 600 }}>Connectez-vous</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
