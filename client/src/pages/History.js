import React, { useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import NavBar from "../components/NavBar";
import HistoryItem from "../components/History/HistoryItem";

import firebase from "../firebase";

const auth = firebase.auth();
const firestore = firebase.firestore();



export default function History() {
  const [history, setHistory] = React.useState([]);
  console.log(history)
  useEffect(() => {
    firestore
      .collection("account")
      .doc(auth.currentUser.uid)
      .get()
      .then(doc => {
        if(doc.data())
        {
          setHistory(doc.data().saved);
        }
          
      })
  },[]);
  return (
    <React.Fragment>
      <NavBar />
      <Toolbar />
      <Box display={"flex"} flexWrap={"wrap"} padding={"2%"}>
        {history.map(chat => <HistoryItem
          name={chat.other}
          date={chat.time}
          historyRef={chat.chatid}
          width="12%"
          height="15vh">
        </HistoryItem>)}
      </Box>
    </React.Fragment>
  );
}
  //             {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
