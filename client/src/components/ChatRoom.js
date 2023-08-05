import firebase from "../firebase"
import "firebase/compat/auth";
import "firebase/compat/firestore";

import {useAuthState} from "react-firebase-hooks/auth"
import {useCollectionData} from "react-firebase-hooks/firestore"

import React from "react";

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function ChatRoom(){
    const messagesRef = firestore.collection(auth.currentUser.uid);
    const query = messagesRef.orderBy("createdAt").limit(25);
    const [messages] = useCollectionData(query, {idField: "id"});

    const [formValue, setFormValue] = React.useState("");

    const sendMessage = async(e) =>{
        e.preventDefault();
        const {uid} = auth.currentUser;
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            username: auth.currentUser.displayName,
        });
        setFormValue("")

    }
    return(
        <>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>

                <button type="submit">Send</button>
            </form> 
        </>   
        )
}
function ChatMessage(props){
    const {text, username, uid} = props.message;
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
    return (
        <div className={`message ${messageClass}`}>
            <p>{username}</p>
            <p>{text}</p>
        </div>
        )
}