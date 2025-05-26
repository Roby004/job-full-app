import sidepic from "../../images/Login.png"
import '../signstyle.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { colors, FormControl, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink } from "react-router";


export default function SignIn() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };
    
return (

    <div className="flex flex-row">
        
        <div className="login px-4 py-2">
        <img src={sidepic} alt="" className="h-auto" width = "790px"
height="200px" />
        </div>
        <div className="layout flex flex-col items-center mt-20 pt-16 pb-4 px-20">
            <div className="opt">
                <div className="langue flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1f1f1f"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>
               
                </div>
                <div className="mode flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#1f1f1f"><rect fill="none" height="24" width="24"/><path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/></svg>
               
                </div>
          
            </div>
            <div className="w-100 items-center justify-center">
                <h1 className="text-3xl font-bold text-center">Mot de passe oublié ?</h1>
                
                <p className="label-simple mt-10">Ne vous inquiétez pas, nous pouvons vous aider ! si vous vous souvenez encore de votre adresse e-mail, vous pouvez rapidement réinitialiser votre mot de passe. Saisissez simplement ces informations dans les champs ci-dessous et cliquez sur le bouton. Cela vous enverra un nouvel e-mail qui vous reliera au site Web de changement de mot de passe.</p>

            </div>
            <div className="input-forms">
                    <TextField
                required
                id="outlined-required"
                label="Email"
                defaultValue="Hello World"
                className="inpute w-full py-4 px-2"
                sx={{marginTop : '-50px'}}
                />
                      

            </div>
            <div>
                
            </div>
                <button className="btn-valider" style={{marginTop : '-50px'}}>
                   Réinitialiser le mot de passe
                </button>
                <div className="inscription">
                <p className="">Avez-vous besoin d'aide ? <NavLink to={"/auth/signup"} className="label">
                        <p className="link" style={{color: 'purple', fontWeight : '600'}}>Contactez le service client</p> 
                    </NavLink></p>
                    
                </div>
               
               
               
                   
               

        </div>
       
    </div>
)
}
