import React, { useState, useEffect } from 'react'


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Box, Button, styled, Typography, Container } from '@mui/material';
import LandingPageImg from '../assets/LandingPageImg.jpg';

import HousingEdge from '../components/LandingPage/HousingEdge';
import HousingCard from '../components/LandingPage/HousingCard';
import Guide from '../components/LandingPage/Guide';
import Details from '../components/LandingPage/Details'
import FeaturedProperty from '../components/LandingPage/FeaturedProperty';
import LoanCalc from '../components/LandingPage/LoanCalc';

import OutboundIcon from '@mui/icons-material/Outbound';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import Aos from "aos";

import "aos/dist/aos.css";



const LandingPage = () => {


  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();







  useEffect(() => {
    window.scrollTo(0, 0);
    setChecked(true);
    Aos.init(
      {
        once: true
      }
    );

    return () => {
     
    };


  }, []);

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));




  return (


    <Box>





     
      <Box sx={{ paddingTop: '1.6rem', paddingBottom: '1.2rem', minHeight: "85vh" }}>
        <Container>
          <CustomBox>
            <Box sx={{ flex: "1.25" }} >
              <img
                src={LandingPageImg}
                alt="landingpageimg"
                loading="lazy"

                style={{ maxWidth: "100%", height: '100%' }}
              />
            </Box>
            <Box sx={{ flex: "1" }} >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "18px",
                  color: "#687690",
                  fontWeight: "500",
                  mt: 4,
                  mb: 4,
                }}
              >
                Welcome to Property.com
              </Typography>
              <Title variant="h1">
                Discover a place where you'll love to live.
              </Title>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                Step Into Your New Life !!
                Browse Our Exceptional Properties and Make Your Move.
                Latest Properties on One Click !!
              </Typography>
              <CustomButton
                backgroundColor="#0F1B4C"
                color="#fff"
                title="Explore Properties"
                handleClick={() => navigate('/allproperties')}
                icon={<OutboundIcon />}
                width="100%"
                heigth="1.4rem"

              />
            </Box>
          </CustomBox>
        </Container>

      </Box>




      <HousingEdge />
      <HousingCard />
      <Guide />
      <LoanCalc />
      <Details />
      <FeaturedProperty />
      






    </Box>





  )
}

export default LandingPage
