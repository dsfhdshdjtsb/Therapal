import { Box, Toolbar} from "@mui/material";
import React, { useEffect } from "react";
import { usePrompt, useRef } from "react";
import PromptBar from "./PromptBar";
import ChatMessage from "./ChatMessage";

function ChatWindow(props) {
  const scrollDiv = useRef();
  const [prompt, setPrompt] = React.useState("TheraPal hasn't been prompted yet! If you an icebreaker or TheraPal to generate an opening prompt, press the Generate Prompt button!");
  useEffect(()=>{
    if (props.messages && props.messages.length > 0){
      console.log(props.messages[props.messages.length-1].text)
      if (props.messages[props.messages.length-1].uid === "ChatGPT"){
        setPrompt(props.messages[props.messages.length-1].text);
      }
    } 
  }, [props.messages])

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
          height: props.height,
          scrollBehavior: "auto",
        }}
      >
        <Toolbar />
        <PromptBar prompt={prompt} getGpt={props.getGpt} messages={props.messages}/>
        <Box p={"4% 2% 2% 2%"} display={"flex"} flexDirection={"column"}>
          {props.messages && props.messages.map(msg => renderMessage(msg))}
          <div ref={scrollDiv}></div>
        </Box>
      </Box>
    </>
  );
}

export default ChatWindow;
