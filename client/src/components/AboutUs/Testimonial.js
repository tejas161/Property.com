import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Avatar from '@mui/material/Avatar';
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const Testimonial = ({name,description,profileimg}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#000F2E",
        padding: 3,
        border: "1px solid #00C7FF",
        borderRadius: "10px",
        maxWidth: "315px",
        position: "relative",
        mx: 3,
      }}
    >

      <Avatar  sx={{ marginX:'auto',width: 80, height: 80 }} alt="User" src={profileimg} />
      <Typography variant="body1" sx={{ color: "white", my: 2 }}>
       {description}
      </Typography>
      <Typography variant="body2">
        <span style={{ color: "#33C7FF", fontWeight: "bold" }}>
          Trusted Customer : 
        </span>
        <span style={{ color: "#7B89A8" }}> Mr. {name}</span>
      </Typography>
      <FormatQuoteIcon
        style={{
          position: "absolute",
          top: "-20px",
          left: "-20px",
          color: "#00C7FF",
          height: "50px",
          width: "50px",
        }}
      />
    </Box>
  );
};

export default Testimonial;