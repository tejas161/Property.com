import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React,{useState,useEffect,useRef} from "react";

// import CountUp from 'react-countup';

const Details = () => {

  const countingSectionRef = useRef(null);
  // const [isInView, setIsInView] = useState(false);
  // const [isCountingFinished, setIsCountingFinished] = useState(false);

  // const handleCountingComplete = () => {
  //   setIsCountingFinished(true); // Update the state after the animation has completed
  // };


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const elementPosition = countingSectionRef.current.getBoundingClientRect().top;
  //     const screenPosition = window.innerHeight / 2;
  //     setIsInView(elementPosition < screenPosition);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
   
 
  

  const LargeText = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000",
    fontWeight: "700",
    [theme.breakpoints.down("md")]: {
      fontSize: "32px",
    },
  }));

  const SmallText = styled(Typography)(({ theme }) => ({
    fontSize: "18px",
    color: "#7B8087",
    fontWeight: "500",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  }));

  const TextFlexbox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(7),
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 5, 0, 5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(5),
    },
  }));

  

  return (
    <Box sx={{ py: 6 }} >
      <Container>


        <TextFlexbox>
          <Box
        ref={countingSectionRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LargeText  style={{color: "#0689FF"}}  
        
         >     <span>5000+</span></LargeText>
            <SmallText>Homes For Sale</SmallText>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LargeText style={{color: "#0689FF"}}>  <span>3000+</span></LargeText>
            <SmallText>Properties Rented</SmallText>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
             
            }}
          >
            <LargeText style={{color: "#0689FF"}}> 
             <span>4000+</span></LargeText>
            <SmallText>Homes Sold</SmallText>
          </Box>
        </TextFlexbox>
      </Container>
    </Box>
  );
};

export default Details;