import { Grid } from "@mui/material";
import React from "react";
import PromptBar from "./PromptBar";

function ChatWindow() {
  return <React.Fragment>
    <Grid container width={"85vw"} height={"73vh"} top={"7vh"} sx={{ float: "right"}}>
      TEST
    </Grid>
    <PromptBar />
  </React.Fragment>;
}

export default ChatWindow