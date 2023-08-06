import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

export default function PromptBar(props) {

  return (
    <Accordion
      disableGutters={true}
      sx={{
        backgroundColor: "primary.main",
        position: "fixed",
        left: "18vw",
        width: "82%",
      }}
    >
      <AccordionSummary
        sx={{
          [`& .MuiAccordionSummary-content`]: {
            marginBottom: "5px",
            display: "flex",
            justifyContent: "center",
          },
          borderRight: 1,
          borderColor: "secondary.main",
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h6" color={"accent.main"}>
          TheraPal Prompt
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRight: 1,
          borderColor: "secondary.main",
        }}
      >
        <Typography variant="subtitle1" textAlign={"center"}>
          {props.prompt}
        </Typography>
        <Button
          variant="contained"
          sx={{
            position: "relative",
            bgcolor: "white",
            maxWidth: "20rem",
            minHeight: "2.5rem",
            borderRadius: "16px",
            margin: "1% auto",
          }}
          onClick={() => {
            props.getGpt();
          }}
        >
          Generate new TheraPal prompt
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}
