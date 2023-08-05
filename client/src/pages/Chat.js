import React from "react";

import { Box } from "@mui/material";

import NavBar from "../components/NavBar";
import SideBar from "../components/Chat/SideBar";
import ChatWindow from "../components/Chat/ChatWindow";
import UserControls from "../components/Chat/UserControls";

function Chat() {
  return (
    <Box sx={{display: "flex"}}>
      <NavBar />
      <SideBar />
      <ChatWindow />
      <UserControls />
    </Box>
  );
}

export default Chat;
