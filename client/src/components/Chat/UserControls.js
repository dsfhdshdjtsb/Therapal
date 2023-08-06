import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useRef } from "react";

import { Link } from "react-router-dom";

function UserControls(props) {
  const [message, setMessage] = React.useState("");
  const formRef = useRef();
  const handleSubmit = e => {
    e.preventDefault();
    setMessage("");
    props.sendMessage(message);
  };

  return (
    <>
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
        <Link
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            bgcolor: "primary.main",
            margin: "0 2% 0 0",
          }}
          to="/"
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              fontSize: "1rem",
              bgcolor: "primary.main",
              whiteSpace: "nowrap",
              maxHeight: "3rem",
              borderRadius: "16px",
              margin: "0 2% 0 0",
            }}
          >
            Disconnect
          </Button>
        </Link>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          style={{ width: "100%", display: "flex" }}
        >
          <TextField
            onKeyDown={e => {
              if (e.code === "Enter" && !e.shiftKey) {
                e.preventDefault();
                formRef.current.requestSubmit();
              }
            }}
            id="message"
            label="Enter your message"
            variant="outlined"
            multiline
            maxRows={3}
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
            type="submit"
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
        </form>
      </Box>
    </>
  );
}

export default UserControls;
