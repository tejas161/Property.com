import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import Avatar from '@mui/material/Avatar';
import ExploreIcon from '@mui/icons-material/Explore';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import Otp from '../pages/Otp';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';

const Drawercomp = ({ name, userLoggedIn,profileIcon }) => {

    const [opendrawer, setOpenDrawer] = useState(false)

    const [login, setLogin] = useState(false);




    const handleLoginOpen = () => {
        setLogin(true);
    };

    const handleLoginClose = () => {
        setLogin(false);
    };

    const [signup, setSignup] = useState(false);

    const handleSignOpen = () => {
        setSignup(true);
    };

    const handleSignClose = () => {
        setSignup(false);
    };


    // For Otp box
    const [showotp, setShowotp] = useState(false);

    const handleOtpOpen = () => {
        setShowotp(true);
    }

    const handleOtpClose = () => {
        setShowotp(false);
    }

    return (
        <>
            <Drawer open={opendrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>

                    {
                        userLoggedIn ?
                            (
                                <>
                                    <ListItemButton sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'

                                    }} onClick={() => { setOpenDrawer(false) }}   >
                                        <Avatar
                                        src={profileIcon ? profileIcon : ""}


                                            sx={{ bgcolor: 'orange', cursor: 'pointer', }}>
                                            {name ? name[0].toUpperCase() : 'U'


                                            }


                                        </Avatar>


                                    </ListItemButton>

                                    <ListItemButton onClick={() => {
                                        setOpenDrawer(false);



                                    }}
                                        component={Link} to="myprofile" >
                                        <ListItemIcon><AccountBoxIcon /> </ListItemIcon>
                                        <ListItemText>My Profile</ListItemText>

                                    </ListItemButton>

                                    <ListItemButton onClick={() => setOpenDrawer(false)} component={Link} to="/saved">
                                        <ListItemIcon><FavoriteBorderIcon /></ListItemIcon>
                                        <ListItemText>Saved</ListItemText>

                                    </ListItemButton>

                                    <ListItemButton onClick={() => setOpenDrawer(false)} component={Link} to="/requestpage">
                                        <ListItemIcon><ShowChartIcon /></ListItemIcon>
                                        <ListItemText>Dashboard</ListItemText>

                                    </ListItemButton>
                                </>

                            ) : (
                                <>


                                    <ListItemButton onClick={() => { setOpenDrawer(false); setLogin(true) }} component={Link}  >
                                        <ListItemIcon><LoginIcon /> </ListItemIcon>
                                        <ListItemText>Login</ListItemText>

                                    </ListItemButton>

                                    <ListItemButton onClick={() => { setOpenDrawer(false); setSignup(true) }} component={Link} >
                                        <ListItemIcon><AccountBoxIcon />   </ListItemIcon>
                                        <ListItemText>SignUp</ListItemText>

                                    </ListItemButton>
                                </>


                            )
                    }



                    <ListItemButton onClick={() => setOpenDrawer(false)} component={Link} to="/aboutus">
                        <ListItemIcon><InfoIcon /></ListItemIcon>
                        <ListItemText>About Us</ListItemText>

                    </ListItemButton>


                    <ListItemButton onClick={() => setOpenDrawer(false)} component={Link} to="/allproperties">
                        <ListItemIcon><ExploreIcon /></ListItemIcon>
                        <ListItemText>Explore</ListItemText>

                    </ListItemButton>


                    <ListItemButton onClick={() => setOpenDrawer(false)} component={Link} to="/listproperty">
                        <ListItemIcon><EditIcon /></ListItemIcon>
                        <ListItemText>List Property</ListItemText>

                    </ListItemButton>

                    {
                        userLoggedIn ? (

                            <ListItemButton onClick={() => {
                                setOpenDrawer(false);






                            }} component={Link} to="/logout" >
                                <ListItemIcon><LogoutIcon /> </ListItemIcon>
                                <ListItemText>Logout</ListItemText>

                            </ListItemButton>


                        ) : ""}



                </List>




            </Drawer>

            <IconButton sx={{
                color: "black",
                marginLeft: 'auto',


            }} onClick={() => setOpenDrawer(!opendrawer)}>
                {opendrawer ? <CloseIcon /> : <MenuIcon />}
            </IconButton>


            {
                login ? <LoginPage login={login} handleLoginOpen={handleLoginOpen}
                    handleLoginClose={handleLoginClose} handleSignOpen={handleSignOpen} /> : " "
            }

            {
                signup ? <SignUpPage signup={signup} handleLoginOpen={handleLoginOpen} handleSignOpen={handleSignOpen}
                    handleSignClose={handleSignClose} handleOtpOpen={handleOtpOpen} /> : ""
            }
            {
                showotp ? <Otp showotp={showotp} handleOtpOpen={handleOtpOpen} handleOtpClose={handleOtpClose} /> : ""

            }

        </>
    )
}

export default Drawercomp;
