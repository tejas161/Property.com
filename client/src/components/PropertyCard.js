import React from 'react'
import { Place } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import {
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    Stack,

} from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CustomButton from './CustomButton';
import LaunchIcon from '@mui/icons-material/Launch';

const PropertyCard = ({ width, height,
     id, name, description, type, price, country, state, city, location, imageFile
}) => {
    const navigate = useNavigate();

    function formatPrice(price) {
        if (price >= 10000000) {
            return (price / 10000000).toFixed(2) + ' Cr';
        } else if (price >= 100000) {
            return (price / 100000).toFixed(2) + ' Lac';
        } else if (price >= 1000) {
            return (price / 1000).toFixed(2) + ' K';
        } else {
            return price.toString();
        }
    }

    return (
        <Card
        component={Link}
        to={`/propertydetails/${id}`}           
            sx={{
                width: width,
                height: height,
                minWidth: {
                    xs: '100%',
                    sm: '100%',
                    md: '30%'
                },

                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                },
                cursor: "pointer",
                border: '1px solid #dbd8d0',
                borderRadius: '18px',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease-in-out',
                textDecoration: "none"
            }}
            elevation={0}
          
        >
            <CardMedia
                component="img"

                width="100%"
                height={210}
                image={imageFile}
                alt="card image"

            />
            <CardContent
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    paddingX: '10px',
                    paddingY: '12px',

                }}>
                    <Stack direction="column" gap={1}>
                        <Typography fontSize={16} fontWeight={500} textTransform="capitalize" color="#11142d" >
                            {name}
                        </Typography>
                        <Stack direction="row" gap={0.5}  alignItems="flex-start" textAlign="center">
                            <Place fontSize="small"
                                sx={{

                                    color: "#11142d",

                                }}
                            />
                            <Typography fontSize={14} color="#11142d">
                                {city},{" "}{country}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Box
                        px={1.5}
                        py={0.5}
                        borderRadius={1}
                        bgcolor="#dadefa"
                        height="fit-content"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"

                    >
                        <CurrencyRupeeIcon fontSize="small" sx={{ color: '#11142d' }} />
                        <Typography sx={{
                            textTransform: 'none',
                            textDecoration: 'none',
                            color: '#11142d',
                            fontWeight: 'bold',
                            textAlign:'center'
                        }}>



                            {
                                formatPrice(price)
                            }

                        </Typography>

                    </Box>
                </Box>
                <Box mt={2} sx={{
                    width:'100%'
                }}>
                    <CustomButton
                        title="View Full Property"
                        width="100%"                        
                        color="white"
                        backgroundColor="#4caf50"
                        icon={<LaunchIcon />}
                        style={{
                            borderRadius: '10px'
                        }}
                        handleClick={() => navigate(`/propertydetails/${id}`)}
                       

                    />
                </Box>

            </CardContent>





        </Card>



    )
}

export default PropertyCard
