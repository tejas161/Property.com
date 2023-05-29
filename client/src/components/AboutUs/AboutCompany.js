import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import Testimonial from "./Testimonial";
import profile1 from '../../assets/profile1.jpg';
import profile2 from '../../assets/profile2.jpg';

import profile3 from '../../assets/profile3.jpg';


const AboutCompany = () => {


  



  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      gap: "2rem",
    },
  }));

  const CustomTitleBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      gap: "2rem",
    },
  }));

  const CustomButton = styled(Button)(({ theme }) => ({
    border: "3px solid white",
    borderRadius: "25px",
    color: "white",
    width: "15%",
    display: "block",
    
      border: "3px solid #00C7FF",
    
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "75%",
    },
  }));

  return (
    <Box sx={{ maxWidth: "1300px", mt:2, padding: 3, mx: "auto" }} id="about">
      <CustomTitleBox
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography
          variant="h4"
          style={{ color: "black", textAlign: "center" }}
        >
          What people say about Our Services!
        </Typography>
        <div
          style={{
            height: "5px",
            backgroundColor: "#00C7FF",
            width: "50%",
            border: 0,
            borderRadius: "25px",
          }}
        ></div>
      </CustomTitleBox>

      <CustomBox sx={{ my: 7 }}>
        <Testimonial name={'Rakesh Kumar'} description={'I recently used this property website to book a vacation rental and I was blown away by the experience. The website was easy to navigate, the photos of the properties were accurate, and the booking process was smooth and hassle-free.'} profileimg={profile1} />

        <Testimonial name={'Shalini Sha'} description={'I have used many property websites in the past, but this one stands out as one of the best. What really impressed me, however, was the exceptional customer service I received when I had a question about my booking.'}
        profileimg={profile2} />

        <Testimonial name={'Jai Rathore'} description={'I found my dream vacation home on this property website and had an amazing experience from start to finish. I would definitely use this website again and recommend it to anyone looking for a reliable and trustworthy property website.'}
        profileimg={profile3} />
      </CustomBox>

      <div
        style={{
          height: "5px",
          backgroundColor: "#00C7FF",
          width: "100%",
          mx: "auto",
          border: 0,
          borderRadius: "25px",
        }}
      ></div>

      <Typography
        variant="h4"
        sx={{ color: "black", mt: 12, textAlign: "center" }}
      >
        Interested in Working With Us?
      </Typography>
      <CustomButton
        variant="outlined"
        sx={{
          mx: "auto",
          mt: 3,
          mb: 8,
          color:'black'
        }}
      >
        Get in Touch
      </CustomButton>
    </Box>
  );
};

export default AboutCompany;