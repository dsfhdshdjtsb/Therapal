import React from "react";
import NavBar from "../components/NavBar";
import ConfigureChat from "../components/ConfigureChat";

export default function HomePage() {
  return (
    <React.Fragment>
      <NavBar />
      <ConfigureChat/>
    </React.Fragment>
  );
}
