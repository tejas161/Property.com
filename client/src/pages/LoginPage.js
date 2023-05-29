import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useGlobalContext } from '../context';

import { Typography,Stack } from '@mui/material';

const LoginPage = ({login,handleLoginOpen,handleLoginClose,handleSignOpen,}) => {

    const [user,setUser]=useState({
        email:"",
        password:""
    })

    const navigate = useNavigate();

 
    const handleUser  = (e) => {
        let name=e.target.name;
        let value=e.target.value;
        setUser({...user,[name]:value});
    }
    const {url} = useGlobalContext();

    const onSubmit = async() => {
    

      const {email,password}=user;
      const res = await fetch(`${url}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email, password
        }),
        withCredentials: true,
        credentials: 'include'
    });

    const data = await res.json();
    // data.then(serverresp => console.log(serverresp.message));
    
    
    if(res.status === 200)
    {
      
     

     
      toast.success('User Logged In', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
       
       


        setTimeout(() => handleLoginClose(),1000);
        window.location.href="/";

       

        
    }
    else{

    

      toast.error(data.message, {
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
 

  return (
    <div>
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
    
      <Dialog open={login} onClose={handleLoginClose} sx={{}}>
        <DialogTitle><Typography variant="p">LOGIN</Typography>
       <IconButton
          aria-label="close"
          onClick={handleLoginClose}
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
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleUser}
          />
           <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleUser}
          />
        </DialogContent>
        <DialogContent sx={{
          padding:0,
          margin:0,
          paddingLeft:'16px'
        }}>
          <Typography sx={{
            fontSize:'12px',
            color:'#687690',
            cursor:'pointer'
          }} onClick={() => {handleLoginClose();navigate('/resetpassword');}}>Forgot Password?</Typography>
         
        </DialogContent>
        <DialogActions sx={{margin:'auto'}}>
          <Button onClick={onSubmit}  startIcon={ <LoginIcon/>} color="success" variant="contained">Login</Button>
         
        </DialogActions>
        <DialogContent sx={{display:'flex',
      justifyContent:'center',alignItems:'center'}} >
          <Stack direction="row">
          <Typography marginX={1} variant="p">Don't have an account ?</Typography>
          <Typography variant="p" color="#0F1B4C" fontWeight="bold"
          sx={{
            cursor:'pointer'
          }}
          onClick={() => {handleLoginClose(); handleSignOpen();}}>Sign up</Typography>
          </Stack>

        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoginPage;


