import firebase from "../firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useLocation } from "react-router-dom";

import { useCollectionData } from "react-firebase-hooks/firestore";

import React, { useEffect, useRef } from "react";

import { Box } from "@mui/material";

import NavBar from "../components/NavBar";
import SideBar from "../components/Chat/SideBar";
import ChatWindow from "../components/Chat/ChatWindow";
import UserControls from "../components/Chat/UserControls";

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function ChatRoom() {
  const randomId = Date.now();
  
  const [otherDisplay, setOtherDisplay] = React.useState("");
  const [conversation, setConversation] = React.useState(
    auth.currentUser.uid.concat("-")
  );
  let messagesRef = firestore.collection(conversation);
  const query = messagesRef.orderBy("createdAt");
  const [messages] = useCollectionData(query, { idField: "id" });
  const inputRef = useRef(null);

  const location = useLocation();
  const state = location.state;
  const myDisorders = [];
  const keys = Object.keys(state);
  let myDisplay = state.displayName;
  let commonDisorder;

  keys.forEach(key => {
    if (state[key] === true) {
      myDisorders.push(key);
    }
  });

  useEffect(() => {
    console.log(conversation);
    saveChat(conversation);
  }, [conversation]);

  useEffect(() => {
    firestore.collection("matchmaking").doc(auth.currentUser.uid).delete();
    return () => {
      firestore.collection("matchmaking").doc(auth.currentUser.uid).delete();
    };
    //SEND MESSAGE HERE THAT USER HAS LEFT THE CHAT
  }, [location]);

  useEffect(() => {
    firestore
      .collection("matchmaking")
      .doc(auth.currentUser.uid)
      .onSnapshot(doc => {
        if (doc.data() !== undefined && doc.data().match !== "") {
          setOtherDisplay(doc.data().otherDisplay);
          setConversation(
            auth.currentUser.uid.concat(
              "-",
              doc.data().match,
              "-",
              doc.data().randomId
            )
          );

          console.log("saving chat+ " + conversation);
          messagesRef.doc(auth.currentUser.uid).delete();

          doc.data().disorders.forEach(disorder => {
            if (myDisorders.includes(disorder)) {
              commonDisorder = disorder;
            }
          });
          saveChat(
            auth.currentUser.uid.concat(
              "-",
              doc.data().match,
              "-",
              doc.data().randomId
            )
          );
        }
      });
    window.addEventListener("beforeunload", event => {
      firestore.collection("matchmaking").doc(auth.currentUser.uid).delete();
    });
    console.log("time to fetch");
    matchmake();
  }, []);
  // useEffect(() => {
  //     window.onbeforeunload = () => handler();

  //     window.addEventListener('beforeunload', (event) => {
  //       handler();
  //     });

  //     return () => {
  //       handler();
  //       document.removeEventListener('beforeunload', handler);
  //     };
  //   });
  const sendMessage = async (text)  => {
    const { uid } = auth.currentUser;
    await messagesRef.add({
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      username: myDisplay,
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <SideBar />
      <ChatWindow messages={messages} genPrompt={genPrompt} auth={auth}/>
      <UserControls sendMessage={sendMessage} sendReport={sendReport}/>
    </Box>
  

  // <div>
  //     <div>
  //             {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  //         </div>
  //         <form onSubmit={sendMessage}>
  //             <input type="text" ref={inputRef}/>
  //             <button type="submit">Send</button>
  //         </form> 
  //         {true && <button onClick={()=>sendReport("test")}>report</button>}
  //         {true && <button onClick={getChats}>load chat</button>}
  //         {true && <button onClick={getGpt}>gpt</button>} 
  // </div>    
  )
  

  function saveChat(chatid) {
    console.log("ran");
    if (
      conversation !== auth.currentUser.uid.concat("-") &&
      conversation !== auth.currentUser.uid.concat("--", randomId) &&
      otherDisplay !== ""
    ) {
      console.log("truetrue");
      firestore
        .collection("account")
        .doc(auth.currentUser.uid)
        .set(
          {
            saved: firebase.firestore.FieldValue.arrayUnion({
              other: otherDisplay,
              chatid: chatid,
            }),
          },
          { merge: true }
        );
    }
  }

  function getGpt(){
    console.log(commonDisorder)
    const options ={
        method: "POST",
        body: JSON.stringify({
            prompt: genPrompt(),
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("http://localhost:3001/api", options)
        .then((res) => res.json()).then((data)=>{
            console.log( data)
            const {uid} = auth.currentUser;
            messagesRef.add({
                text: data.message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid: "ChatGPT",
                username: "Therapal",
            });
        })


}

  function genPrompt() {
    return (
      [{
          role:"system", content: "You are going to pretend to be Therapal. Therapal is a therapist that is helping 2 people who struggle with " + commonDisorder + ". " 
          + " These 2 people are having a conversation about their struggles. Start every message with \"Therapal:\"",
          role: "user", content: " Help these 2 people by asking 1 or 2 questions relevent to their struggles and experiences. Each question should be no more than 2 sentences in length." 
          + " A transcript of the current conversation is available below. If applicable, specify who you are speaking to. Do not respond to messages from Therapal. For example: \n\n " 
          + "Therapal: [Your responses here] " + stringifyConvo(messages)
      } ]
      // "The following is a transcript of an ongoing conversation between 2 people struggling with " + commonDisorder + ". " +
      // "Contribute meaningfully to the conversation by asking 1 or 2 questions. Each question should be no more than 2 sentences in length \n"
      // + stringifyConvo(messages)
    )
  }
  function stringifyConvo(convo) {
    let string = "";
    convo.forEach(message => {
      string = string + message.username + ": " + message.text + "\n";
    });
    return string;
  }
  function getChats() {
    firestore
      .collection("account")
      .doc(auth.currentUser.uid)
      .get()
      .then(doc => {
        console.log(doc.data().saved);
        return doc.data().saved;
        // doc.data().saved.forEach((chat) => {
        //     firestore.collection(chat).get().then((snapshot) => {
        //         snapshot.forEach((doc) => {
        //             console.log(doc.data())
        //         })
        //     })
        // })
      });
  }
  function loadChat(chatid) {
    firestore
      .collection(chatid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data());
        });
      });
  }
  function matchmake() {
    if (myDisorders.length !== 0) {
      const matchmakeRef = firestore.collection("matchmaking");
      let match;
      matchmakeRef.doc(auth.currentUser.uid).delete();
      matchmakeRef
        .where("disorders", "array-contains-any", myDisorders)
        .limit(25)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            firestore.collection("matchmaking").doc(auth.currentUser.uid).set({
              disorders: myDisorders,
              randomId: randomId,
              myDisplay: auth.currentUser.displayName,
              otherDisplay: "",
              match: "",
            });
            return;
          } else {
            let doc =
              snapshot.docs[Math.floor(Math.random() * snapshot.docs.length)];
            setOtherDisplay(doc.data().myDisplay);
            setConversation(
              doc.id.concat("-", auth.currentUser.uid, "-", doc.data().randomId)
            );
            saveChat(
              doc.id.concat("-", auth.currentUser.uid, "-", doc.data().randomId)
            );
            firestore.collection("matchmaking").doc(doc.id).set(
              {
                match: auth.currentUser.uid,
                otherDisplay: auth.currentUser.displayName,
              },
              { merge: true }
            );

            doc.data().disorders.forEach(disorder => {
              if (myDisorders.includes(disorder)) {
                commonDisorder = disorder;
                console.log("commonDisorder= " + commonDisorder);
              }
            });

            matchmakeRef.doc(doc.id).delete();
          }
        });
    }
  }



  function sendReport(reasoning) {
    firestore.collection("reports").doc(auth.currentUser.uid).set({
      reasoning: reasoning,
      reporter: auth.currentUser.displayName,
      chatlogs: messages,
    });
  }
}
