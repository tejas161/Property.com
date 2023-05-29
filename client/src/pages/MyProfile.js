import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '../context';

import { useNavigate } from 'react-router-dom';
import { Email, Phone, Place } from "@mui/icons-material";
import { Box, Button, Stack, Typography,TextField } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyProfile = () => {

    const [userData, setUserData] = useState({});

    const { url } = useGlobalContext();
    const navigate = useNavigate();

    const [callog,setcallog]=useState(false);
    const [newphone,setnewphone]=useState('');

    const [imageFile,setImageFile]=useState('');

    const [startCall, setStartCall] = useState(false);
    const handlecallogOpen = () => {

        setcallog(true);
    };

    const handlecallogClose = () => {
        setcallog(false);
    };

    useEffect(() => {
        callMyProfile();

        return (() => {});
    },[imageFile]);

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




        }
        catch (error) {

            // Create a Dialog box on my profile is user not authenticated
            navigate('/logout');
        }


    }

    const handlePhone = (e) => {
        setnewphone(e.target.value);

    }

    const onSubmitPhone = async() => {
        const useremail = userData.email;

        if(newphone.length < 10 || newphone.length > 10)
        {
            toast.error('Submit Proper Mobile Number ', {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else{

            const res = await fetch(`${url}/updatephone`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newphone,useremail
                }),
               
            });

            if(res.status==200)
            {
                handlecallogClose();
            }
            else{
                toast.error('Some error occurred ', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });

            }



           

        }
        
    }

    const submitProfileImage = async() => {

        setStartCall(true);
        const useremail = userData.email;
        const res = await fetch(`${url}/profileimage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              imageFile,useremail
            })
        });

        const data = await res.json();
       if(res.status == 200)
       {
           setImageFile('');
       }
       else{
        toast.error('Some error occurred ', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });

    }
    setStartCall(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        callMyProfile();

        return () => {
     
        };



    }, []);
    return (
        <div>


            {

                userData ? (

                    <>
                     
        <ToastContainer
                position="top-center"
                autoClose={500}
               hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                zIndex={20}
              

                
            />
              {
                    startCall ?
                        (<Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={true}

                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>) : ""
                }
                        <Box sx={{
                            marginTop: '2rem',
                          

                        }}>
                            <Typography fontSize={25} fontWeight={700} color="#11142D"
                                sx={{
                                    paddingLeft: '1.2rem'
                                }}>
                                Agent Profile
                            </Typography>

                            <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", md: "row" },
                                      
                                        gap: 2.5,
                                    }}
                                >
                                   
                                  <Box sx={{
                                      margin:'auto',
                                      paddingX:'auto'
                                  }}>
                                  <Avatar alt="Profile Picture"
                                  src={userData.profileIcon}
                                    sx={{
                                        width:'16rem',
                                        height:'16rem',
                                    
                                    }} />
                                    {

                                        imageFile ? 
                                        <>
                                          <Button     component="label"
                                    color="primary" onClick={submitProfileImage}
                                    sx={{
                                        width: "100%",
                                        marginTop:'8px',
                                       
                                        textTransform: "capitalize",
                                        fontSize: 16,
                                        textAlign:'center'
                                    }}
                                    
                                    
                                    >
                                    Upload
                                </Button>
                                        </> 
                                        : 
                                        <>
                                           <Button
                                    component="label"
                                    color="primary"
                                   
                                    sx={{
                                        width: "100%",
                                        marginTop:'8px',
                                       
                                        textTransform: "capitalize",
                                        fontSize: 16,
                                        textAlign:'center'
                                    }}
                                >
                                    Select Image
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        name="image"
                                        onChange={(e) => {
                                           
                                           


                                            const reader = new FileReader();
                                            if (e.target.files[0] != null) {
                                                reader.readAsDataURL(e.target.files[0]);
                                                reader.onload = () => {
                                                    setImageFile(reader.result);
                                                   

                                                }
                                              
                                            }
                                            
                                        } }
                                          />
                                        </Button>

                                        </>
                                    }
                                  
                                        
                               

                                

                            
                              


                                  </Box>
                                  

                                    <Box
                                        flex={1}
                                        sx={{
                                            marginTop: { md: "58px" },
                                            marginLeft: { xs: "20px", md: "0px" ,lg:'30px'},
                                        }}
                                    >
                                        <Box
                                            flex={1}

                                            display="flex"
                                            flexDirection={{ xs: "column", md: "row" }}
                                            gap="20px"
                                        >


                                            <Box
                                                flex={1}
                                                display="flex"
                                                flexDirection="column"
                                                justifyContent="space-between"
                                                gap="30px"
                                               
                                            >

                                                <Stack direction="column">
                                                    <Stack direction="row">
                                                        <PersonIcon sx={{
                                                            width: '6rem',
                                                            height: '4rem',

                                                        }} />
                                                        <Stack dirction="column">






                                                            <Typography
                                                                fontSize={22}
                                                                fontWeight={600}
                                                                color="#11142D"
                                                                
                                                            >
                                                                {userData.name}
                                                            </Typography>
                                                            <Typography fontSize={16} color="#808191">
                                                                Realestate Agent
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>

                                                <Stack direction="column" gap="30px">
                                                    <Stack gap="15px">
                                                        <Typography
                                                            fontSize={14}
                                                            fontWeight={500}
                                                            color="#808191"
                                                        >
                                                            Address
                                                        </Typography>
                                                        <Box
                                                            display="flex"
                                                            flexDirection="row"
                                                            alignItems="center"
                                                            gap="10px"
                                                        >
                                                            <Place sx={{ color: "#11142D" }} />
                                                            <Typography
                                                                fontSize={14}
                                                                color="#11142D"
                                                            >
                                                                4517 Washington Ave. Manchaster,
                                                                Kentucky 39495
                                                            </Typography>
                                                        </Box>
                                                    </Stack>




                                                    <Stack
                                                        direction="row"
                                                        flexWrap="wrap"
                                                        gap="20px"
                                                        pb={4}
                                                    >
                                                        <Stack flex={1} gap="15px">
                                                            <Typography
                                                                fontSize={14}
                                                                fontWeight={500}
                                                                color="#808191"
                                                            >
                                                                Phone Number
                                                            </Typography>
                                                            <Box
                                                                display="flex"
                                                                flexDirection="row"
                                                                alignItems="center"
                                                                gap="10px"
                                                            >
                                                                <Phone sx={{ color: "#11142D" }} />
                                                                <Typography
                                                                    fontSize={14}
                                                                    color="#11142D"
                                                                    noWrap
                                                                >
                                                                    {userData.phone}
                                                                </Typography>
                                                                <Button variant="contained"
                                                                sx={{
                                                                    fontSize:'9px'
                                                                }}
                                                                onClick={handlecallogOpen}
                                                                
                                                                >
                                                                    Update Number
                                                                </Button>
                                                            </Box>
                                                        </Stack>

                                                        <Stack flex={1} gap="15px">
                                                            <Typography
                                                                fontSize={14}
                                                                fontWeight={500}
                                                                color="#808191"
                                                            >
                                                                Email
                                                            </Typography>
                                                            <Box
                                                                display="flex"
                                                                flexDirection="row"
                                                                alignItems="center"
                                                                gap="10px"
                                                            >
                                                                <Email sx={{ color: "#11142D" }} />
                                                                <Typography
                                                                    fontSize={14}
                                                                    color="#11142D"
                                                                >
                                                                    {userData.email}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>


      <Dialog open={callog} onClose={handlecallogClose} sx={{}}>
        <DialogTitle>
       <IconButton
          aria-label="close"
          onClick={handlecallogClose}
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
        <TextField
                            inputProps={{
                                inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10,
                            }}
                            autoFocus
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="Updated Phone Number"
                            fullWidth
                            variant="outlined"
                           onChange={handlePhone}

                        />
          
        </DialogContent>
      
        <DialogActions sx={{margin:'auto'}}>
          <Button onClick={onSubmitPhone} color="primary" variant="contained">Update</Button>
         
        </DialogActions>
       
      </Dialog>

                        </Box>



                    </>



                ) : (" ")



            }






        </div>
    )
}

export default MyProfile
