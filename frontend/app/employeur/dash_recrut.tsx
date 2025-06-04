// DashboardLayout.tsx
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link, BrowserRouter } from 'react-router';
import {
  Box, CssBaseline, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Tooltip, Stack
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MenuIcon from '@mui/icons-material/Menu';
import LogoIcon from '../images/logo-icon2.png';
import { useLocation } from 'react-router';



const drawerWidth = 240;

/* Liste des navigations side menu */
const menuItems = [
  { text: 'Tableau de bord', path: '/recruteur/dashboard', icon: <HomeRoundedIcon /> },
  { text: 'Talent Matcher', path: '/recruteur/talent_matcher', icon: <PersonRoundedIcon /> },
   { text: 'Modèle prédictif', path: '/recruteur/modele_predictif', icon: <RuleRoundedIcon /> },
  { text: 'Évaluation', path: '/recruteur/evaluation', icon: <RuleRoundedIcon /> },
];
function ToolbarActionsSearch() {
   const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const handleProfilClick = () => {
   // navigate('/recruteur/profil');
    handleClose();
  };
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await fetch("http://localhost:5000/logout", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      localStorage.removeItem("token"); // Remove token
      navigate("/auth/signin");         // Redirect
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
     // navigate("/auth/signin");
    } finally {
      handleClose();
    }
  };
  return (
    <Stack direction="row">
      <Stack direction="row" className="notif mt-2 items-center justify-center" spacing={2}>
        <div className="retour">
          <Tooltip title="Aide" arrow>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 22 22" width="24px" fill="#1f1f1f">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
            </svg>
          </Tooltip>
        </div>

        <div className="retour">
          <Tooltip title="Mail" arrow>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1f1f1f">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z" />
            </svg>
          </Tooltip>
        </div>

        <div className="retour">
          <Tooltip title="Notifications" arrow>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1f1f1f">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S11.5 3.17 11.5 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
            </svg>
          </Tooltip>
        </div>

      
 <Avatar src="/app/images/avatar1.png" sx={{ cursor: 'pointer' }} onClick={handleAvatarClick} />

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem >
               <Link to={'/recruteur/profil'} style={{ textDecoration: 'none', color: '#333' }}>
               Profil
              </Link> </MenuItem>
                <MenuItem onClick={handleLogout}>
          <Typography variant="body2" style={{ color: '#333' }}>
            Déconnexion
          </Typography>
        </MenuItem>
            </Menu>      </Stack>
    </Stack>
  );
}

export default function DashboardLayout() {
 const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const handleProfilClick = () => {
   // navigate('/recruteur/profil');
    handleClose();
  };
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await fetch("http://localhost:5000/logout", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      localStorage.removeItem("token"); // Remove token
      navigate("/auth/signin");         // Redirect
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
     // navigate("/auth/signin");
    } finally {
      handleClose();
    }
  };
  const location = useLocation();

  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#fff', color: '#333' , boxShadow: 'none',borderBottom: '1px solid #ddd'}}>
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
            <img src={LogoIcon} alt="Logo" width="30px" height="30px" />
            <Typography variant="h6" noWrap>
              e-tady
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <ToolbarActionsSearch />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <nav>
  <Drawer variant="permanent" sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'white',
        },
      }}>
        <Toolbar />
        <List style={{fontFamily: ' Open Sans', fontSize: '14px'}}>
          {menuItems.map(({ text, path, icon }) => (
            <NavLink
              to={path}
              key={path}
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? '#023047' : '#333',
                backgroundColor: isActive ? '#c8bdff' : 'transparent',
              })}
            >
               {({ isActive }) => (
        <ListItemButton selected={location.pathname === path}>
          <ListItemIcon sx={{ color: isActive ? '#023047' : '#333' }}>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{ color: isActive ? '#023047' : '#333' }}
          />
        </ListItemButton>
      )}
   
 
            </NavLink>
          ))}
        </List>
      </Drawer>
      </nav>
    

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#f6f8f9', minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
