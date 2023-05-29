import React, { useState,useRef,useEffect } from 'react'

import { Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useGlobalContext } from '../context';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const Otp = ({showotp,handleOtpOpen,handleOtpClose,handleLoginOpen}) => {
    const [otp, setOTP] = useState(['', '', '', '', '', '']);

    const {url} = useGlobalContext();
    const {name,email}=useGlobalContext();
  

    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
      ];

    const handleSubmit = async() => {
     
        const numString = otp.join(''); // Joins the array elements into a single string
        const num = parseInt(numString); // Converts the string to a number   
        
        const res = await fetch(`${url}/verifyotp`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              email,num
          })
      });

      const data = await res.json();
      if(res.status == 200)
      {
        toast.success('User Verification Completed', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
        handleOtpClose();
        handleLoginOpen();

        //welcome user
      }
      else{

        toast.error('Wrong OTP ', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",


      });
 
        //wrong otp password


      }
      
    }
  
    const handleInputChange = (index, event) => {
      const newOTP = [...otp];
      newOTP[index] = event.target.value;

      if (event.target.value !== '') {
        if (index === inputRefs.length - 1) {
          inputRefs[index].current.blur();
        } else {
          inputRefs[index + 1].current.focus();
        }
      }
   

      setOTP(newOTP);
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



            />
        <Dialog open={showotp} onClose={handleOtpClose} sx={{}}>

            <DialogTitle><Typography variant="p">Verify Your Account</Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleOtpClose}
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
                <DialogContentText>
                    We emailed you the six digit code to {email} <br />
                    Enter the code below to confirm your email address
                </DialogContentText>
           
                {[0, 1, 2, 3, 4, 5].map(index => (
        <TextField
          key={index}
          placeholder=" x "
          value={otp[index]}
          onChange={(event) => handleInputChange(index, event)}
          variant="outlined"
          margin="normal"
        
          inputProps={{ maxLength: 1,inputMode: 'numeric', }}
          inputRef={inputRefs[index]}
          sx={{height:'6%',width: {
              xs:'16%',
              sm:'12%',
              md:'8%'
          },marginX:'12px' }}
          autoComplete='off'
          required
        />
      ))}





             
            </DialogContent>
            <DialogActions sx={{ margin: 'auto' }}>
                <Button color="primary" variant="contained" onClick={handleSubmit}>Submit OTP</Button>

            </DialogActions>

        </Dialog>
        </>
    )
}

export default Otp;
