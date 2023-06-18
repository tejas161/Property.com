import React, { useEffect, useState } from 'react';

import { Add } from '@mui/icons-material';
import {
    Box, Stack, Typography, Button, FormControl,
    FormHelperText,
    TextField,
    Select,
    MenuItem,
    useTheme,
    useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '../components/Footer';

import Pagination from '@mui/material/Pagination';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const AllProperties = () => {
    const [propertyData, setPropertyData] = useState();
    const navigate = useNavigate();
    const { url } = useGlobalContext();

    const [page, setPage] = useState(0);

    const [startCall,setStartCall] = useState(false);


    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));


    const [numberProp, setNumberProp] = useState(0);
    const [sortWay, setSortWay] = useState('ASC');

    const toggleSort = () => {
        setSortWay(sortWay == "ASC" ? "DESC" : "ASC");

    }

    const getAllProperties = async () => {

        setStartCall(true);
        const res = await fetch(`${url}/allproperties?_start=${page}&_end=${6}&_sort1=price&_order=${sortWay}&country=${country}&state=${state}&city=${city}&type=${propertyType}`
            , {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

        const data = await res.json();
        const count = (res.headers.get('x-total-count'));
        setNumberProp(count);

        // var data1 = data.concat(data)
        // var data2 = data1.concat(data1);
        // var data3 = data2.concat(data2);
        setPropertyData(data);
        setStartCall(false);
       

        if (res.status != 200) {
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

   


    useEffect(() => {
       
        getAllProperties();

        return () => {
     
        };


    }, [numberProp, page, sortWay]);

    const [propertyTypes, setPropertyTypes] = useState([]);
    const [countriesdata, setCountiresdata] = useState([]);
    const [statesdata, setStatesdata] = useState([]);
    const [citiesdata, setCitiesdata] = useState([]);


    const [countryiso, setCountryiso] = useState('countries');
    const [stateiso, setStateiso] = useState('');


    const callCountry = async () => {
        try {

            const res = await fetch(`${url}/getCountries`, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            const data = await res.json();
            setCountiresdata(data);
        }
        catch (error) {
            toast.error('Some Error occurred country !!', {
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


    const callState = async () => {
        setStatesdata([]);
        if (countryiso != 'countries') {
            try {
                const res = await fetch(`${url}/getStates`, {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        countryiso
                    }),
                    credentials: 'include'
                });
                const data = await res.json();
                setStatesdata(data);
            }
            catch (error) {
                console.log(error)
                toast.error('Some Error occurred states !!', {
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
    }

    const callCity = async () => {
        setCitiesdata([]);
        if (countryiso != 'countries' && stateiso != '') {
            try {
                const res = await fetch(`${url}/getCities`, {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        countryiso, stateiso
                    }),
                    credentials: 'include'
                });
                const data = await res.json();
                setCitiesdata(data);
            }
            catch (error) {
                toast.error('Some Error occurred cities!!', {
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
    }
    const callPropertyTypes = async () => {

        try {

            const res = await fetch(`${url}/getPropertyTypes`, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            const data = await res.json();
            setPropertyTypes(data);
        }
        catch (error) {
            toast.error('Some Error occurred propertytypese !!', {
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

    const [propertyType, setPropertyType] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    const changeProperty = (event) => {
        setPropertyType(event.target.value);
    }

    const changeCountry = (event) => {
        const nameg = event.target.value;
        const foundCountry = countriesdata.find(countries => countries.name === nameg);
        setCountry(event.target.value);
        setCountryiso(foundCountry.iso2);
    }

    const changeState = (event) => {
        const nameg = event.target.value;
        const foundState = statesdata.find(states => states.name === nameg);
        setState(event.target.value);
        setStateiso(foundState.iso2);
    }

    const changeCity = (event) => {
        setCity(event.target.value);

    }

    const submitSearch = () => {
        getAllProperties();
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
     
        };
    },[]);


    useEffect(() => {

        callPropertyTypes();
        callCountry();
        callState();
        callCity();
        return (() => { })
    }, [countryiso, stateiso]);


    return (
        <Box sx={{
            marginTop: '22px',
            marginX: '16px',


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
            <Stack direction="row"
                justifyContent="space-between"
                alignItems="center"
                marginTop={6}


            >
                <Typography variant="p" fontWeight={700}
                    color="#11142d"
                    sx={{
                        fontSize: {
                            xs: '1.3rem',
                            lg: '2rem'
                        }
                    }}
                >
                    All Properties
                </Typography>

                <CustomButton
                    title="Add Property"
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    handleClick={() => { navigate('/listproperty') }}
                    icon={<Add />}
                />




            </Stack>
            <Box>
                <form>
                    <Stack direction="row" marginTop={6}>
                        <CustomButton
                            title="Sort Price"
                            backgroundColor="#28c953"
                            color="#fcfcfc"

                            handleClick={toggleSort}
                            icon={sortWay == "ASC" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                        />

                    </Stack>



                    <Stack gap={4} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginTop:'8px'
                    }}>

                        <FormControl sx={{
                            flex: 1, minWidth: {
                                xs: '40%',
                                sm: '40%',
                                md: '20%'
                            }
                        }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: {
                                        xs: "2px 0",
                                        sm: "2px 0",
                                        md: "10px 0"
                                    },
                                    fontSize: {
                                        lg: '20px',
                                        xs: '14px',


                                    },
                                    color: "#11142d",
                                }}
                            >
                                Property Type
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue="  "
                                id="type"
                                name="type"
                                value={propertyType}
                                onChange={changeProperty}
                            >
                                <MenuItem key="-1" value="">Type</MenuItem>
                                {
                                    propertyTypes &&
                                    propertyTypes.map((property) => (
                                        <MenuItem key={property.id} value={property.value}
                                        >{property.text}</MenuItem>
                                    ))
                                }

                            </Select>

                        </FormControl>
                        <FormControl sx={{
                            flex: 1, minWidth: {
                                xs: '40%',
                                sm: '40%',
                                md: '20%'
                            }
                        }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: {
                                        xs: "2px 0",
                                        sm: "2px 0",
                                        md: "10px 0"
                                    },
                                    fontSize: {
                                        lg: '20px',
                                        xs: '14px'

                                    },
                                    color: "#11142d",
                                }}
                            >
                                Property Country
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                id="country"
                                name="country"
                                value={country}
                                onChange={changeCountry}
                            >
                                <MenuItem key="-1" value="">Country</MenuItem>
                                {
                                    countriesdata ?
                                    countriesdata.map((countries) => (
                                        <MenuItem key={countries.id}
                                            value={countries.name}>{countries.name}</MenuItem>
                                    )) : ""
                                }

                            </Select>
                        </FormControl>

                        <FormControl sx={{
                            flex: 1, minWidth: {
                                xs: '40%',
                                sm: '40%',
                                md: '20%'
                            }
                        }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: {
                                        xs: "2px 0",
                                        sm: "2px 0",
                                        md: "10px 0"
                                    },
                                    fontSize: {
                                        lg: '20px',
                                        xs: '14px'

                                    },
                                    color: "#11142d",
                                }}
                            >
                                Property State
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                id="state"
                                name="state"
                                value={state}
                                onChange={changeState}
                            >
                                <MenuItem key="-1" value="">State</MenuItem>
                                {
                                    statesdata &&
                                    statesdata.map((states) => (
                                        <MenuItem key={states.id} value={states.name}>{states.name}</MenuItem>
                                    ))
                                }

                            </Select>

                        </FormControl>

                        <FormControl sx={{
                            flex: 1, minWidth: {
                                xs: '40%',
                                sm: '40%',
                                md: '20%'
                            }
                        }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: {
                                        xs: "2px 0",
                                        sm: "2px 0",
                                        md: "10px 0"
                                    },
                                    fontSize: {
                                        lg: '20px',
                                        xs: '14px'

                                    },
                                    color: "#11142d",
                                }}
                            >
                                Property City
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""

                                id="city"
                                name="city"
                                value={city}
                                onChange={changeCity}
                            >
                                <MenuItem key="-1" value="">City</MenuItem>
                                {
                                    citiesdata &&
                                    citiesdata.map((cities) => (
                                        <MenuItem key={cities.id} value={cities.name}>{cities.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>


                    </Stack>
                    <Stack direction="row" sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '12px'
                    }}>

                        <FormControl sx={{
                            flex: '1',
                            maxWidth: '10%',
                            height: '15%'
                        }}>
                            <CustomButton
                                
                                backgroundColor="#28c953"
                                color="#fcfcfc"
                                handleClick={submitSearch}
                                icon={<SearchIcon />}
                            />

                           

                          

                           </FormControl>
                    </Stack>


                </form>


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
                    )) : ""
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

export default AllProperties;
