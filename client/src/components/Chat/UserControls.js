import React from "react";
import { Box, Button, TextField } from "@mui/material";

function UserControls() {
  const [message, setMessage] = React.useState("");

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      padding={"2%"}
      sx={{
        position: "fixed",
        bottom: "0",
        left: "18vw",
        borderTop: 2,
        borderColor: "secondary.main",
        height: "10vh",
        width: "78%",
      }}
    >
      <Button
        variant="contained"
        size="large"
        sx={{
          padding: "1.5rem",
          fontSize: "1rem",
          position: "relative",
          bgcolor: "primary.main",
          whiteSpace: "nowrap",
          maxHeight: "3rem",
          borderRadius: "16px",
          margin: "5px 2% 0 0",
        }}
      >
        Disconnect
      </Button>
      <TextField
        id="message"
        label="Enter your message"
        variant="outlined"
        multiline
        maxRows={4}
        value={message}
        onChange={() => {
          setMessage(document.getElementById("message").value);
        }}
        fullWidth
        color="accent"
        size="large"
      />
      <Button
        variant="contained"
        size="large"
        sx={{
          padding: "1.5rem",
          fontSize: "1rem",
          position: "relative",
          bgcolor: "primary.main",
          whiteSpace: "nowrap",
          maxHeight: "3rem",
          borderRadius: "16px",
          margin: "5px 0 0 2%",
        }}
      >
        Send (Enter)
      </Button>
    </Box>
  );
}

export default UserControls;
