import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Button, Typography } from '@mui/material';

import HousingCardimg from '../../assets/HousingCardimg.svg';

import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Aos from "aos";

import "aos/dist/aos.css";

const HousingCard = () => {

   const navigate = useNavigate();

   useEffect(() => {
    Aos.init({
        once: true
      });

      return () => {
     
    };
   },[]);


    return (
      
        <Box data-aos="zoom-in" sx={{
            background:'linear-gradient(to right,#6d1b7b,#9c27b0)',
            transition:'0.6s',
            marginTop: '5.5rem',
            marginX: 'auto',
            width: '90%',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'space-evenly',

            flexWrap: 'wrap',
            borderRadius: '25px',
            borderColor: '1px solid #482880'


        }}>
            <Box sx={{
                margin: '1.2rem'
            }}>
                <img style={{
                    height: '14rem',
                    width: '20rem',
                }} src={HousingCardimg} alt="A Housing CardImage" />
            </Box>

            <Box sx={{
               
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',


            }}>
                <Stack direction="column" sx={{
                    padding: '1rem'
                }}>
                    <Typography color="white" fontWeight="bold" variant="h5">Sell/Rent you property
                        Faster
                        with Property.com</Typography>
                    <Typography color="white" variant="body2">Looking for tenants/buyers for your property ?</Typography>
                </Stack>


                <Box sx={{
                    display: 'flex',
                    justifyContent:'space-evenly',
                    alignItems:'center',
                    flexWrap:'wrap',
                    color:'white',
                    width:'100%',
                    padding:'1.4rem'
                }}>

                    <Box margin="1rem">


                        <SavedSearchIcon sx={{fontSize:"1.3rem"}} /> <Typography variant="p" fontWeight="bold" fontSize="1.3rem">45 Lac+</Typography>

                        <Typography variant="body2">Monthly Searches</Typography>
                    </Box>
                    <Box margin="1rem">


                        <CheckCircleIcon sx={{fontSize:"1.3rem"}} /> <Typography variant="p" fontWeight="bold" fontSize="1.3rem">24 Lac+</Typography>

                        <Typography variant="body2">Home Buyers</Typography>
                    </Box>
                    <Box margin="1rem">
                        <FactCheckIcon sx={{fontSize:"1.3rem"}} /> <Typography variant="p" fontWeight="bold" fontSize="1.3rem">10 Lac+</Typography>


                        <Typography variant="body2">Property Listings</Typography>
                    </Box>
                </Box>

                <Button variant="contained" sx={{
                    textTransform: "none",
                    backgroundColor: '#4caf50',
                    '&:hover': {
                        backgroundColor: '#4caf50',
                    },
                    marginX: 'auto',
                    marginY: '6px',
                    width:'11rem',
                    height:'3rem'

                }}
                onClick={() => navigate('/listproperty')}
                
                
                >Post your property</Button>

            </Box>
        </Box >
      
    )
}

export default HousingCard;
