import React from "react";
import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ChatMessage(props) {
  console.log(props.sent);
  let messageStyles = {};
  let textStyle = {
    borderRadius: "10px",
    padding: "7px",
    margin: "0 10px 25px 10px",
    maxWidth: "90%",
  };
  if (props.sent) {
    messageStyles = {
      float: "right",
      flexDirection: "row-reverse",
    };
    textStyle = { ...textStyle, backgroundColor: "primary.main" };
  } else {
    messageStyles = {
      float: "left",
    };
    textStyle = { ...textStyle, backgroundColor: "#D3D3D3" };
  }

  return (
    <React.Fragment>
      <Box display="flex" sx={messageStyles} padding="0 3% 0 3%">
        <Typography variant="body1" sx={{fontWeight: "light", fontSize: "0.8rem"}}>{props.name}</Typography>
      </Box>
      <Box display="flex" sx={messageStyles}>
        <AccountCircleIcon fontSize="large" color="accent" />
        <Typography variant="body1" sx={textStyle}>
          {props.text}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
