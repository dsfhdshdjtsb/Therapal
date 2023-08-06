import { Box, Toolbar } from "@mui/material";
import React from "react";
import PromptBar from "./PromptBar";
import ChatMessage from "./ChatMessage";

function ChatWindow(props) {

  function renderMessage(msg) {
    const { text, username, uid } = msg;
    const sent = uid === props.auth.currentUser.uid
    console.log(props.messages);
    return <ChatMessage key={msg.id} text={text} name={username} sent={sent} />;
  }

  return (
    <Box sx={{flexGrow: 1, overflow: "auto", height:"82vh"}}>
      <Toolbar />
      <PromptBar />
      <Box p={"4% 2% 2% 2%"} display={"flex"} flexDirection={"column"}>
        {props.messages &&
          props.messages.map(msg => (
            renderMessage(msg)
          ))}
      </Box>
    </Box>
  );
}

export default ChatWindow;
