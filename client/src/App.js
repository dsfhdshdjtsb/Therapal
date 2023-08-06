import React from "react";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";


import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Test from "./components/test";

import firebase from "./firebase";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Chat from "./pages/Chat";

const auth = firebase.auth();
const firestore = firebase.firestore();

const theme = createTheme({
  palette: {
    primary: {
      main: "#7FFFD4",
    },
    secondary: {
      main: "#40C69D",
    },
    accent: {
      main: "#374B43",
    }
  },
});

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      {/* <div>
            {user ? <ChatRoom /> : <SignIn />}
        </div> */}
    </ThemeProvider>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(provider);
    })
    .catch((error) => {
        console.log(error);
    });
  };
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

