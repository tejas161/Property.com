import React, { useState } from "react";
import {Typography} from "@mui/material";
import ReactReadMoreReadLess from "react-read-more-read-less";


const TextWithReadMore = ({ text}) => {
 
 

  return (
    <Typography variant="body2" style={{ maxWidth: "100%" }}>
           <ReactReadMoreReadLess
                charLimit={250}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
            >
                {text}
            </ReactReadMoreReadLess>


   
    </Typography>
  );
};

export default TextWithReadMore;