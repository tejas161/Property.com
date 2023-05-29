import { Box, Container, styled, Typography } from "@mui/material";
import React,{useState,useEffect} from "react";
import PropertyCard from "../PropertyCard";
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';

import Aos from "aos";

import "aos/dist/aos.css";


const Properties = () => {
    const PropertiesBox = styled(Box)(({ theme }) => ({
        display: "flex",
        flexWrap:'wrap',
       
         
        justifyContent: "space-between",
        marginTop: theme.spacing(5),
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    }));

    const PropertiesTextBox = styled(Box)(({ theme }) => ({
        [theme.breakpoints.down("md")]: {
            textAlign: "center",
        },
    }));

    const [propertyData, setPropertyData] = useState();
    const navigate = useNavigate();
    const { url } = useGlobalContext();

    

    const getAllProperties = async () => {


        const res = await fetch(`${url}/allproperties?_start=0&_end=4`
            , {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

        const data = await res.json();
        // const count = (res.headers.get('x-total-count'));
        // setNumberProp(count);

        // var data1 = data.concat(data)
        // var data2 = data1.concat(data1);
        // var data3 = data2.concat(data2);
        setPropertyData(data);
        // console.log(data)

        if (res.status != 200) {
            // toast.error('Some error occured!!', {
            //     position: "top-right",
            //     autoClose: 500,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",


            // });
        }





    }




    useEffect(() => {
      
        getAllProperties();


        return () => {
     
        }; 


    }, []);

    return (
        <Box sx={{ mt: 4, py: 10 }}>
            <Container>
                <PropertiesTextBox>
                    <Typography
                        sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold",
                    textAlign:'center' }}
                    >
                        Featured Properties
                    </Typography>
                    <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 3 , textAlign:'center'}}>
                        Discover New and Latest Properties on our Site !!
                    </Typography>
                </PropertiesTextBox>

                <PropertiesBox paddingTop={4} gap={6}>
                    {
                        propertyData ? propertyData.map((property,key) => (
                           
                            <PropertyCard
                           
                            width="40%"
                            height="60%"
                          
                                key={key}
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
                          
                        )) : " "
                    }
                </PropertiesBox>
            </Container>
        </Box>
    );
};

export default Properties;