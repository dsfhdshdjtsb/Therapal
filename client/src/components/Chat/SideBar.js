import React from "react";
import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { useState } from "react";

function SideBar(props) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        open={true}
        anchor="left"
        sx={{ boxShadow: 5, overflow: "scroll" }}
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
            height: "73vh",
            top: "7vh",
          },
        }}
      >
        <Box p={2} pb={0} width={"15vw"} textAlign={"center"}>
          <Typography variant="h6" sx={{ color: "accent.main" }}>
            Instructions
          </Typography>
          <Divider
            sx={{ backgroundColor: "accent.main", marginBottom: "5%" }}
          />
        </Box>
        <Box pl={2} pr={2} width={"15vw"} textAlign={"left"}>
          <Typography textAlign={"left"} variant="body1">
            Discuss the question with your chat partner. Share your thoughts,
            experiences, and opinions openly. Feel free to take turns or discuss
            simultaneously with your chat partner.
          </Typography>
          <br />
          <Typography textAlign={"left"} variant="body1">
            When you're ready to explore a new topic, simply press the "Generate
            Question" button. Our chatbot, powered by AI, will process your
            ongoing conversation and generate a new question based on your
            discussion.
          </Typography>
        </Box>
        <Box p={2} width={"15vw"} textAlign={"center"}>
          <Typography variant="h6" sx={{ color: "accent.main" }}>
            Rules
          </Typography>
          <Divider
            sx={{ backgroundColor: "accent.main", marginBottom: "5%" }}
          />
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default SideBar;
