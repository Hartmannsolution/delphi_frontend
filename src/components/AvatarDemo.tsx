import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import logo from '/images/avatar/thomas_profil.jpg';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { cyan, deepPurple } from '@mui/material/colors';

export default function ImageAvatars() {
  return (
  <>
  
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Remy Sharp"
        src={logo}
        sx={{ width: 24, height: 24 }}
      />
      <Avatar alt="Remy Sharp" 
        src={logo}
      />
      <Avatar
        alt="Remy Sharp"
        src={logo}
        sx={{ width: 56, height: 56 }}
      />
    </Stack>
    <Stack direction="row" spacing={2}>
    <Avatar>
      <FolderIcon />
    </Avatar>
    <Avatar sx={{ bgcolor: cyan[400]}}>
      <PageviewIcon />
    </Avatar>
    <Avatar sx={{ bgcolor: cyan[200]}}>
      <AssignmentIcon />
    </Avatar>
  </Stack>
  </>);
}

