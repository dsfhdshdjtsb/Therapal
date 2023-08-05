import { Button } from "@mui/material";
import React from "react";

export default function NavBarButton(props) {
  return (
    <Button
      onClick={props.onClick}
      variant="contained"
      sx={{ bgcolor: "white", minWidth: "8rem", minHeight: "2.5rem", borderRadius: "16px" }}
    >
      {props.children}
    </Button>
  );
}
