import { Grid, Box, Typography } from "@mui/material";
import React from "react";

export default function CardContainer(props) {
  return (
    <Box sx={{ boxShadow: 6, backgroundColor:"white", padding: "1%", color: "accent.main", margin: "10vh auto", borderRadius: "8px", border: 2, borderColor: "secondary.main", textAlign: "center", height:props.height, width:props.width, fontFamily: "inherit"}}>
      <Grid container>
        <Grid item xs={12} sx={{borderBottom:2, padding: "0 0 1% 0", borderColor: "secondary.main"}}>
          <Typography variant="h5" sx={{fontWeight: "bold", color: "accent.main"}}>{props.title}</Typography>
        </Grid>
        {props.children}
      </Grid>
    </Box>
  );
}
