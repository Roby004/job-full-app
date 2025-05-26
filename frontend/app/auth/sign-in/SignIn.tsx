import sidepic from "../../images/Login.png";
import '../signstyle.css';
import * as React from 'react';
import {
  TextField, FormControl, FormGroup, IconButton,
  InputAdornment, InputLabel, OutlinedInput, FormControlLabel
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.message || "Échec de la connexion");
        return;
      }

      const token = result.access_token;
      localStorage.setItem("token", token);

      // Fetch user info
      const userRes = await fetch("http://localhost:5000/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = await userRes.json();
// Rediriger based on user role
      if (userRes.ok && userData?.data?.role) {
        const role = userData.data.role;
        if (role === "recruteur") {
          navigate("/recruteur/dashboard");
        } else if (role === "candidat") {
          navigate("/employe/accueil");
        } else {
          alert("Rôle inconnu!");
        }
      } else {
        alert("Impossible de récupérer les informations utilisateur.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur technique lors de la connexion.");
    }
  };

  return (
    <div className="flex flex-row">
      <div className="login px-4 py-2">
        <img src={sidepic} alt="login" className="h-auto" width="790px" height="200px" />
      </div>

      <div className="layout flex flex-col items-center justify-center pt-16 pb-4 px-20">
        <div className="w-100 items-center justify-center">
          <h1 className="text-3xl font-bold text-center">Content de vous revoir !</h1>
          <p className="label-simple">Veuillez saisir vos informations pour accéder à votre compte Key Predict.</p>
        </div>

        <div className="input-forms">
          <TextField
            required
            label="Email"
            className="inpute w-full py-4 px-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 4 }}
          />

          <FormGroup className="inpute w-full mt-4">
            <FormControl sx={{ m: 0 }} variant="outlined" className="w-full pb-4">
              <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="souvenir">
              <FormControlLabel
                control={<input type="checkbox" />}
                label="Se souvenir de moi"
                labelPlacement="end"
                className="label pl-2"
                sx={{ gap: "8px", marginLeft: "4px", alignItems: "center" }}
              />
              <NavLink to={"/auth/forgotmdp"} className="label">
                <p className="link" style={{ color: "purple", fontWeight: "600" }}>
                  Mot de passe oublié ?
                </p>
              </NavLink>
            </div>
          </FormGroup>
        </div>
        <div className="foot" style={{ marginTop: '10%' ,order:'5', marginBottom: 10 }}>
                   <button className="btn-valider"  onClick={handleSubmit}>
          Se connecter
        </button>

        <div className="inscription">
          <p>Besoin d'un compte Key predict ?</p>
          <NavLink to={"/auth/signup"} className="label">
            <p className="link" style={{ color: "purple", fontWeight: 600 }}>Inscrivez-vous</p>
          </NavLink>
        </div>
        </div>

     
      </div>
    </div>
  );
}
