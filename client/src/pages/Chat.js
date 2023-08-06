import firebase from "../firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useLocation } from "react-router-dom";

import { useCollectionData } from "react-firebase-hooks/firestore";
import React, { useEffect, useRef, CSSProperties } from "react";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";

import NavBar from "../components/NavBar";
import SideBar from "../components/Chat/SideBar";
import ChatWindow from "../components/Chat/ChatWindow";
import UserControls from "../components/Chat/UserControls";
import PulseLoader from "react-spinners/PulseLoader";
import "../index.css"

const auth = firebase.auth();
const firestore = firebase.firestore();


export default function ChatRoom() {
  const randomId = Date.now();

  const [otherDisplay, setOtherDisplay] = React.useState("");
  const [conversation, setConversation] = React.useState(auth.currentUser.uid
  );
  const [sharedDisorders, setSharedDisorders] = React.useState([]);
  const [startMessageHack, setStartMessageHack] = React.useState(false);
  useEffect(() => {
    sendStartMessage();
  },[startMessageHack]);
  
  let messagesRef = firestore.collection(conversation);
  const query = messagesRef.orderBy("createdAt");
  const [messages] = useCollectionData(query, { idField: "id" });
  const inputRef = useRef(null);

  const location = useLocation();
  const state = location.state;
  const myDisorders = [];
  const keys = Object.keys(state);
  let myDisplay = state.displayName;
  let historyMessageRef = state.historyMessageRef;

  let commonDisorder;

  keys.forEach(key => {
    if (state[key] === true) {
      myDisorders.push(key);
    }
  });
  console.log("mydisorders")
  console.log(myDisorders)

  useEffect(() => {
    console.log(conversation);
    saveChat(conversation);
    return () => {
      firestore.collection("matchmaking").doc(auth.currentUser.uid).delete();
      sendLeftMessage();
    };
  }, [conversation]);

  useEffect(() => {
    return () => {
      firestore.collection("matchmaking").doc(auth.currentUser.uid).delete();
      sendLeftMessage();
    };
  }, [location]);

  useEffect(() => {
    firestore
      .collection("matchmaking")
      .doc(auth.currentUser.uid)
      .onSnapshot(doc => {
        if (doc.data() !== undefined && doc.data().match !== "") {
          setOtherDisplay(doc.data().otherDisplay);
          setStartMessageHack(true);
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

          doc.data().otherDisorders.forEach(disorder => {
            if (myDisorders.includes(disorder)) {
              setSharedDisorders(prev => [...prev, disorder]);
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

    if (historyMessageRef) {
      console.log("historyMessageRef: " + historyMessageRef);
      setConversation(historyMessageRef);
    }
    if (!historyMessageRef) {
      matchmake();
    }
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
  const sendMessage = async text => {
    const { uid } = auth.currentUser;
    await messagesRef.add({
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      username: myDisplay,
    });
  };

  const sendLeftMessage = async ()  => {
    if(!historyMessageRef)
    {
      const { uid } = auth.currentUser;
      await messagesRef.add({
        text: "Other user has left the chat",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        username: "System",
      });
    }
  };

  const sendStartMessage = async ()  => {
    console.log("sendstartm111essage")
    if(!historyMessageRef)
    {
      console.log("sendstartmessage")
      let stringDisorders = sharedDisorders
      await messagesRef.add({
        text: "You have both matched with each other because you both selected " + sharedDisorders.toString().replaceAll(',', ', '),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: "System",
        username: "System",
      });
    }
  };
  // useEffect(() => {
  //   sendStartMessage();
  // }, [otherDisplay]);
// otherDisplay: display name of other person, means you have matchmaked
// historyMessageRef: came from history
// if you matchmade with someone, height = 82vh but if you enter from history, height = 100vh
  return (
    <>
          <Box sx={{ display: "flex" }}>
            <NavBar />
            <SideBar sendReport={sendReport}/>
            
            {!otherDisplay && !historyMessageRef && <div className="Loading"> <PulseLoader color={"#7FFFD4"} size={10} /></div> }
            {!otherDisplay && historyMessageRef && <ChatWindow height={"100vh"} messages={messages} getGpt={getGpt} auth={auth}/>}
            {otherDisplay && !historyMessageRef && <ChatWindow height={"82vh"} messages={messages} getGpt={getGpt} auth={auth}/> }
            {otherDisplay && !historyMessageRef && <UserControls sendMessage={sendMessage} sendReport={sendReport}/> }
          </Box> 
    </>
    
    
  

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
    let date = new Date();
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
              time: date.toLocaleString(),
              chatid: chatid,
            }),
          },
          { merge: true }
        );
    }
  }

  async function getGpt(){
    const options ={
        method: "POST",
        body: JSON.stringify({
            prompt: genPrompt(),
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("https://oyster-app-cfsz2.ondigitalocean.app/api/api", options) //change something on digital ocean to fix this but not my problem
      .then(res => res.json())
      .then(data => {
        const { uid } = auth.currentUser;
        messagesRef.add({
          text: data.message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid: "ChatGPT",
          username: "TheraPal",
        });
      });
  }

  function genPrompt() {
    return (
      [{
          // role:"system", content: "You are TheraPal. TheraPal looks at a conversation between 2 people who struggle with" + commonDisorder
          // + " and generates 1 question to foster discussion between the 2 conversation members. TheraPal starts every message with \"TheraPal:\".For example, your" 
          // + "response should follow this format: TheraPal: [Your responses here]. TheraPal does not immitate the conversation members." 
          // + " TheraPal does not respond to messages from other TheraPals. TheraPal does not respond to messages from itself.",
          role: "user", content: " You are TheraPal. TheraPal looks at a conversation between 2 people who struggle with"+ JSON.stringify(sharedDisorders) + "and generates 1 question to foster discussion between the 2 conversation members. TheraPal starts every message with \"TheraPal:\". For example, your response should follow this format: TheraPal: [Your responses here].. TheraPal does not respond to messages from other TheraPals. TheraPal does not respond to messages from itself. TheraPal tries to relate conversation members with each other. If either conversation member has not talked in a while, TheraPal directs a question an extra question at them to bring them back into the conversation. Attached is transcript of an ongoing conversation. Contribute meaningfully to the conversation by asking 1 questions. The question should not be more than 3 sentences. If the following conversation is blank, only contains system messages, or if this is TheraPal's first message, ask one question to initiate both members in a discussion\n" + stringifyConvo(messages)
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
              otherDisorders: [],
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
                otherDisorders: myDisorders,
              },
              { merge: true }
            );

            doc.data().disorders.forEach(disorder => {
              if (myDisorders.includes(disorder)) {
                setSharedDisorders(prev => [...prev, disorder]);
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
