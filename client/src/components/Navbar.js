import React, { useState, useEffect } from 'react'

import { Box, AppBar, Typography, Toolbar, Tabs, Tab, Button, useMediaQuery, useTheme } from '@mui/material';
import VillaIcon from '@mui/icons-material/Villa';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

import Otp from '../pages/Otp';

import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';

import Drawercomp from './Drawercomp';
import { useGlobalContext } from '../context';

import UserIcon from './UserIcon';
import ExploreIcon from '@mui/icons-material/Explore';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const Navbar = () => {

    const [value, setValue] = useState(0);
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    const [userData, setUserData] = useState({});

    // const [email,setEmail]=useState('');

    const [startCall,setStartCall] = useState(true);

    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const { url } = useGlobalContext();

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));


    const [emails, setEmail] = useState('');

  const handleEmail = (value) => {
    setEmail(value);
  }

     // For Otp box
     const [showotp, setShowotp] = useState(false);

     const handleOtpOpen = () => {
         setShowotp(true);
     }
 
     const handleOtpClose = () => {
         setShowotp(false);
     }

 


    const callMyProfile = async () => {
       
      

        try {

            const res = await fetch(`${url}/myprofile`, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'




            });

            const data = await res.json();
            setUserData(data);


            if (!res.status === 200) {

                const error = new Error(res.error);
                throw error;
            }
            else {
                setUserLoggedIn(true);

            }




        }
        catch (error) {


            setUserLoggedIn(false);

        }

        setStartCall(false);

       
       
        


    }


    useEffect(() => {

        callMyProfile();

        return () => {
     
        };
        




    }, [login, userLoggedIn]);





    const handleLoginOpen = () => {

        setLogin(true);
    };

    const handleLoginClose = () => {
        setLogin(false);
    };



    const handleSignOpen = () => {

        setSignup(true);
    };

    const handleSignClose = () => {
        setSignup(false);
    };



   

    return (
        <Box sx={{
            height: '8vh',
            maxWidth: '100%'
        }}>
            {
                startCall ? 
                (<Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
               
              >
                <CircularProgress color="inherit" />
              </Backdrop>) : ""
            }
            <AppBar sx={{
                backgroundColor: '#fefefe',

            }}>
                <Toolbar>




                    <Box component={Link} to="/" sx={{
                        textDecoration: 'none', color: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} onClick={() => setValue(0)}>    <VillaIcon sx={{ cursor: 'pointer', fontSize: '2.5rem' }} />
                        <Typography sx={{
                            textDecoration: 'none', color: 'black', cursor: 'pointer',
                            fontSize: {
                                sm: '0.7rem',
                                md: '1.3rem'
                            },
                        }} fontWeight="bold"

                        >

                            PROPERTY.com</Typography>
                    </Box>



                    {
                        isMatch ?
                            (
                                <>
                                    <Drawercomp name={userData.name} userLoggedIn={userLoggedIn} profileIcon={userData.profileIcon}/>
                                </>



                            ) :
                            (
                                <>

                                    <Tabs textColor="inherit" value={value} onChange={(e, value) => setValue(value)} indicatorColor="primary" sx={{
                                        marginLeft: 'auto',
                                        color: 'black'
                                    }}>


                                        <Tab label="About Us" icon={<InfoIcon />} iconPosition="start" component={Link} to="/aboutus" />
                                        <Tab label="Explore" icon={<ExploreIcon />} iconPosition="start"
                                            component={Link} to="/allproperties" />
                                        <Tab label="List Property" icon={<EditIcon />} iconPosition="start" component={Link} to="/listproperty" />




                                    </Tabs>


                                    {
                                        userLoggedIn ? (
                                            <>

                                                <UserIcon  name={userData.name} profileIcon={userData.profileIcon}/>
                                                

                                            </>




                                        ) : (<>


                                            <Button sx={{
                                                marginLeft: '4px', backgroundColor: '#32a88f',
                                                "&:hover": {
                                                    backgroundColor: '#33b576'
                                                }
                                            }} variant="contained"
                                                component={Link} onClick={() => setLogin(true)} >Login</Button>
                                            <Button sx={{ marginLeft: '10px', backgroundColor: '#327da8' }} variant="contained"
                                                component={Link} onClick={() => setSignup(true)}>SignUp</Button>
                                        </>



                                        )

                                    }


                                    {
                                        login ? <LoginPage login={login} handleLoginOpen={handleLoginOpen}
                                            handleLoginClose={handleLoginClose} handleSignOpen={handleSignOpen} /> : " "
                                    }

                                    {
                                        signup ? <SignUpPage signup={signup} handleLoginOpen={handleLoginOpen} handleSignOpen={handleSignOpen}
                                            handleSignClose={handleSignClose} handleOtpOpen={handleOtpOpen} handleEmail={handleEmail}
                                            
                                            /> : ""
                                    }
                                    {
                                        showotp ? <Otp showotp={showotp} handleOtpOpen={handleOtpOpen} handleOtpClose={handleOtpClose} handleLoginOpen={handleLoginOpen}/> : ""

                                    }
                                </>
                            )
                    }



                </Toolbar>




            </AppBar>
        </Box>
    )
}

export default Navbar
