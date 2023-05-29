import React,{useState} from 'react'
import { useGlobalContext } from '../context';

import { Typography,Stack ,Box,Button,TextField} from '@mui/material';

import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {

    const navigate = useNavigate();
    const {url} = useGlobalContext();

    const [uemail,setUemail]=useState('');

    const handleUser  = (e) => {
       setUemail(e.target.value);
    }

    const sendEmail = async() => {
        if(uemail == "")
        {
            toast.error('Email is empty', {
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

        if(uemail != "")
    {
        const res = await fetch(`${url}/resetpass`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uemail
            }),
           
        });

      

      toast.success('Check Your Email', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

        const data = await res.json();

        navigate('/');
    }
    }

    return (
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
       <Box sx={{
           display:'flex',
           flexDirection:'column',
           justifyContent:'center',
           alignItems:'center',
          height:'100vh',
           width:'100%'
       }}>
            <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
           size="normal"
          
             variant="outlined"
            onChange={handleUser}
          />
          <Button onClick={sendEmail} variant="contained" sx={{
              marginTop:'1rem'
          }}>Submit Email</Button>
           
       </Box>
       </>
    )
}

export default ResetPassword;
