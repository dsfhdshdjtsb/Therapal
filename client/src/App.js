import React from "react";
import HomePage from "./pages/HomePage"

import 'firebase/auth';
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth';
import { Routes, Route} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Test from "./components/test";
import Test1 from "./components/test1";


initializeApp({
  apiKey: "AIzaSyDP5rmqUlR-_j9qBAHcieSEwYoNbGFYZK4",
  authDomain: "therapal-104ee.firebaseapp.com",
  projectId: "therapal-104ee",
  storageBucket: "therapal-104ee.appspot.com",
  messagingSenderId: "482427393641",
  appId: "1:482427393641:web:936f26917efec2306774f8",
  measurementId: "G-4TTLV9F4D9"
});

const auth=getAuth();
const firestore=getFirestore();

export default function App() { 
    const [user] = useAuthState(auth);

    return (
        <Routes>
            <Route exact path="/" element={<Test />} />
            <Route path="/test" element={<Test1 />} />
        </Routes>
        
    )
    
}

function dummy(){
    return (
        <HomePage/>
    )
}

function SignIn(){
    const signInWithGoogle=()=>{
        const provider = new GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    )   
}

function SignOut(){
    return auth.currentUser && (
        <button onClick={()=>auth.signOut()}>Sign Out</button>
    )
}
