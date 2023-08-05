import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

export default function PromptBar() {
  return (
    <Accordion disableGutters={true}>
      <AccordionSummary
        sx={{
          [`& .MuiAccordionSummary-content`]: {
            marginBottom: 0,
          },
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h6" color={"accent.main"}>
          Prompt Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ borderBottom: 2, borderColor: "secondary.main" }}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
