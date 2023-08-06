import React from "react";

import NavBar from "../components/NavBar";
import ConfigureChat from "../components/HomePage/ConfigureChat";
import { Typography, Toolbar } from "@mui/material";
import {useMediaQuery} from "@mui/material";

export default function HomePage() {
  const md = !useMediaQuery(theme=>theme.breakpoints.up("md"));
  return (
    <React.Fragment>
      <NavBar />
      <Toolbar/>
      {
        md && <Typography color="error.main" variant="h5">Your viewport is too small for this application, certain components may be broken or look broken</Typography>
      }
      <ConfigureChat/>
    </React.Fragment>
  );
}


