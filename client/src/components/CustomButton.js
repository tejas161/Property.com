import React from 'react'
import {Button } from '@mui/material';



const CustomButton = ({type,title,backgroundColor,color,fullWidth,icon,handleClick,height,width}) => {

    return (
       <Button
       sx={{
           flex : fullWidth ? 1 : 'unset',
           padding:{
               xs:'5px 5px',
               lg:'7px 12px'
           },
           width:fullWidth ? '100%' : 'fit-content',
        //    minWidth:0,
           backgroundColor,
           color,
           fontSize:{
               xs:'0.8rem',
               md:'1rem'
           },
           fontWeight:600,
           gap:'8px',
           textTransform:'capitalize',
           width:width,
           height:height,
           '&:hover':{
               opacity:0.9,
               backgroundColor
           }

       }}

       onClick={handleClick}
       
       
       >
           {icon}
           {title}
       </Button>
    );



}

export default CustomButton;



