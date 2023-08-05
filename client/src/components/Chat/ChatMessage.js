import React from "react";
import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const messageStyles = {
  sent: {
    float: "right",
    flexDirection: "row-reverse",
  },
  received: {
    float: "left",
  },
};

const textStyle = {
  backgroundColor: "primary.main",
  borderRadius: "10px",
  padding: "7px",
  margin: "0 10px 30px 10px",
  width: "90%"
};

export default function ChatMessage(props) {
  return(
      <Box display="flex" sx={messageStyles.sent}>
        <AccountCircleIcon fontSize="large" />
        <Typography variant="body1" sx={textStyle}>
          {props.text}
        </Typography>
      </Box>
  );
}
