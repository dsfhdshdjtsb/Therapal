import React from "react";
import NavBar from "../components/NavBar";
import CardContainer from "../components/CardContainer";

export default function HomePage() {
  return (
    <React.Fragment>
      <NavBar />
			<CardContainer title="Test">
				Hi
			</CardContainer>
    </React.Fragment>
  );
}
