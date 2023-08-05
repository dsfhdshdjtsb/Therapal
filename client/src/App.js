import React from "react";
import HomePage from "./pages/HomePage"
import {Route, Routes} from "react-router-dom"
import Test1 from "./components/test1"
import ChatRoom from "./components/ChatRoom"

import "firebase/compat/auth";
import "firebase/compat/firestore";

import {useAuthState} from "react-firebase-hooks/auth"
import {useCollectionData} from "react-firebase-hooks/firestore"
import Test from "./components/test";

 import firebase from "./firebase"

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function App() {
    const [user] = useAuthState(auth);
    React.useEffect(()=>{
        console.log(user)
    },[user])
    return (
        // <Routes>
        //     <Route  path="/" element={<SignIn />} />
        //     <Route  path="/test" element={<Chatroom/>} />
        // </Routes>
        <div>
            {user ? <ChatRoom /> : <SignIn />}
        </div>
        
    )
    
}

function SignIn(){
    const signInWithGoogle = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return(
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
}
function SignOut(){
    return auth.currentUser && (
        <button onClick={()=>auth.signOut()}>Sign Out</button>
    )
}


