import React from 'react'
import {
  Box,
  Typography,
  Stack,
  Button

} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Error = () => {

  const navigate = useNavigate();
    return (
       <Box sx={{
         height:'60vh',
         width:'100%',
         marginTop:'1.5rem',
         display:'flex',
         flexDirection:'column',
         justifyContent:'center',
         alignItems:'center'
       }}>
         <Stack direction="row">
         <Typography>This is an Error Page</Typography>
         </Stack>


         <Stack direction="row" marginTop={4}>
         <Typography>
           Click here to go back to home Page !!
         </Typography>
         </Stack>

         <Stack direction="row" marginTop={2}>
           <Button variant="contained" onClick={() => navigate('/')}> Go Home</Button>
         </Stack>
       
        

       </Box>
    )
}

export default Error;
