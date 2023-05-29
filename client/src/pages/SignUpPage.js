import React, { useState } from 'react'

import { Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useFormik } from 'formik';
import * as yup from 'yup';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useGlobalContext } from '../context';






const SignUpPage = ({ signup, handleLoginOpen, handleSignClose ,handleOtpOpen,handleEmail}) => {


 
    

    const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z]).{4,}$/
    const validationSchema = yup.object().shape({
        name: yup.string().min(3, "It's too short").required("Required"),
        email: yup.string().email("Enter valid email").required("Required"),
        phone: yup.string().min(10, "Enter valid Phone number").required("Required"),
        password: yup.string().min(4, "Minimum characters should be 4")
            .matches(passwordRegExp, "Password must have atleast one upper case character").required('Required'),
        cpassword: yup.string().oneOf([yup.ref('password')], "Password not matches").required('Required')
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            cpassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            formsubmit(values);
        },






    });

    const {url} = useGlobalContext();
    const {userUpdate} = useGlobalContext();
   

    const formsubmit = async (userDetails) => {

                  
               
        const { name, email, phone, password, cpassword } = userDetails;
       userUpdate(name,email);
      

        const res = await fetch(`${url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, password, cpassword
            })
        });



        const data = await res.json();
        

        if (res.status === 200) {
           

            toast.success('User Created', {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            handleSignClose();
           
                handleOtpOpen();
          


        }
        else if (res.status === 422) {
           

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
        else {

           

            toast.error('Some Error occurred !!', {
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



            />




            <Dialog open={signup} onClose={handleSignClose} sx={{}}>


                <DialogTitle><Typography variant="p">Sign up</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleSignClose}
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
                        Continue , To Register ...
                    </DialogContentText>
                    <form>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Full Name"
                            type="text"
                            fullWidth
                            variant="standard"

                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            inputProps={{
                                inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10,
                            }}
                            autoFocus
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="Phone Number"
                            fullWidth
                            variant="standard"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}

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
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="cpassword"
                            name="cpassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            variant="standard"

                            value={formik.values.cpassword}
                            onChange={formik.handleChange}
                            error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
                            helperText={formik.touched.cpassword && formik.errors.cpassword}

                        />
                    </form>
                </DialogContent>
                <DialogActions sx={{ margin: 'auto' }}>
                    <Button onClick={formik.handleSubmit} color="primary" variant="contained">Sign Up</Button>

                </DialogActions>

            </Dialog>
       

         
       
       
        </div>
    )
}

export default SignUpPage
