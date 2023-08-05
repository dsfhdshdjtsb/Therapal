import React from "react";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
export default function NavBar() {
  return (
    <AppBar color="secondary" position="static">
      <Toolbar sx={{ height: "7vh" }}>
        <Stack direction="row" spacing={6} sx={{flexGrow: 8}}>
          <Typography
            variant="h4"
            color="white"
            sx={{ fontWeight: "medium"}}
          >
            Therapal
          </Typography>
          <Button
            disableElevation="true"
            sx={{ bgcolor: "white", minWidth: "8rem" }}
            variant="contained"
          >
            Home
          </Button>
          <Button
            disableElevation="true"
            sx={{ bgcolor: "white", minWidth: "8rem" }}
            variant="contained"
          >
            Saved
          </Button>
          <Button
            disableElevation="true"
            sx={{ bgcolor: "white", minWidth: "8rem" }}
            variant="contained"
          >
						Settings
          </Button>
        </Stack>
        <Stack direction="row" spacing={4} sx={{flexGrow: 1}}>
          <Button
            size="large"
            disableElevation="true"
            sx={{ bgcolor: "white", minWidth: "8rem" }}
            variant="contained"
          >
            Log Out
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
