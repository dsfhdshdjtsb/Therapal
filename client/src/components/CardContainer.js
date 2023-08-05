import { Grid } from "@mui/material";
import React from "react";

export default function CardContainer(props) {
  return (
    <Grid sx={props.sx} container>
      <Grid item xs={12}>
        {props.title}
      </Grid>
      {props.children}
    </Grid>
  );
}
