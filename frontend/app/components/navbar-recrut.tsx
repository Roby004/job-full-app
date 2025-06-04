// src/components/DashboardHeader.tsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import LogoIcon from '../images/logo-icon2.png';

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <img src={LogoIcon} alt="Logo" width="30px" height="30px" />
      <Typography variant="h6" className="logo-title" style={{ fontFamily: 'Outfit' }}>
        e-tady
      </Typography>
    </Stack>
  );
}

function ToolbarActionsSearch() {
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

      
        <Avatar alt="Remy Sharp" src="/app/images/avatar1.png" />
      </Stack>
    </Stack>
  );
}

export default function NavbarRecrut () {
  return (
    <div className="flex pt-0 border border-gray-200 w-full " style={{ justifyContent: 'space-between', padding: '10px', backgroundColor: 'white' }}>
      <CustomAppTitle />
      <ToolbarActionsSearch />
    </div>
  );
}
