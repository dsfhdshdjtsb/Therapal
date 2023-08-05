import React from "react";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBarButton from "./NavBarButton";
import firebase from "../firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// function SignOut() {
//   return (
//     auth.currentUser && <button onClick={() => }>Sign Out</button>
//   );
// }

const auth = firebase.auth();

export default function NavBar() {
  return (
    <AppBar color="secondary" position="static" sx={{ boxShadow: 3 }}>
      <Toolbar sx={{ height: "7vh" }}>
        <Typography
          variant="h4"
          color="white"
          sx={{ fontWeight: "medium", mr: "5%" }}
        >
          Therapal
        </Typography>
        <Stack direction="row" spacing={4} sx={{ flexGrow: 8 }}>
          <NavBarButton>Home</NavBarButton>
          <NavBarButton>History</NavBarButton>
          <NavBarButton>Settings</NavBarButton>
        </Stack>
        {auth.currentUser && (
          <Stack direction="row" spacing={4} sx={{ flexGrow: 1 }}>
            <NavBarButton
              onClick={event => {
                auth.signOut();
                console.log("signed out");
              }}
            >
              Log Out
            </NavBarButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
