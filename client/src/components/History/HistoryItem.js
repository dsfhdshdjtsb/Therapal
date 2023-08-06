import React from "react";
import HistoryCard from "./HistoryCard";
import { Grid, Typography, Button } from "@mui/material";
export default function HistoryItem(props) {
  return (
    <HistoryCard name={props.name} width={props.width} height={props.height}>
      <Grid item xs={12} sx={{margin: "5% 5% 5% 0"}}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "regular", fontSize: "0.8rem" }}
        >
          {props.date}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{margin: "1% 0 1% 0"}}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "primary.main",
            borderRadius: "16px",
          }}
        >
          View Chat
        </Button>
      </Grid>
    </HistoryCard>
  );
}
