import firebase from "../firebase"
import "firebase/compat/auth";
import "firebase/compat/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore"

import React, { useEffect, useRef } from "react";

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function ChatRoom(){

    const myDisorders = ["depression", "anxiety"];
    let commonDisorder;
    
    const [conversation, setConversation] = React.useState(auth.currentUser.uid.concat("-"));
    let messagesRef= firestore.collection(conversation);
    useEffect(() => {
        messagesRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                messagesRef.doc(doc.id).delete();
            });
        })
    },[conversation]);

    const query = messagesRef.orderBy("createdAt");
    const [messages] = useCollectionData(query, {idField: "id"});
    const inputRef = useRef(null);
    useEffect(() => {
        firestore.collection("matchmaking").doc(auth.currentUser.uid).onSnapshot((doc) => {
            console.log("doc change")
            if(doc.data() !== undefined)
            {
                setConversation(auth.currentUser.uid.concat("-", doc.data().match))
                messagesRef.doc(auth.currentUser.uid).delete();

                doc.data().disorders.forEach((disorder) => {
                    if(myDisorders.includes(disorder)){
                        commonDisorder = disorder;
                        console.log("commonDisorder= " + commonDisorder);
                    }
                })
            }
        });
    }, [])
    const sendMessage = async(e) =>{

        e.preventDefault();
        const {uid} = auth.currentUser;
        await messagesRef.add({
            text: inputRef.current.value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            username: auth.currentUser.displayName,
        });


    }
    return(
        <>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>
            <form onSubmit={sendMessage}>
                <input type="text" ref={inputRef}/>
                <button type="submit">Send</button>
            </form> 
            {true && <button onClick={matchmake}>Matchmake</button>}
        </>   
        )

    function matchmake(){
        const matchmakeRef = firestore.collection("matchmaking");
        let match;
        matchmakeRef.doc(auth.currentUser.uid).delete();
        matchmakeRef.where('disorders', 'array-contains-any', myDisorders).limit(25)
        .get()
        .then((snapshot) => {
        if (snapshot.empty) {
            console.log('No matching documents.');
            firestore.collection("matchmaking").doc(auth.currentUser.uid).set({
                disorders: myDisorders,
                match: ""
            })
            return;
        }else{
            let doc = snapshot.docs[Math.floor(Math.random() * snapshot.docs.length)]
            setConversation(doc.id.concat("-", auth.currentUser.uid))
            firestore.collection("matchmaking").doc(doc.id).set({
                match: auth.currentUser.uid
            }, {merge: true})
            doc.data().disorders.forEach((disorder) => {
                if(myDisorders.includes(disorder)){
                    commonDisorder = disorder;
                    console.log("commonDisorder= " + commonDisorder);
                }
            })

            matchmakeRef.doc(doc.id).delete();
        }
        
        })
    
    }
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
