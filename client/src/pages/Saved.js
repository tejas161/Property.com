import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box, Stack, Typography, Button, FormControl,
    FormHelperText,
    TextField,
    Select,
    MenuItem,
    useTheme,
    useMediaQuery
} from '@mui/material';

import Pagination from '@mui/material/Pagination';
import PropertyCard from '../components/PropertyCard';
import CustomButton from '../components/CustomButton';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const Saved = () => {


    const [userData, setUserData] = useState('');
    const [savedArray, setSavedArray] = useState([]);
    const [propertyData, setPropertyData] = useState([]);
    const { url } = useGlobalContext();

    const [startCall, setStartCall] = useState(false);

    const [page, setPage] = useState(0);

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));


    const [numberProp, setNumberProp] = useState(0);


    useEffect(() => {
        window.scrollTo(0, 0);
        callMyProfile();


        return (() => { });


    }, []);

    useEffect(() => {

        callProperty();

        return (() => { });
    }, [savedArray]);


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
            setSavedArray(array);




            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }




        }
        catch (error) {

            // Create a Dialog box on my profile is user not authenticated
            // navigate('/logout');
        }



    }

    const callProperty = async () => {


        setStartCall(true);

        try {
            const res = await fetch(`${url}/mysaved`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    savedArray

                })




            });


            const data = await res.json();
            setPropertyData(data);
            setNumberProp(data.length)
            setStartCall(false);



        }
        catch (error) {
            setStartCall(false);
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
        <Box sx={{
            marginX: '16px'
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
            <Box sx={{
                marginTop: '1.6rem',
                marginLeft: '1rem',

            }}>
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>My Saved Lists !!</Typography>
            </Box>
            <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>

                {
                    propertyData ? propertyData.map((property) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            name={property.name}
                            description={property.description}
                            type={property.type}
                            price={property.price}
                            country={property.country}
                            state={property.state}
                            city={property.city}
                            location={property.location}
                            imageFile={property.imageFile}





                        />
                    )) : "No Saved Properties"
                }






            </Box>
            <Box sx={{
                marginTop: '1.3rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <Pagination count={Math.ceil(numberProp / 6)}
                    color="primary"
                    shape="rounded"
                    size="large"
                    defaultPage={page}
                    onChange={(event, value) => {
                        if (value == 1) setPage(0);
                        else setPage(value * 6 - 6);

                    }} />
            </Box>


        </Box>
    )
}

export default Saved;
