import React from "react";

import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDP5rmqUlR-_j9qBAHcieSEwYoNbGFYZK4",
  authDomain: "therapal-104ee.firebaseapp.com",
  projectId: "therapal-104ee",
  storageBucket: "therapal-104ee.appspot.com",
  messagingSenderId: "482427393641",
  appId: "1:482427393641:web:936f26917efec2306774f8",
  measurementId: "G-4TTLV9F4D9"
});

const auth=firebase.auth();
const firestore=firebase.firestore();

export default function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            Hello World!!!
        </div>
    )
    
}
