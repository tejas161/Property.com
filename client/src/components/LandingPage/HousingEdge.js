import React from 'react'

import { Box, Button, Typography } from '@mui/material';



import { Card,  CardMedia } from '@mui/material';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



import { HouseEdgeCards } from '../../data/CardData';
import { useNavigate } from 'react-router-dom';


  
const HousingEdge = () => {
  const navigate = useNavigate();


    const settings = {
        swipeToSlide: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        lazyLoad: true,
        
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 2,
                infinite: false,
                swipeToSlide: true,
                lazyLoad: true,
              }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 2,
                initialSlide: 2,
                lazyLoad: true,
                swipeToSlide: true,
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                initialSlide: 2,
                lazyLoad: true,
                swipeToSlide: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 2,
                lazyLoad: true,
                swipeToSlide: true,
              }
            },
              {
                breakpoint: 380,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  initialSlide: 2,
                  lazyLoad: true,
                  swipeToSlide: true,
                }
            }
        ],
     
     
     
    };

 
    return (

        <Box sx={{
            marginTop: '30px',
            marginX: 'auto',
            
            width: '90%'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flexStart',
                alignItems: 'center',
                marginY:'15px'
            }}>
                <Typography variant="h5" fontWeight="bold">Housing Edge</Typography>
                <Button
                onClick={(e) => navigate('/allproperties')}              
                
                sx={{border:'1px solid #327da8',fontSize:'0.8rem',marginLeft:'8px',minWidth:{
                   md:'15%'
                },
                color:'#327da8'
                
                }} >Explore All</Button>
            </Box>

            <Box sx={{
                paddingTop:'15px'
            }}>
               
                <Slider  {...settings}>
                    {
                        HouseEdgeCards.map((item,key) => {
                            return(

                                <Box key={key}>
                                <Card sx={{
                                    height:'8rem',
                                    width:'6rem',
                                    marginLeft:'10px',
                                    borderRadius:'15px',
                                    border:'0.5px solid #bdbdbd',
                                    boxShadow: '0px 0px 0px grey',
                                  transition:  'boxshadow .6s ease-out',
                                   boxshadow: '.8px .9px 3px grey',
                                   overflow:'hidden',
                                    "&:hover":{
                                        cursor:'pointer',
                                        boxShadow: '1px 8px 20px grey',
                                        transition:'boxShadow .6s ease-in'

                                    }
                                    

                                                                      
                                    
                                }}>

                                    <CardMedia sx={{
                                        height:'3rem',
                                        marginTop:'8px'
                                        
                                       

                                    }}>{item.cardmedia}</CardMedia>
                                   <Typography variant="body2" sx={{
                                         textAlign:'center',
                                        padding:'4px',
                                       
                                       
                                    }}>
                                    {item.cardcontent}
                                        </Typography>
                                </Card>
                                </Box>


                            );

                        })
                   
}
                   
                </Slider>
            </Box>


        </Box>













    )
}

export default HousingEdge;












