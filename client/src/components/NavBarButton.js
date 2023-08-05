import { Button } from "@mui/material";
import React from "react";

export default function NavBarButton(props) {
  return (
    <Button
      variant="contained"
      sx={{ bgcolor: "white", minWidth: "8rem", minHeight: "2.5rem" }}
    >
      {props.children}
    </Button>
  );
}
