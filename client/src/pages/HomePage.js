import React from "react";

import NavBar from "../components/NavBar";
import CardContainer from "../components/CardContainer";
import firebase from "../firebase";
import "firebase/compat/firestore";

const firestore = firebase.firestore();

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


