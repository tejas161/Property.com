import React,{useState} from 'react'
import { useParams } from "react-router-dom";
import { useGlobalContext } from '../context';
import { Typography,Stack ,Box,Button,TextField} from '@mui/material';

import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {

    const queryString = window.location.search;
    const userId = queryString.match(/userid=([^&]*)/)[1];
    const userName = queryString.match(/username=([^&]*)/)[1];

    const [password,setpassword]=useState('');
    const [cpassword,setcpassword]=useState('');
    const navigate = useNavigate();
    const {url} = useGlobalContext();

    const handlePassword = (e) => {
        setpassword(e.target.value);
    }

    const handlecPassword = (e) => {
        setcpassword(e.target.value);
    }

    const submitPassword = async() => {

        if(password !== cpassword || password == "")
        {
            toast.error('Password dont match', {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }else{

        const res = await fetch(`${url}/changepass`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,password
            }),
           
        });

        const data = await res.json();

        if(res.status==200)
        {
            navigate('/');
        }
        else{
            toast.error('Some error occurred', {
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
            id="Password"
            name="Password"
            label="New Password"
            type="Password"
           size="normal"
          
             variant="outlined"
            onChange={handlePassword}
          />
            <TextField
            autoFocus
            margin="dense"
            id="cPassword"
            name="cPassword"
            label="Confirm New Password"
            type="password"
           size="normal"
          
             variant="outlined"
            onChange={handlecPassword}
          />

          <Button onClick={submitPassword} variant="contained" sx={{
              marginTop:'1rem'
          }}>Submit</Button>
           
       </Box>
      
      
      </>
    )
}

export default ChangePassword;
