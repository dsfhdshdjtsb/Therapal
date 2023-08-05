import React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useState } from "react";

function SideBar(props) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        open={true}
        anchor="left"
        sx={{ boxShadow: 5 }}
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
            top: "7.1vh",
          },
        }}
      >
        <Box p={2} width={"15vw"}>
          <Typography variant="h6">SideBar</Typography>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default SideBar;
