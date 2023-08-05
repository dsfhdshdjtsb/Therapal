import { ToggleButton } from "@mui/material";
import React from "react";

export default function TraitToggleButton(props) {
  return (
    <ToggleButton
      sx={{borderRadius:"32px"}}
      value={props.value}
      selected={props.selectedTraits}
      onChange={() => {
        props.dispatchSelectedTraits({
          type: props.value,
          bool: !props.selectedTraits,
        });
      }}
    >{props.children}</ToggleButton>
  );
}

