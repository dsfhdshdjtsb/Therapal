import React, { useReducer } from "react";
import CardContainer from "../components/CardContainer";
import AccountCircle from "@mui/icons-material/AccountCircle";

import {
  Grid,
  InputAdornment,
  TextField,
  Button,
  ToggleButton,
} from "@mui/material";

const stateReducer = (state, action) => {
  const key = action.type;
  const obj = {...state}
  obj[key] = action.bool
  return obj;
};

export default function ConfigureChat() {
  const [selectedTraits, dispatchSelectedTraits] = useReducer(stateReducer, {
    depression: false,
    anxiety: false,
    ptsd: false,
    ed: false,
    insomnia: false,
    addiction: false,
    stress: false,
  });

  return (
    <CardContainer height="50vh" width="40%" title="New Chat">
      <Grid item xs={6}>
        <TextField
          id="display-name"
          label="Enter display name"
          variant="outlined"
          color="accent"
          size="large"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          sx={{ margin: "40% auto", fieldset: { borderColor: "accent.main" } }}
        />
      </Grid>
      <Grid item xs={6}>
        {/*Depression, anxiety, ptsd, eating disorders, insomnia, addiction, stress */}
        <Grid container>
          <ToggleButton
            value="depression"
            onChange={() => {
              dispatchSelectedTraits({ type:"depression", bool: !selectedTraits.value });
            }}
          >Depression</ToggleButton>
        </Grid>
      </Grid>
      <Grid justifyContent="center" item xs={12}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            minWidth: "10rem",
            minHeight: "2.5rem",
            borderRadius: "8px",
          }}
        >
          New Chat
        </Button>
      </Grid>
    </CardContainer>
  );
}
