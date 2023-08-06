import React from "react";
import { Box, Grid, Typography } from "@mui/material";

export default function HistoryCard(props) {
  return (
    <Box
      sx={{
        boxShadow: 6,
        backgroundColor: "white",
        padding: "10px",
        color: "accent.main",
        borderRadius: "8px",
        border: 2,
        borderColor: "secondary.main",
        textAlign: "center",
        height: props.height,
        width: props.width,
        fontFamily: "inherit",
        margin: "0 2% 2% 0"
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            borderBottom: 2,
            borderColor: "secondary.main",
          }}
        >
          <Typography
            variant="h6"
            sx={{color: "accent.main", textTransform:"none" }}
          >
            {props.name}
          </Typography>
        </Grid>
        {props.children}
      </Grid>
    </Box>
  );
}
