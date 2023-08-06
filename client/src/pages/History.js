import React, { useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import NavBar from "../components/NavBar";
import HistoryItem from "../components/History/HistoryItem";

import firebase from "../firebase";

const auth = firebase.auth();
const firestore = firebase.firestore();

function getChat() {
  firestore
    .collection("account")
    .doc(auth.currentUser.uid)
    .get()
    .then(doc => {
      console.log(doc.data().saved);
      // return doc.data().saved;
      doc.data().saved.map(chat => {
        //create new object with chatid, other, time
        //button with link to chat but pass in chatid as prop
        console.log(chat);
        <HistoryItem
          name={chat.other}
          date={chat.time}
          width="12%"
          height="15vh"
        ></HistoryItem>;
      });
    });
}

export default function History() {
  return (
    <React.Fragment>
      <NavBar />
      <Toolbar />
      <Box display={"flex"} flexWrap={"wrap"} padding={"2%"}>
        {getChat()}
      </Box>
    </React.Fragment>
  );
}
