import { Grid, Box, Toolbar } from "@mui/material";
import React from "react";
import PromptBar from "./PromptBar";
import ChatMessage from "./ChatMessage";

function ChatWindow() {
  return (
    <Box sx={{ position: "relative", flexGrow: 1, overflow: "auto" }}>
      <Toolbar />
      <PromptBar />
      <Box p={"2%"} display={"flex"} flexDirection={"column"}>
        <ChatMessage sent={true} text="TEST" />
        <ChatMessage
          sent={false}
          text="Maecenas at felis non turpis scelerisque gravida."
        />
        <ChatMessage
          sent={false}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at felis non turpis scelerisque gravida"
        />
        <ChatMessage
          sent={true}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at felis non turpis scelerisque gravida. Suspendisse potenti. Proin sodales arcu id nunc tempus porttitor. Sed scelerisque justo nec tempus pulvinar. Cras faucibus vulputate sapien, sit amet scelerisque justo mollis vitae. Sed id fringilla felis. Cras venenatis mi non mauris consequat, pharetra elementum dui rhoncus. Integer dictum urna eu ultricies tincidunt. Maecenas placerat magna ut tortor auctor, nec tempor nibh finibus."
        />
      </Box>
    </Box>
  );
}

export default ChatWindow;
