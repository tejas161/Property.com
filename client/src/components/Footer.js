import React, { useState } from 'react'

import {
    Box, Stack, Button, Typography, FormControl,
    FormHelperText,
    TextField,
} from '@mui/material';

import Grid from '@mui/material/Grid';

import VillaIcon from '@mui/icons-material/Villa';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';




const Footer = () => {

    const [useremail, setUseremail] = useState('');
    const handleClick = () => {
        // console.log(useremail);
        setUseremail('');
    }

    return (
        <Box sx={{
            bgcolor: 'black',
            color: 'white',
            marginTop: '6rem',
            width: '100%',
           
           
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={6} sx={{ bgcolor: '' }}>
                    <Box padding={2}>

                        <Stack padding={1} direction="row" sx={{
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <Box sx={{
                                textDecoration: 'none', color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>    <VillaIcon sx={{ cursor: 'pointer', fontSize: '2.5rem' }} />
                                <Typography sx={{
                                    textDecoration: 'none', color: 'white', cursor: 'pointer',
                                    fontSize: {
                                        sm: '0.7rem',
                                        md: '1.3rem'
                                    },
                                }} fontWeight="bold"

                                >PROPERTY.com</Typography>
                            </Box></Stack>
                        <Stack direction="row" padding={1}>                       
                             <FormControl sx={{
                                backgroundColor: 'white',
                                width:'60%'
                               
                                
                            }}>

                                <TextField
                                    fullWidth
                                    required
                                    
                                    color="info"
                                     placeholder="Email for Daily Updates"
                                    value={useremail}
                                    onChange={(event) => setUseremail(event.target.value)}
                                    InputProps={{
                                        style: {
                                          height: '40px',
                                        // set your desired height here
                                        }
                                      }}
                                              />
                            </FormControl>
                            <Button color="primary" variant="contained" sx={{
                         textTransform:'none',
                           width:'10%',   
                                                                 

                     }} onClick={handleClick}>Send</Button>
                        </Stack>

                        <Typography marginTop={4} padding={1} variant="p">Follow Us</Typography>
                        <Stack direction="row" spacing={2} padding={1}>
                            <Box ><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"> <InstagramIcon sx={{ color: 'white', cursor: 'pointer' }} /></a></Box>
                            <Box> <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">  <TwitterIcon sx={{ color: 'white', cursor: 'pointer' }} /></a></Box>
                            <Box> <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">   <LinkedInIcon sx={{ color: 'white', cursor: 'pointer' }} /></a></Box>
                            <Box> <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">     <YouTubeIcon sx={{ color: 'white', cursor: 'pointer' }} /></a></Box>
                            <Box> <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">     <FacebookIcon sx={{ color: 'white', cursor: 'pointer' }} /></a></Box>


                        </Stack>
                        <Typography padding={1} variant="p">©2023-24 Property Solutions Pvt. Ltd</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={2} sx={{ bgcolor: '' }}>
                    <Box padding={2}>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'white',
                            fontWeight: 'bold'
                        }}>COMPANY</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>About Us</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>Partners</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>Terms</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>Privacy Policy</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>Contact Us</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={2} sx={{ bgcolor: '' }}>
                    <Box padding={2}>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'white',
                            fontWeight: 'bold'
                        }}>PARTNER SITES</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>Makaan</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>IREF</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>Proptiger</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>99.co</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={2} sx={{ bgcolor: '' }}>
                    <Box padding={2}>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'white',
                            fontWeight: 'bold'
                        }}>EXPLORE</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>News</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>Home Loans</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>Site Map</Typography>
                        <Typography paddingY={1} variant="body2" sx={{
                            color: 'grey', '&:hover': {
                                color: 'white'
                            },
                            cursor: 'pointer'
                        }}>Global</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer
