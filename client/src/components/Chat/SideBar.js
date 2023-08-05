import React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useState } from "react";

function SideBar(props) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setIsSideBarOpen(true);
        }}
      >
        CLICK ME
      </Button>
      <Drawer anchor="left" open={isSideBarOpen}>
        <Box p={2} width={"15vw"}>
          <Button 
            onClick={() => {
              setIsSideBarOpen(false);
            }}
          >
            CLOSE ME
          </Button>
          <Typography variant="h6">SideBar</Typography>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default SideBar;
