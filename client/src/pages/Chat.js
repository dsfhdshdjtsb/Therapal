import React from "react";

import NavBar from "../components/NavBar";
import SideBar from "../components/Chat/SideBar";
import ChatWindow from "../components/Chat/ChatWindow";
import UserControls from "../components/Chat/UserControls";
import PromptBar from "../components/Chat/PromptBar";

function Chat() {
  return (
    <React.Fragment>
      <NavBar />
      <SideBar />
      <ChatWindow />
      <UserControls />
    </React.Fragment>
  );
}

export default Chat;
