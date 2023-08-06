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
    <Accordion disableGutters={true} sx={{ backgroundColor: "primary.main", position:"fixed", left: "18vw", width:"82%"}}>
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
        <Typography variant="subtitle1" textAlign={"center"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
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
            console.log("clicked");
            props.genPrompt();
          }}
        >
          Generate new prompt
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}
