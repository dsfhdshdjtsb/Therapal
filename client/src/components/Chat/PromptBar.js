import React from "react";

import { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";

function PromptBar() {
  const [isPromptBarOpen, setIsPromptBarOpen] = useState(false);

  return (
    <React.Fragment>
      <Button 
        onClick={() => {
          setIsPromptBarOpen(true);
        }}
      >
        CLICK ME
      </Button>
      <Drawer
        anchor="bottom"
        open={isPromptBarOpen}
        sx={{ boxShadow: 5, bottom: "30vh"}}
        ModalProps={{
          slots: {
            backdrop: "div",
          },
          slotProps: {
            root: {
              style: {
                position: "absolute",
                top: "unset",
                bottom: "unset",
                left: "unset",
                right: "unset",
              },
            },
          },
        }}
        PaperProps={{
          sx: {
            height: "10vh",
          },
        }}
      >
        <Box p={2} width={"15vw"}>
          <Button
            onClick={() => {
              setIsPromptBarOpen(false);
            }}
          >
            CLOSE ME
          </Button>
          <Typography variant="h6">PromptBar</Typography>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default PromptBar;
