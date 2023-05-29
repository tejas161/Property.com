import React,{useEffect} from 'react';

import {Box, Stack, Typography } from '@mui/material';

import PieChart  from '../components/AboutUs/PieChart';
import  PropertyReferrals from '../components/AboutUs/PropertyReferrals';
import  AboutCompany from '../components/AboutUs/AboutCompany';
import  TotalRevenue from '../components/AboutUs/TotalRevenue';
import Footer from '../components/Footer';


const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
     
        };
    },[]);
    
    return (
        <Box marginTop={4}>
               <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
            <PieChart
                title="Properties for Sale"
                value={5000}
                series={[75, 25]}
                colors={["#275be8", "#c4e8ef"]}
            />
            <PieChart
                title="Properties for Rent"
                value={4000}
                series={[60, 40]}
                colors={["#275be8", "#c4e8ef"]}
            />          
            <PieChart
                title="Properties for Cities"
                value={3500}
                series={[75, 25]}
                colors={["#275be8", "#c4e8ef"]}
            />
              <PieChart
                title="Total customers"
                value={8000}
                series={[75, 25]}
                colors={["#275be8", "#c4e8ef"]}
            />
        </Box>

        <Stack
            mt="25px"
            maxWidth="100%"
            direction={{ xs: "column", lg: "row" }}
            gap={4}
        >
            <TotalRevenue />
            <PropertyReferrals />
        </Stack>

     
           
            <AboutCompany/>
           
    
       
    </Box>
    );
}

export default AboutUs;
