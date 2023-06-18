import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Resizer from "react-image-file-resizer";
import Preview from '../components/Preview';
import {
    Box,
    Typography,
    FormControl,
    FormHelperText,
    TextField,
    Stack,
    Select,
    MenuItem,
    Button,
    useMediaQuery, useTheme
} from "@mui/material";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CustomButton from "../components/CustomButton";
import CloseIcon from '@mui/icons-material/Close';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik';
import * as yup from 'yup';

let theme = createTheme();
theme = responsiveFontSizes(theme);



const ListProperty = () => {

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    const [userData, setUserData] = useState({});
    const { url } = useGlobalContext();
  
    const navigate = useNavigate();

    const [propertyTypes, setPropertyTypes] = useState([]);
    const [countriesdata, setCountiresdata] = useState([]);
    const [statesdata, setStatesdata] = useState([]);
    const [citiesdata, setCitiesdata] = useState([]);


    const [countryiso, setCountryiso] = useState('countries');
    const [stateiso, setStateiso] = useState('');

    const [startCall, setStartCall] = useState(false);


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
        }
        catch (error) {
            // Create a Dialog box on my profile that user not authenticated
            // navigate('/logout');
           window.location.href='/';

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

    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
     
        };
    },[]);
    

    useEffect(() => {
        callMyProfile();
        callPropertyTypes();
        callCountry();
        callState();
        callCity();
        return (() => { })
    }, [countryiso, stateiso]);




    const validationSchema = yup.object().shape({
        name: yup.string().min(2, "It's too short").required("Required"),
        description: yup.string().min(4, "It's too short").required("Required"),
        type: yup.string().required("Required"),
        price: yup.number().required("Required"),
        country: yup.string().required("Required"),
        state: yup.string().required("Required"),
        city: yup.string().required("Required"),
        location: yup.string().required("Required"),
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            type: "",
            price: "",
            country: "",
            state: "",
            city: "",
            location: "",

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            formsubmit(values);
        },
    });

    const changeCountry = (event) => {
        const nameg = event.target.value;
        const foundCountry = countriesdata.find(countries => countries.name === nameg);
        formik.setFieldValue(event.target.name, event.target.value);
        setCountryiso(foundCountry.iso2);
    }

    const changeState = (event) => {
        const nameg = event.target.value;
        const foundState = statesdata.find(states => states.name === nameg);
        formik.setFieldValue(event.target.name, event.target.value);
        setStateiso(foundState.iso2);
    }

    const changeCity = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);

    }





    const [imageError, setImageError] = useState(false);
    const [imageFile, setImageFile] = useState();


    const [videoError,setVideoError]=useState(false);
    const [videoFileSelected,setVideoFileSelected]=useState('');
    const [videoFile,setVideoFile]=useState();



    const handleClick = () => {
        formik.handleSubmit();
    }

    const formsubmit = async (userPropertyDetails) => {
     
       
        var { name, description, type, price, country, state, city, location } = userPropertyDetails;
        const email = userData.email;
        // console.log(imageFile);
        // console.log(videoFile);
        if (imageFile != null && videoFile != null) {
            setStartCall(true);
            const res = await fetch(`${url}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, description, type, price, country, state, city, location, imageFile,videoFile, email
                })
            });
            const data = res.json();
            data.then(serverresp => console.log(serverresp.message));
            setStartCall(false);
            if (res.status == 200) {
                toast.success('Property Created Successfully', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate('/allproperties');
            }
            else {
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
                navigate('/listproperty');
            }

        }
        else {
            if(imageFile == null) setImageError(true);
            if(videoFile == null) setVideoError(true);
        }

        
    }




    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                marginX: 'auto',
                width: {
                    xs: '90%',
                    md: '80%'
                }
            }}>

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

                {
                    startCall ?
                        (<Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={true}

                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>) : ""
                }


                <Box borderRadius="15px" padding="14px" bgcolor="#fcfcfc">
                    <form
                        style={{
                            marginTop: '4px',
                            minWidth: "100%",
                            display: "flex",
                            flexDirection: "column",
                            flexWrap: 'wrap',
                            gap: "8px",
                        }}


                    >
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: {
                                        lg: '20px',
                                        xs: '16px'
                                    },
                                    color: "#11142d",
                                }}
                            >
                                Property Name
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                id="name"
                                name="name"
                                color="info"
                                variant="outlined"
                                placeholder="Enter Property Name"

                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}



                            />
                        </FormControl>


                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: {
                                        lg: '20px',
                                        xs: '16px'

                                    },
                                    color: "#11142d",
                                }}
                            >
                                Property Description
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                id="description"
                                name="description"
                                color="info"
                                variant="outlined"
                                placeholder="Enter description"
                                rows={2}
                                multiline
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}



                            />

                        </FormControl>



                        <Stack direction="row" gap={4}>
                            <FormControl sx={{
                                flex: 1, maxWidth: {
                                    xs: '60%',
                                    sm: '50%',
                                    lg: '50%'
                                }
                            }}>
                                <FormHelperText
                                    sx={{
                                        fontWeight: 500,
                                        margin: "10px 0",
                                        fontSize: {
                                            lg: '20px',
                                            xs: '16px'

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
                                    defaultValue=""
                                    error={formik.touched.type && Boolean(formik.errors.type)}
                                    id="type"
                                    name="type"
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem key="-1" value="">Select Type</MenuItem>
                                    {
                                        propertyTypes &&
                                        propertyTypes.map((property) => (
                                            <MenuItem key={property.id} value={property.value}
                                            >{property.text}</MenuItem>
                                        ))
                                    }

                                </Select>
                                {formik.touched.type &&
                                    <p style={{
                                        color: '#e8410e',
                                        fontSize: '12px',
                                        paddingTop: '2px',
                                        paddingLeft: '6px'

                                    }}>   {formik.errors.type} </p>
                                }
                            </FormControl>

                            <FormControl sx={{
                                maxWidth: {
                                    xs: '40%',
                                    sm: '50%',
                                    md: '50%'
                                }
                            }}>
                                <FormHelperText
                                    sx={{
                                        fontWeight: 500,
                                        margin: "10px 0",
                                        fontSize: {
                                            lg: '20px',
                                            xs: '16px'

                                        },
                                        color: "#11142d",
                                    }}
                                >
                                    Property Price
                                </FormHelperText>
                                <TextField
                                    fullWidth
                                    required
                                    id="price"
                                    name="price"
                                    color="info"
                                    type="number"
                                    variant="outlined"
                                    placeholder="Rupees"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                            </FormControl>











                        </Stack>




                        <Stack direction={isMatch ? "column" : "row"} gap={4} >
                            <FormControl sx={{
                                flex: 1, maxWidth: {
                                    xs: '100%',
                                    sm: '100%',
                                    md: '40%'
                                }
                            }}>
                                <FormHelperText
                                    sx={{
                                        fontWeight: 500,
                                        margin: "10px 0",
                                        fontSize: {
                                            lg: '20px',
                                            xs: '16px'

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
                                    error={formik.touched.country && Boolean(formik.errors.country)}

                                    id="country"
                                    name="country"
                                    value={formik.values.country}
                                    onChange={changeCountry}
                                >
                                    <MenuItem key="-1" value="">Select Country</MenuItem>
                                    {
                                        countriesdata ?
                                        countriesdata.map((countries) => (
                                            <MenuItem key={countries.id}
                                                value={countries.name}>{countries.name}</MenuItem>
                                        )) : ""
                                    }

                                </Select>
                                {formik.touched.country &&
                                    <p style={{
                                        color: '#e8410e',
                                        fontSize: '12px',
                                        paddingTop: '2px',
                                        paddingLeft: '6px'

                                    }}>   {formik.errors.country} </p>
                                }
                            </FormControl>

                            <FormControl sx={{
                                flex: 1, maxWidth: {
                                    xs: '100%',
                                    sm: '100%',
                                    md: '40%'
                                }
                            }}>
                                <FormHelperText
                                    sx={{
                                        fontWeight: 500,
                                        margin: "10px 0",
                                        fontSize: {
                                            lg: '20px',
                                            xs: '16px'

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
                                    error={formik.touched.state && Boolean(formik.errors.state)}
                                    id="state"
                                    name="state"
                                    value={formik.values.state}
                                    onChange={changeState}
                                >
                                    <MenuItem key="-1" value="">Select State</MenuItem>
                                    {
                                        statesdata &&
                                        statesdata.map((states) => (
                                            <MenuItem key={states.id} value={states.name}>{states.name}</MenuItem>
                                        ))
                                    }

                                </Select>
                                {formik.touched.state &&
                                    <p style={{
                                        color: '#e8410e',
                                        fontSize: '12px',
                                        paddingTop: '2px',
                                        paddingLeft: '6px'

                                    }}>   {formik.errors.state} </p>
                                }
                            </FormControl>

                            <FormControl sx={{
                                flex: 1, maxWidth: {
                                    xs: '100%',
                                    sm: '100%',
                                    md: '40%'
                                }
                            }}>
                                <FormHelperText
                                    sx={{
                                        fontWeight: 500,
                                        margin: "10px 0",
                                        fontSize: {
                                            lg: '20px',
                                            xs: '16px'

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
                                    error={formik.touched.city && Boolean(formik.errors.city)}
                                    id="city"
                                    name="city"
                                    value={formik.values.city}
                                    onChange={changeCity}>
                                    <MenuItem key="-1" value="">Select City</MenuItem>
                                    {
                                        citiesdata &&
                                        citiesdata.map((cities) => (
                                            <MenuItem key={cities.id} value={cities.name}>{cities.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                {formik.touched.city &&
                                    <p style={{
                                        color: '#e8410e',
                                        fontSize: '12px',
                                        paddingTop: '2px',
                                        paddingLeft: '6px'

                                    }}>   {formik.errors.city} </p>
                                }
                            </FormControl>
                        </Stack>


                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: {
                                        lg: '20px',
                                        xs: '16px'

                                    },
                                    color: "#11142d",
                                }}
                            >
                                Property Location
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                id="location"
                                name="location"
                                color="info"
                                variant="outlined"
                                placeholder="Enter Property Address"
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                error={formik.touched.location && Boolean(formik.errors.location)}
                                helperText={formik.touched.location && formik.errors.location}
                            />
                        </FormControl>
                        <Stack
                            direction="column"
                            gap={1}
                            justifyContent="center"
                            mb={2}
                        >
                            <Stack direction="row" gap={2}>
                                <Typography
                                    color="#11142d"
                                    fontWeight={500}
                                    my="10px"
                                    sx={{
                                        fontSize: {
                                            lg: '20px',
                                            xs: '16px'
                                        },
                                    }}
                                >
                                    Property Photo
                                </Typography>
                                <Button
                                    component="label"
                                    sx={{
                                        width: "fit-content",
                                        color: "#2ed480",
                                        textTransform: "capitalize",
                                        fontSize: 16,
                                    }}
                                >
                                    Upload
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
                                                setImageError(false);
                                            }
                                        }

                                        
                                    }

                                    />

                                </Button>

                            </Stack>
                            {
                                imageError && !imageFile && (
                                    <p style={{
                                        color: '#e8410e',
                                        fontSize: '12px',

                                    }}>*Please Select an image</p>
                                )
                            }
                              {
                                !imageError && imageFile  && <CloseIcon sx={{
                                    position:'relative',
                                    width:'30%',
                                    height:'25px',
                                    marginLeft:'3.3rem',
                                    marginTop:'8px',
                                    cursor:'pointer'
                                }} onClick={() => {setImageFile('');
                                
                                setImageError(true)}
                            }/> 
                            }
                            {
                                !imageError && imageFile && <Preview file={imageFile}/> 
                            }

                          
                          
                        </Stack>


                        <Stack
                            direction="column"
                            gap={1}
                            justifyContent="center"
                            mb={2}
                        >
                            <Stack direction="row" gap={2}>
                                <Typography
                                    color="#11142d"
                                    fontWeight={500}
                                    my="10px"
                                    sx={{
                                        fontSize: {
                                            lg: '20px',
                                            xs: '16px'
                                        },
                                    }}
                                >
                                    Property Video
                                </Typography>
                                <Button
                                    component="label"
                                    sx={{
                                        width: "fit-content",
                                        color: "#2ed480",
                                        textTransform: "capitalize",
                                        fontSize: 16,
                                    }}
                                >
                                    Upload
                                    <input
                                        hidden
                                        accept="video/*"
                                        type="file"
                                        name="video"
                                        onChange={(e) => {
                                            setVideoFileSelected(e.target.files[0]);
                                           
                                            const reader = new FileReader();
                                            if (e.target.files[0] != null) {
                                                reader.readAsDataURL(e.target.files[0]);
                                                reader.onload = () => {
                                                    setVideoFile(reader.result);

                                                }
                                                setVideoError(false);
                                            }


                                       
                                             }

                                        
                                    }

                                    />

                                </Button>

                            </Stack>
                            {
                                videoError && !videoFile && (
                                    <p style={{
                                        color: '#e8410e',
                                        fontSize: '12px',

                                    }}>*Please Select an video</p>
                                )
                            }

{
                                !videoError && videoFile  && <CloseIcon sx={{
                                    position:'relative',
                                    width:'30%',
                                    height:'25px',
                                    marginLeft:'3.3rem',
                                    marginTop:'8px',
                                    cursor:'pointer'
                                }} onClick={() => {setVideoFile('');
                                
                                setVideoError(true);setVideoFileSelected('');}
                            }/> 
                            }
                            {
                                !videoError && videoFile && <p>{videoFileSelected.name}</p>
                            }
                           
                        </Stack>

                        <CustomButton
                            title="Submit"
                            backgroundColor="#475be8"
                            color="#fcfcfc"
                            handleClick={handleClick}
                            width="30%"
                            height="20%"
                        />
                    </form>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default ListProperty;
