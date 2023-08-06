import React, { useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import NavBar from "../components/NavBar";
import HistoryItem from "../components/History/HistoryItem";

import firebase from "../firebase";

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function History() {
  return (
    <React.Fragment>
      <NavBar />
      <Toolbar />
      <Box display={"flex"} flexWrap={"wrap"} padding={"2%"}>
        {firestore
          .collection("account")
          .doc(auth.currentUser.uid)
          .get()
          .then(doc => {
            console.log(doc.data().saved);
            // return doc.data().saved;
            doc.data().saved.forEach(chat => {
              //create new object with chatid, other, time
              //button with link to chat but pass in chatid as prop
              <HistoryItem
                name={chat.other}
                date={chat.time}
                width="12%"
                height="15vh"
              ></HistoryItem>;
            });
          })}
      </Box>
    </React.Fragment>
  );
}
