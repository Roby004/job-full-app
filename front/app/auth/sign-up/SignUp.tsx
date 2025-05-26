import sidepic from "../../images/Login.png"
import '../signstyle.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { colors, FormControl, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router";


export default function SignIn() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
     const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullname: '',
      });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

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
      role: "candidat",
      fullname: formData.fullname,
      resume: '',
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
        <img src={sidepic} alt="" className="h-auto" width = "790px"
height="200px" />
        </div>
        <div className="layout flex flex-col items-center  pt-16 pb-4 px-20" style={{marginTop : '30px'}}>
            <div className="opt">
                <div className="langue flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1f1f1f"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>
               
                </div>
                <div className="mode flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#1f1f1f"><rect fill="none" height="24" width="24"/><path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/></svg>
               
                </div>
          
            </div>
            <div className="w-100 items-center justify-center mt-10">
                <h1 className="text-3xl font-bold text-center">Bienvenue sur Key predict !</h1>
                
                <p className="label-simple">Veuillez saisir vos informations dans les champs ci-dessous pour accéder à votre compte Key Predict.</p>

            </div>
            <div className="input-forms ">
            <TextField
                required
                id="outlined-required"
                label="Noms"
                defaultValue="Rabe Miarisoa"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="inpute w-full py-4 px-2 mb-4"
                sx={{marginTop : '40px', marginBottom : '20px'}}
                />
                    <TextField
                required
                id="outlined-required"
                label="Email"
                defaultValue=""
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="inpute w-full py-4 px-2 mb-4"
                />
                        <FormGroup  className="inpute w-full mt-4">
                        <FormControl sx={{ m: 0 }} variant="outlined"  className="w-full pb-4">
                                    <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
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

                        
                        <FormControl sx={{ marginTop : '20px', order : '1' }} variant="outlined"  className="w-full pb-4">
                                    <InputLabel htmlFor="outlined-adornment-password">Confirmer Mot de passe</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
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
                      
                       

                            </FormGroup>
           

            </div>
            <div>
                
            </div>
            <div style={{marginTop : '50%', order :'5', width : '100%'}}>
            <button className="btn-valider " onClick={handleSubmit} style={{order: '5', marginTop : 20}}>
                    Se connecter
                </button>
            </div>
               
                <div className="inscription">
                <p className="">Vous avez déjà un compte Key predict ?</p>
                    <NavLink to={"/auth/signin"} className="label">
                        <p className="link" style={{color: 'purple', fontWeight : '600'}}>Connectez-vous</p> 
                    </NavLink>
                </div>
               
               
               
                   
               

        </div>
       
    </div>
)
}
