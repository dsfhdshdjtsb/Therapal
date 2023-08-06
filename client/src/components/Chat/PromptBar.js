import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { useState } from "react";

export default function PromptBar(props) {
  const [prompt, setPrompt] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at felis non turpis scelerisque gravida. Suspendisse potenti. Proin sodales arcu id nunc tempus porttitor. ");

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
          Your Prompt
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
        <Typography value={prompt} variant="subtitle1" textAlign={"center"}>
          {prompt}
        </Typography>
        <Button
          variant="contained"
          sx={{
            position: "relative",
            bgcolor: "white",
            maxWidth: "15rem",
            minHeight: "2.5rem",
            borderRadius: "16px",
            margin: "1% auto",
          }}
          onClick={() => {
            props.getGpt();
          }}
        >
          Generate new prompt
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}
