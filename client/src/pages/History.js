import React from "react";
import { Box, Toolbar } from "@mui/material";
import NavBar from "../components/NavBar";
import HistoryItem from "../components/History/HistoryItem";


export default function History() {
  return (
    <React.Fragment>
      <NavBar />
      <Toolbar />
      <Box display={"flex"} flexWrap={"wrap"} padding={"2%"}>
        <HistoryItem name="Nick Suh" date="August 5, 2023 at 10:08:58 PM UTC-7" width="12%" height="15vh"></HistoryItem>
      </Box>
    </React.Fragment>
  );
}
