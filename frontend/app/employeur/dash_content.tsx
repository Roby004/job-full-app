import * as React from 'react';
import "../css/dashboard.css";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Components
import DashStat from "../components/dash-stat";
import ListParticipant from "../components/liste-participants";

//import DashboardIcon from '@mui/icons-material/Dashboard';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//import SearchIcon from '@mui/icons-material/Search';
import {
  DashboardLayout,
  ThemeSwitcher,
  type SidebarFooterProps,
} from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
});

function DemoPageContent() {
  return (
    <Box
  sx={{
    py: 0,
    backgroundColor: '#f6f8f9',
    fontFamily: 'Open Sans',
  }}
>
  <Grid
    container
    columns={12}
    sx={{
      marginX: '20px',
      padding: '5px',
     backgroundColor: '#023047',
      backgroundImage : 'url(/app/images/back.png)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderRadius: '8px',
      alignItems: 'center',
    }}
  >
    {/* Hello Zaza section: 9 columns */}
    <Grid sx={{ gridColumn: 'span 9' , width: '70%', padding : '10px' }}>
      <Typography variant="h4" sx={{ color: '#fff' }}>
        Hello Zaza !
      </Typography>
    </Grid>

    {/* Suggestion section: 3 columns */}
    <Grid sx={{ gridColumn: 'span 3' , width: '30%', padding : '10px', color: '#fff' }}>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <img src="/app/images/portfolio.png" alt="portfolio" width="60px" style={{ marginRight: '10px' }} />
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" fontSize={14}>
            Suggestion 1/4
          </Typography>
          <Typography fontSize={14}>
            Pour une meilleure présentation de votre offre, personnalisez en mieux les informations importantes de votre annonce.
          </Typography>
        </Box>
      </Box>
    </Grid>
  </Grid>
</Box>





    
  );
}

const DashboardPage: React.FC = () => {
  return (
    <>
      <DemoPageContent />
                   <DashStat />
                   <ListParticipant />
    </>
  );
};
export default DashboardPage;