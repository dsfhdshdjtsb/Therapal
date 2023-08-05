import React from "react";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import NavBarButton from "./NavBarButton";
export default function NavBar() {
  return (
    <AppBar color="secondary" position="static" sx={{ boxShadow: 3 }}>
      <Toolbar sx={{ height: "7vh" }}>
        <Stack direction="row" spacing={4} sx={{ flexGrow: 8 }}>
          <Typography variant="h4" color="white" sx={{ fontWeight: "medium" }}>
            Therapal
          </Typography>
          <NavBarButton>Home</NavBarButton>
          <NavBarButton>History</NavBarButton>
          <NavBarButton>Settings</NavBarButton>
        </Stack>
        <Stack direction="row" spacing={4} sx={{ flexGrow: 1 }}>
        <NavBarButton>Log Out</NavBarButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
