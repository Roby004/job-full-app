import * as React from 'react';
import "../css/dashboard.css"
import LogoIcon from '../images/logo-icon.png';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
//import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
//import DashboardIcon from '@mui/icons-material/Dashboard';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//import SearchIcon from '@mui/icons-material/Search';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import {
  DashboardLayout,
  ThemeSwitcher,
  type SidebarFooterProps,
} from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

const NAVIGATION: Navigation = [
 
  {
    segment: 'dashboard',
    title: 'Tableau de bord',
    icon: <HomeRoundedIcon />,
  },
  {
    segment: 'projets',
    title: 'Projets',
    icon: <WorkRoundedIcon />,
  },
  {
    segment: 'evaluations',
    title: 'Evaluations',
    icon: <RuleRoundedIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor : '#f6f8f9',
        fontFamily : 'Open Sans',
      }}
    >
      <Grid container spacing={2} sx={{ mb: 4 , marginLeft: "20px", marginRight : "20px", backgroundImage : 'url(/app/images/back2.png)'  }} className='grid-container  px-4 mx-10 items-center justify-between'>   
       
       <Grid size={8}>
       <Stack direction="row" spacing={2} sx={{ mb: 4 }} className='items-center justify-between'>
            <Typography variant='h4'> Hello Zaza !</Typography>
          
        </Stack>
        </Grid>
        <Grid size={4}>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }} className='items-center justify-between'>
        <div className="suggestion flex items-center justify-center">
                <img src="/app/images/portfolio.png" alt="" width='80px' />
                <div className="notes">
                    <h1 className='text-2xl font-bold' style={{fontSize : "14px", fontFamily : 'Open Sans'}}>Suggestion 1/4</h1>
                    <p className='label-simple' style={{fontSize : "14px"}}>Pour une meilleure présentation de votre offre, personnalisez en mieux les informations importantes de votre annonce.</p>
                </div>
            </div>
          </Stack>
        </Grid>
       
         

      </Grid>

      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Stack direction='row' className="notif mt-2 items-center justify-center" spacing={2}>
      <div className="retour">
        <Tooltip title="Aide" arrow>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 22 22" width="24px" style={{fontWeight:'lighter'}} fill="#1f1f1f"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
       
         </Tooltip>
         <Chip
          
          size="small"
          color="error"
          variant="filled"
          sx={{ position: 'absolute', top: 0, right: 0 }}
        />
        </div>
        <div className="retour">
            <Tooltip title="Mail" arrow>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1f1f1f"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z"/></svg>

            </Tooltip>
        </div>
       
        <div className="retour">
        <Tooltip title="Notifications" arrow>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1f1f1f"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
        </Tooltip>
        </div>
        
         <button className='btn-second'> Mes sociétés </button>
         <Avatar alt="Remy Sharp" src="/app/images/avatar1.png" />
        
       
      </Stack>
     
    </Stack>
  );
}

function SidebarFooter({ mini }: SidebarFooterProps) {
  return (
    <div>
 <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
    >
      {mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love by MUI`}
    </Typography>
     <ThemeSwitcher />
    </div>
   
  );
}

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
    
     
     <img src={LogoIcon} alt="" width='30px' height={'30px'}/>
     <Typography variant="h6" className='logo-title' style={{fontFamily:"Outfit"}}>Key predict</Typography>
    </Stack>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutSlots(props: DemoProps) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: ToolbarActionsSearch,
          sidebarFooter: SidebarFooter,
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
