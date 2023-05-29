import React, { useState,useEffect } from 'react'
import { Box, Button, styled, Typography } from "@mui/material";


import buyIcon from "../../assets/buy_icon.png";
import sellIcon from "../../assets/sell_icon.png";
import rentIcon from "../../assets/rent_icon.png";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CustomButton from "../CustomButton";

import {Buying,Renting,Selling} from '../../data/GuideDetails';

import Aos from "aos";

import "aos/dist/aos.css";

const Guide = () => {

  const [guide, setGuide] = useState(false);
  const [guidetitle,setGuideTitle]=useState('Buying')
  const [guideData,setGuideData] = useState(Buying);
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "80%",

    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));


  useEffect(() => {
   
    Aos.init({
      once: true
    });

    return () => {
     
    };
  
  
  }, []);

  
  const clickedBuying = () => {
    setGuideTitle('Buying');
    setGuideData(Buying);
    setGuide(true);
  }

  const clickedSelling = () => {
    setGuideTitle('Selling');
    setGuideData(Selling);
    setGuide(true);
  }

  const clickedRenting = () => {
  
    setGuideTitle('Renting');
    setGuideData(Renting);
    setGuide(true);
  }

  const handleClose = () => {
    setGuide(false);

  }

  const handleOpen = () => {
   
    setGuide(true);
    clickedBuying();
  }

  return (
    <Box
      marginTop={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <Dialog open={guide} onClose={handleClose} sx={{}}>
        <DialogTitle><Typography variant="p">{guidetitle} Guide for a House</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>



        </DialogTitle>
        <DialogContent>
          {
            guideData ? guideData.map((guideContent,key) => (
              <Box marginTop={2} key={key}>
            <Typography variant="p" fontWeight="bold">Step {guideContent.id}: {guideContent.header}</Typography>
            <Typography variant="body1">{guideContent.content}</Typography>
          </Box>

            )) : ""

           
          }
          

        




        </DialogContent>
        <DialogActions sx={{ margin: 'auto' }}>
          <Button color="primary" variant="contained" onClick={handleClose}>Okay</Button>

        </DialogActions>

      </Dialog>


      <Typography
        variant="h3"
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
      >
        How it works?
      </Typography>

      <CustomBox>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#5A6473",
            textAlign: "center",
          }}
        >
          Everything you need to know when you want to buy, rent or sell - All
          in one place
        </Typography>
      </CustomBox>

      <GuidesBox data-aos="zoom-in">
        <GuideBox   >
          <img src={buyIcon} alt="buyIcon" />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Buying Guides
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={clickedBuying}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
            >
              How to buy
            </Typography>
            <ArrowRightAltIcon style={{ color: "#0689FF" }} />
          </Box>
        </GuideBox>

        <GuideBox   >
          <img src={rentIcon} alt="buyIcon" />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Renting Guides
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={clickedRenting}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
            >
              How to rent
            </Typography>
            <ArrowRightAltIcon style={{ color: "#0689FF" }} />
          </Box>
        </GuideBox>

        <GuideBox  >
          <img src={sellIcon} alt="buyIcon" />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Selling Guides
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={clickedSelling}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
            >
              How to sell
            </Typography>
            <ArrowRightAltIcon style={{ color: "#0689FF" }} />
          </Box>
        </GuideBox>
      </GuidesBox>

      <CustomButton
      
        backgroundColor="#0F1B4C"
        color="#fff"
        title="See Full Guides"
        handleClick={handleOpen}
      // guideBtn={true}
      />
    </Box>
  );
};

export default Guide;

