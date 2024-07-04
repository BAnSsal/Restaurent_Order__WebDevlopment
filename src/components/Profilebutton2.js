import React from 'react';
import { Button, Avatar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link ,useNavigate} from 'react-router-dom';


function ProfileButton2() {
  return (
    <div style ={{marginRight :'8px'}}>
    <Button
      startIcon={<AccountCircleIcon />}
      variant="outlined"
      color="primary"
      size="small"
      sx={{ textTransform: 'none', fontWeight: 'bold' }} // Custom styles
    >
     {/* Adjust size as needed */}
   <Link to="/login">  <Typography variant="body1" >Logout</Typography> {/* Your user's name */}
   </Link> 
    </Button></div>
  );
}

export default ProfileButton2;
