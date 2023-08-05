import { Grid, Box, Toolbar } from "@mui/material";
import React from "react";
import PromptBar from "./PromptBar";
import ChatMessage from "./ChatMessage";

function ChatWindow() {
  return (
    <Box sx={{ position: "relative", flexGrow: 1, overflow: "auto"}}>
      <Toolbar />
      <PromptBar />
      <Box p={"2%"}>
        <ChatMessage />
      </Box>
    </Box>
  );
}

export default ChatWindow;
