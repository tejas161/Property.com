import React, { useState, useEffect } from 'react'
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import TextWithReadMore from '../components/TextRead';
import {
    Typography,
    Box,
    Stack,
    Button
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {
    ChatBubble,
    Delete,
    Edit,
    Phone,
    Place,
    Star,
} from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Avatar from '@mui/material/Avatar';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CustomButton from '../components/CustomButton';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const PropertyDetails = () => {

    const [propertyData, setPropertyData] = useState();
    const { id } = useParams();
    const { url } = useGlobalContext();

    const [startCall, setStartCall] = useState(false);

    const [gmap, setgmap] = useState('');

    const [userData, setUserData] = useState(false);

    const [ispresent, setIsPresent] = useState('');

    const [checkedfav, setCheckedfav] = useState(false);

    const [amount,setAmount]=useState(0);

    const handleChangeFav = () => {
        if (checkedfav == false) {
            saveProperty();

        }
        else {
            unsaveProperty();
        }
        setCheckedfav(!checkedfav);
    }

    const navigate = useNavigate();



    useEffect(() => {

        checkAccess();

        return () => {
     
        };

    }, [propertyData, userData]);



    useEffect(() => {
        window.scrollTo(0, 0);
        callMyProfile();
        callProperty();

        return (() => { });

    }, []);





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

            const array = data.savedProperty;
            const index = array.indexOf(id);
            if (index != -1) {
                setCheckedfav(true);
            }



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


    const callProperty = async () => {
        setStartCall(true);
        try {

            const res = await fetch(`${url}/propertyinfo?id=${id}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json"
                    },

                }
            );

            const data = await res.json();
            setPropertyData(data);
            setAmount(data.price);



            setgmap(
                `https://maps.google.com/maps?q=${data.country}&q=${data.state}&q=${data.city}&t=&z=10&ie=UTF8&iwloc=&output=embed`);





            setStartCall(false);


            if (res.status == 500) {
                navigate('/allproperties');
            }


        }
        catch (error) {

            toast.error('some error occurred', {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",


            });
            setStartCall(false);
        }
    }

    const handleDelete = async () => {
        setStartCall(true);

        try {
            const res = await fetch(`${url}/deleteid?id=${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    }

                });

            const data = await res.json();
            setStartCall(false);
            navigate('/allproperties');

        }
        catch (error) {
            toast.error('Some error occured!!', {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",


            });
            setStartCall(false);
        }

    }

    const calldeletealert = () => {

        if (!toast.isActive('deleteConfirmation')) {
            toast.error(
                <div >
                    <p>Are you sure you want to delete this Property?</p>
                    <Box display="flex" mt={2} justifyContent="space-evenly" alignItems="center">
                        <CustomButton title="Delete" backgroundColor="#fcfcfc" handleClick={handleDelete}></CustomButton>
                        <CustomButton title="Cancel" backgroundColor="#fcfcfc">Cancel</CustomButton>
                    </Box>
                </div>,
                {
                    toastId: 'deleteConfirmation',
                    position: "top-center",
                    autoClose: false,
                    closeButton: false,
                    draggable: true,
                    hideProgressBar: true,
                    theme: "colored",
                }
            )
        };


    }



    function checkAccess() {
        if (propertyData && userData) {
            const array = propertyData.creator.allowAccess;
            const matchingObj = array.find(obj => (obj.email == userData.email && obj.property_id === id));

            if (matchingObj) {
                setIsPresent(matchingObj.status);

            }
            else {
                setIsPresent('null');
            }

            // console.log(ispresent)

        }


        //  const ispresentcheck = array.some(obj => obj.email == userData.email);
        //  console.log(ispresent);
        //  setIsPresent(ispresentcheck);

    }




    const requestAccess = async () => {
        setStartCall(true);

        const userName = userData.name;
        const userEmail = userData.email;
        const agentId = propertyData.creator._id;
        const property_id = id;

        try {
            const res = await fetch(`${url}/requestinfo`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName, userEmail, agentId,property_id
                })


            });

            const data = await res.json();
            setStartCall(false);
            callProperty();
            navigate(window.location);






        }
        catch (error) {
            console.log(error);
            setStartCall(false);
        }
    }

    const saveProperty = async () => {
        const email = userData.email;
        const propertyId = propertyData._id;

        try {
            const res = await fetch(`${url}/saveproperty`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, propertyId
                })


            });
            const data = await res.json();
            // console.log(data);

        }
        catch (error) {
            toast.error('Some error occured!!', {
                position: "top-right",
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

    const unsaveProperty = async () => {
        const email = userData.email;
        const propertyId = propertyData._id;

        try {
            const res = await fetch(`${url}/unsaveproperty`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, propertyId
                })


            });

            const data = await res.json();
            // console.log(data);

        }
        catch (error) {
            toast.error('Some error occured!!', {
                position: "top-right",
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


    const handleBook = async() => {

        const res1 = await fetch(`${url}/getRazorKey`,{
            method:"GET"
        });

        const data1=await res1.json();

        const res = await fetch(`${url}/checkout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount
            })


        });
        const data = await res.json();
        if(res.status == 200)
        {
        const {order}=data;
        


        const options = {
            key: data1.key, 
            amount: order.amount, 
            currency: "INR",
            name: "Property.com",
            description: "Payment to Property Owner",
            image: "https://images.pexels.com/photos/1162361/pexels-photo-1162361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            order_id: order.id, 
            // callback_url:`${url}/verifypayment?id=${id}&email=${userData.email}&agentid=${propertyData.creator._id}`,
            callback_url:`/api/verifypayment?id=${id}&email=${userData.email}&agentid=${propertyData.creator._id}`,
            redirect: true,
            prefill: {
                "name": userData.name,
                "email": userData.email,
                "contact": userData.phone
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }
    else{
        toast.error('Some error occured!!', {
            position: "top-right",
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

    return (
        <Box borderRadius="15px"
            padding="20px"
            width="fit-content"
            sx={{
                width: '100%',
                height: '100%'
            }}
        >
            {
                startCall ?
                    (<Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}

                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>) : ""
            }

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
            />

            {propertyData ?
                <Box sx={{

                    width: '100%'
                }}>
                    <Box
                        mt="20px"
                        display="flex"
                        flexDirection={{ xs: "column", lg: "row" }}
                        gap={4}
                        sx={{

                            minWidth: {
                                xs: '100%',
                                lg: '60%'
                            },

                        }}



                    >
                        <Box flex={1} sx={{

                            width: {
                                xs: '100%',
                                lg: '60%'
                            },

                        }}>
                            {/* <video
                                src={propertyData.videoFile}
                                alt="property_details-img"
                                style={{ objectFit: "cover", borderRadius: "10px",width:'100%', }}
                                className="property_details-img"
                            /> */}
                            {/* <video
                            height={400}
                            width={800}
                            src={propertyData.videoFile}
                            controls
                            /> */}
                            <ReactPlayer
                                url={propertyData.videoFile}
                                width="100%"

                                controls={true}
                                config={{
                                    file: {
                                        attributes: {
                                            controlsList: "nodownload",
                                        },
                                    },
                                }}
                            // onContextMenu={(e) => e.preventDefault()}
                            // onEnded={() => {
                            //     if (!completedLessons.includes(lesson._id))
                            //         handleMarkLesson();
                            // }}
                            />


                            <Box mt="15px">
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    flexWrap="wrap"
                                    alignItems="center"
                                >
                                    <Stack direction="row">
                                        <Typography
                                            fontSize={24}
                                            fontWeight={500}
                                            color="#11142D"
                                            textTransform="capitalize"
                                        >
                                            {propertyData.type}
                                        </Typography>
                                        <Box sx={{
                                            marginLeft: '12px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            {[1, 2, 3, 4, 5].map((item) => (
                                                <Star
                                                    key={`star-${item}`}
                                                    sx={{
                                                        color: "#F2C94C",
                                                        fontSize: '20px'
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Stack>
                                    <Box>



                                        <Checkbox
                                            checked={checkedfav}
                                            icon={<FavoriteBorder fontSize="large" sx={{
                                            }} />}
                                            checkedIcon={<Favorite fontSize="large" sx={{

                                                color: 'red'
                                            }} />}
                                            onChange={handleChangeFav}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </Box>
                                </Stack>

                                <Stack
                                    direction="row"
                                    flexWrap="wrap"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Box>

                                        <Typography
                                            fontSize={22}
                                            fontWeight={600}
                                            mt="10px"
                                            color="#11142D"
                                        >
                                            {propertyData.name}

                                        </Typography>



                                        <Stack
                                            mt={2}
                                            direction="row"
                                            alignItems="center"
                                            gap={0.5}
                                        >
                                            <Place sx={{ color: "black" }} />
                                            <Typography fontSize={18} color="black">
                                                {propertyData.country} , {propertyData.state} , {propertyData.city}
                                            </Typography>
                                        </Stack>
                                    </Box>

                                    <Box>
                                        <Typography
                                            fontSize={16}
                                            fontWeight={600}
                                            mt="10px"
                                            color="#11142D"
                                        >
                                            Price
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <CurrencyRupeeIcon />
                                            <Typography
                                                fontSize={20}
                                                fontWeight={700}
                                                color="#475BE8"
                                                sx={{
                                                    textTransform: 'none',
                                                    textDecoration: 'none'
                                                }}>
                                                {
                                                    formatPrice(propertyData.price)
                                                }
                                            </Typography>

                                        </Stack>

                                    </Box>
                                </Stack>












                            </Box>

                            <Box sx={{
                                marginTop: '8px'
                            }}>
                                <Stack direction="column">
                                    <Typography fontSize={22}
                                        fontWeight={600}

                                        color="#11142D">Address </Typography>
                                    <Typography color="#11142D"> {propertyData.location}</Typography>

                                </Stack>

                            </Box>

                            <Box sx={{
                                marginTop: '8px'
                            }} >
                                <Stack direction="column">
                                    <Typography fontSize={22}
                                        fontWeight={600}

                                        color="#11142D">Description </Typography>
                                    {/* <Typography color="#11142D"> {propertyData.description}</Typography> */}
                                    <TextWithReadMore text={propertyData.description} />
                                </Stack>

                            </Box>
                            { userData._id != propertyData.creator._id &&
                            <Box sx={{
                                marginTop:'14px',
                               
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>
                                {
                                    propertyData.booked ? 
                                    (
                                        <>
                                        <Stack direction="row" >
                                        <BeenhereIcon sx={{
                                            color:'blue',
                                            fontSize:'1.5rem'}}/>
                                    <Typography sx={{
                                        color:'blue',
                                        fontSize:'1.2rem',
                                        marginLeft:'8px'
                                    }}>
                                        Already Booked
                                    </Typography>
                                    </Stack>
                                    </>)
                                    : 
                                    
                                    <Button onClick={handleBook} color="primary"
                                    variant="contained"
                                    
                                    >Book Property</Button>
                                }
                                
                            </Box>
}


                        </Box>



                        <Box

                            flex={1}


                            display="flex"
                            flexDirection="column"

                            alignItems="center"
                            gap="20px"
                            sx={{

                                maxWidth: {
                                    xs: '100%',
                                    lg: '40%'
                                },


                            }}
                        >
                            <Stack
                                width="100%"
                                p={2}
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                border="1px solid #E4E4E4"
                                borderRadius={2}
                            >
                                <Stack
                                    mt={2}
                                    justifyContent="center"
                                    alignItems="center"
                                    textAlign="center"
                                >

                                    <Avatar
                                        alt="User"
                                        src={propertyData.creator.profileIcon ? propertyData.creator.profileIcon : ""}
                                        sx={{

                                            borderRadius: "100%",
                                            objectFit: "cover",
                                            width: 100,
                                            height: 100
                                        }} />


                                    <Box mt="15px">
                                        <Typography
                                            fontSize={18}
                                            fontWeight={600}
                                            color="#11142D"
                                        >
                                            {propertyData.creator.name}
                                        </Typography>
                                        <Typography
                                            mt="5px"
                                            fontSize={14}
                                            fontWeight={400}
                                            color="#808191"
                                        >
                                            Agent
                                        </Typography>
                                    </Box>



                                    <Typography
                                        mt={1}
                                        fontSize={16}
                                        fontWeight={600}
                                        color="#11142D"
                                    >
                                        Total {" "}
                                        {propertyData.creator.allProperties.length} {" "}
                                        Properties Listed
                                    </Typography>
                                </Stack>

                                <Stack
                                    width="100%"
                                    mt="25px"
                                    direction="row"

                                    flexWrap="wrap"
                                    gap={2}
                                    sx={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {userData.email == propertyData.creator.email &&

                                        <CustomButton

                                            title="Delete"
                                            color="white"
                                            backgroundColor="#d42e2e"

                                            icon={<Delete />}
                                            width="40%"
                                            height="80%"
                                            handleClick={calldeletealert}

                                        />


                                    }
                                    {userData && userData.email != propertyData.creator.email && (ispresent == 'null' || ispresent == "Denied") &&
                                        <CustomButton

                                            title="Request Agent Info"

                                            color="white"
                                            backgroundColor="#2ED480"

                                            icon={<PermIdentityIcon />}
                                            width="80%"
                                            height="80%"
                                            handleClick={requestAccess}
                                        // icon={!isCurrentUser ? <Phone /> : <Delete />}
                                        // handleClick={() => {
                                        //     if (isCurrentUser) handleDeleteProperty();
                                        // }}
                                        />
                                    }
                                    {
                                        ispresent == "Pending" ?

                                            <CustomButton
                                                title=" request pending"






                                            /> : ""
                                    }


                                    {ispresent == "Granted" ? <Stack
                                        mt="15px"
                                        direction="row"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <Stack direction="row">
                                            <EmailIcon />
                                            <Typography
                                                fontSize={14}
                                                fontWeight={400}
                                                color="#808191"
                                                marginLeft={1}
                                            >
                                                {propertyData.creator.email}
                                            </Typography>


                                        </Stack>
                                        <Stack direction="row" marginLeft={2}>
                                            <LocalPhoneIcon />
                                            <Typography
                                                fontSize={14}
                                                fontWeight={400}
                                                color="#808191"
                                                marginLeft={1}
                                            >
                                                {propertyData.creator.phone}
                                            </Typography>

                                        </Stack>




                                    </Stack> : " "}



                                </Stack>
                            </Stack>






                        </Box>



                    </Box>



                    <Box mt={8}>
                        <Stack direction="row">
                            <Typography fontSize={18}
                                fontWeight={600}
                                paddingRight={1}
                                color="#11142D" >Check Live Location</Typography>
                            < MyLocationIcon width={8} height={8} />
                        </Stack>
                    </Box>
                    <Box mt={3} className="mapouter" sx={{

                        position: 'relative',
                        width: '100%'


                    }}>

                        <Box mt={1} className="gmap_canvas"
                            sx={{
                                overflow: 'hidden',
                                textAlign: 'center',
                                width: '100%'
                            }}>

                            <iframe width="100%"
                                height='400' id="gmap_canvas"

                                src={gmap}
                                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                            </iframe>
                            {/* <a href="https://2yu.co"></a>
                                <br />
                                <a href="https://embedgooglemap.2yu.co"></a> */}

                        </Box>
                    </Box>



                </Box>







                : ""
            }


        </Box >




    );
}

export default PropertyDetails;


