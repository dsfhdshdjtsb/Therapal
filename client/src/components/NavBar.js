import React from "react";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import NavBarButton from "./NavBarButton";
import firebase from "../firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const auth = firebase.auth();

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      color="secondary"
      position="fixed"
      sx={{ boxShadow: 2, zIndex: theme => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ height: "7vh" }}>
        <Typography
          variant="h4"
          color="white"
          sx={{ fontWeight: "medium", mr: "5%" }}
        >
          TheraPal
        </Typography>
        
        {auth.currentUser && (
          <Stack direction="row" spacing={4} sx={{ flexGrow: 8 }}>
            <Link to="/">
              <NavBarButton>Home</NavBarButton>
            </Link>
            <Link to="/history">
              <NavBarButton>History</NavBarButton>
            </Link>
          </Stack>
        )}

        {auth.currentUser && (
          <Stack direction="row" spacing={4} sx={{ flexGrow: 1 }}>
            <NavBarButton
              onClick={event => {
                auth.signOut();
                console.log("signed out");
                navigate("/");
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
