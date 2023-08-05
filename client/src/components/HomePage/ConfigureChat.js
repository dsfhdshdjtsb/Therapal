import React, { useReducer } from "react";
import CardContainer from "./CardContainer";
import AccountCircle from "@mui/icons-material/AccountCircle";

import {
  Grid,
  InputAdornment,
  TextField,
  Button,
  ToggleButton,
  Typography,
} from "@mui/material";
import TraitToggleButton from "./TraitToggleButton";
import { Link } from "react-router-dom";

const stateReducer = (state, action) => {
  const key = action.type;
  const obj = { ...state };
  obj[key] = action.bool;
  console.log(key);
  console.log(obj);
  return obj;
};

export default function ConfigureChat() {
  const [selectedTraits, dispatchSelectedTraits] = useReducer(stateReducer, {
    depression: false,
    anxiety: false,
    ptsd: false,
    ed: false,
    addiction: false,
    stress: false,
  });

  return (
    <CardContainer height="45vh" width="35%" title="New Chat">
      <Grid item xs={6}>
        <TextField
          id="display-name"
          placeholder="Display name"
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
          sx={{ margin: "20% auto", fieldset: { borderColor: "accent.main" } }}
        />
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={1} sx={{margin: "10% auto"}}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{textAlign: "left"}}>
              Select a trait to be matched to others with!
            </Typography>
          </Grid>
          <Grid item>
            <TraitToggleButton
              value="depression"
              selectedTraits={selectedTraits.depression}
              dispatchSelectedTraits={dispatchSelectedTraits}
            >
              Depression
            </TraitToggleButton>
          </Grid>
          <Grid item>
            <TraitToggleButton
              value="anxiety"
              selectedTraits={selectedTraits.anxiety}
              dispatchSelectedTraits={dispatchSelectedTraits}
            >
              Anxiety
            </TraitToggleButton>
          </Grid>
          <Grid item>
            <TraitToggleButton
              value="ptsd"
              selectedTraits={selectedTraits.ptsd}
              dispatchSelectedTraits={dispatchSelectedTraits}
            >
              PTSD
            </TraitToggleButton>
          </Grid>
          <Grid item>
            <TraitToggleButton
              value="ed"
              selectedTraits={selectedTraits.ed}
              dispatchSelectedTraits={dispatchSelectedTraits}
            >
              Eating Disorder
            </TraitToggleButton>
          </Grid>
          <Grid item>
            <TraitToggleButton
              value="addiction"
              selectedTraits={selectedTraits.addiction}
              dispatchSelectedTraits={dispatchSelectedTraits}
            >
              Addiction
            </TraitToggleButton>
          </Grid>
          <Grid item>
            <TraitToggleButton
              value="stress"
              selectedTraits={selectedTraits.stress}
              dispatchSelectedTraits={dispatchSelectedTraits}
            >
              Stress
            </TraitToggleButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid justifyContent="center" item xs={12} sx={{borderTop:2, padding: "5% 0 0 0", borderColor:"secondary.main"}}>
      <Link to="/test"><Button
          variant="contained"
          sx={{
            bgcolor: "primary.main",
            minWidth: "10rem",
            minHeight: "2.5rem",
            borderRadius: "16px",
          }}
        >
          New Chat
        </Button>
        </Link>
      </Grid>
    </CardContainer>
  );
}
