
import React, { useState, useEffect } from 'react'
import {
    Box, Stack, Typography, Select,
    MenuItem
} from '@mui/material'
import { useGlobalContext } from '../context';

import { Link } from "react-router-dom";


import { useNavigate } from 'react-router-dom';



import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import LaunchIcon from '@mui/icons-material/Launch';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
       
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const RequestPage = () => {

    const [userData, setUserData] = useState();
    const [requests, setRequests] = useState([]);
    const { url } = useGlobalContext();
    
    const navigate = useNavigate();


    const [startCall, setStartCall] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);








    const callMyProfile = async () => {
        setStartCall(true);
        try {


            const res = await fetch(`${url}/myprofile`,
                {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'




                });

            const data = await res.json();
            setUserData(data);
            setRequests(data.allowAccess);
           



            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            setStartCall(false);




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
            navigate('/allproperties');
        }

       


    }

    useEffect(() => {
        callMyProfile();
        return () => {
     
        };

    }, []);

    const changeAction = async (event) => {
       
        const str=event.target.name;
        const idStartIndex = str.indexOf('com') + 3; // add 3 to skip past the "com" part
        const email = str.slice(0, idStartIndex); // slice the email part
        const property_id = str.substr(idStartIndex); // extract the id part
        const userId = userData._id;      
       
        const status = (event.target.value)
      

        if (status != " ") {
            setStartCall(true);
            try {
                const res = await fetch(`${url}/requpdate`, {
                    method: "PUT",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"

                    },
                    body: JSON.stringify({
                        userId, email, status,property_id
                    })

                });

                const data = res.json();
                navigate('/requestpage');
                setStartCall(false);
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



    }

   

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    

    return (
        <Box mt={4}>
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

<Stack direction="row" marginLeft={2} marginTop={2}>
            <ManageAccountsIcon/>
            <Typography fontWeight="bold" sx={{
                fontSize: '1.2rem',
                marginLeft: '12px'

            }}> Managing Request Dashboard</Typography>
            </Stack>

            <Box mt={4}>
              
                <TableContainer>
                    <Table sx={{ maxWidth: '100%' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell>Property</StyledTableCell>
                                <StyledTableCell >FullName</StyledTableCell>
                                <StyledTableCell >Email</StyledTableCell>
                                <StyledTableCell >Status</StyledTableCell>
                                <StyledTableCell >Payment</StyledTableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(({ property_id,propertyname,fullname, email, status, _id,payment }, index) => (

                                    <StyledTableRow key={_id} sx={{ maxWidth: '50%', '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                        <StyledTableCell>
                                            <Stack direction="row" padding={2}>

                                            <Typography>{propertyname}
                                        </Typography>
                                        
                                        <LaunchIcon 
                                        sx={{
                                            cursor:'pointer',
                                            marginLeft:'4px',
                                            color:'#737574'
                                        }}
                                         onClick={
                                             () => {navigate(`/propertydetails/${property_id}`)}
                                         }
                                        
                                        
                                        />


                                            </Stack>
                                            
                                       
                                        
                                        </StyledTableCell>
                                        <StyledTableCell >  <Typography>{fullname}
                                        </Typography></StyledTableCell>
                                        <StyledTableCell >  <Typography>{email}</Typography></StyledTableCell>
                                        <StyledTableCell >    <Select
                                            variant="outlined"
                                            color="info"
                                            displayEmpty
                                            required
                                            inputProps={{ "aria-label": "Without label" }}
                                            defaultValue={status}
                                            id={email+property_id}
                                            name={email+property_id}                                          
                                                                               

                                            onChange={changeAction}
                                           sx={{
                                               minWidth:{
                                                   lg:'60%',
                                                   xs:'100%'
                                                 
                                               },
                                               maxWidth:{
                                                   xs:'100%'
                                               }
                                             
                                             
                                           }}
                                          
                                        >
                                            <MenuItem key="1" value="Pending" >Pending</MenuItem>
                                            <MenuItem key="2" value="Denied">Denied</MenuItem>
                                            <MenuItem key="3" value="Granted" >Granted</MenuItem>


                                        </Select></StyledTableCell>
                                        <StyledTableCell >  <Typography>{payment ? "Booked" : "Not Booked"}</Typography></StyledTableCell>
                                    </StyledTableRow>











                                ))}

                               
                           
                        </TableBody>
                    </Table>
                </TableContainer>
                {requests.length==0 ? 
                                <Box padding={2} mt={2} sx={{
                                    
                                }}>

                                  <Typography variant="h5" sx={{
                                   
                                  }} >No User Requests !!!</Typography>
                                </Box> : ""
                                    }
                <TablePagination
                                rowsPerPageOptions={[1,10, 25, 100]}
                                component="div"
                                count={requests.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                              
                            />










            </Box>


        </Box>
    )
}

export default RequestPage;
