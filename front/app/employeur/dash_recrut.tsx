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
import LogoIcon from '../images/logo-icon.png';
import { useLocation } from 'react-router-dom';



const drawerWidth = 240;

/* Liste des navigations side menu */
const menuItems = [
  { text: 'Tableau de bord', path: '/recruteur/dashboard', icon: <HomeRoundedIcon /> },
  { text: 'Talent Matcher', path: '/recruteur/talent_matcher', icon: <PersonRoundedIcon /> },
  { text: 'Évaluation', path: '/recruteur/evaluation', icon: <RuleRoundedIcon /> },
];

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
              Key Predict
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Tooltip title="Mes sociétés">
              <IconButton color="inherit">
                <Typography variant="body2">Mes sociétés</Typography>
              </IconButton>
            </Tooltip>

            <Avatar src="/app/images/avatar1.png" sx={{ cursor: 'pointer' }} onClick={handleAvatarClick} />

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem >
               <Link to={'/recruteur/profil'} style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                <PersonRoundedIcon style={{ marginRight: '8px' }} />
               Profil
              </Link> </MenuItem>
                <MenuItem onClick={handleLogout}>
          <Typography variant="body2" style={{ color: '#333' }}>
            Déconnexion
          </Typography>
        </MenuItem>
            </Menu>
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
                color: isActive ? '#5a3ee6' : '#333',
                backgroundColor: isActive ? '#c8bdff' : 'transparent',
              })}
            >
               {({ isActive }) => (
        <ListItemButton selected={location.pathname === path}>
          <ListItemIcon sx={{ color: isActive ? '#5a3ee6' : '#333' }}>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{ color: isActive ? '#5a3ee6' : '#333' }}
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
