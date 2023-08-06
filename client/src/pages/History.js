import React, { useEffect } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import HistoryItem from "../components/History/HistoryItem";

import firebase from "../firebase";

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function History() {
  const [history, setHistory] = React.useState([]);
  useEffect(() => {
    firestore
      .collection("account")
      .doc(auth.currentUser.uid)
      .get()
      .then(doc => {
        if (doc.data()) {
          setHistory(doc.data().saved);
        }
      });
  }, []);
  return (
    <React.Fragment>
      <NavBar />
      <Toolbar />
      <Box display={"flex"} flexWrap={"wrap"} padding={"2%"}>
        {history.length > 0 ? (
          history.map(chat => (
            <HistoryItem
              name={chat.other}
              date={chat.time}
              historyRef={chat.chatid}
              width="12%"
              height="15vh"
            ></HistoryItem>
          ))
        ) : (
          <Typography sx={{margin: "auto", vh:"50vh"}} variant="h6" color={"accent.main"}>No history yet!</Typography>
        )}
      </Box>
    </React.Fragment>
  );
}
//             {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
