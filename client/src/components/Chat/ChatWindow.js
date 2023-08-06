import { Box, Toolbar} from "@mui/material";
import React from "react";
import { useRef } from "react";
import PromptBar from "./PromptBar";
import ChatMessage from "./ChatMessage";

function ChatWindow(props) {
  const scrollDiv = useRef();

  function renderMessage(msg) {
    const { text, username, uid } = msg;
    const sent = uid === props.auth.currentUser.uid;
    if(scrollDiv.current)
    {
      scrollDiv.current.scrollIntoView({ behavior: "smooth" });
    }
    
    return <ChatMessage key={msg.id} text={text} name={username} sent={sent} />;
  }
  
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          height: "82vh",
          scrollBehavior: "auto",
        }}
      >
        <Toolbar />
        <PromptBar getGpt={props.getGpt} messages={props.messages}/>
        <Box p={"4% 2% 2% 2%"} display={"flex"} flexDirection={"column"}>
          {props.messages && props.messages.map(msg => renderMessage(msg))}
          <div ref={scrollDiv}></div>
        </Box>
      </Box>
    </>
  );
}

export default ChatWindow;
