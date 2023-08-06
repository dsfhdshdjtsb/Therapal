import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  Modal,
  Toolbar,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { useState, useRef } from "react";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import { styled } from "@mui/material";

const Responsive = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "23vw",
    [`& .MuiDrawer-paper`]: {
      width: "23vw",
    },
  },
  [theme.breakpoints.down("lg")]: {
    width: "27vw",
    [`& .MuiDrawer-paper`]: {
      width: "27vw",
    },
  },
}));

function SideBar(props) {
  const [open, setOpen] = useState(false);
  const [reportMessage, setReportMessage] = useState("");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Responsive>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              boxShadow: 6,
              backgroundColor: "white",
              padding: "1%",
              color: "accent.main",
              margin: "15vh auto",
              borderRadius: "8px",
              border: 2,
              borderColor: "secondary.main",
              textAlign: "center",
              height: "20vh",
              width: "20%",
              fontFamily: "inherit",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "5%" }}
            >
              Report
            </Typography>
            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              onSubmit={e => {
                e.preventDefault();
                props.sendReport(reportMessage);
                handleClose();
              }}
            >
              <TextField
                id="reportMessage"
                label="Enter your message (optional)"
                value={reportMessage}
                onChange={() => {
                  setReportMessage(
                    document.getElementById("reportMessage").value
                  );
                }}
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                color="accent"
                size="large"
                sx={{ marginBottom: "2%" }}
              />
              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  alignSelf: "center",
                  padding: "1.5rem",
                  fontSize: "1rem",
                  position: "relative",
                  bgcolor: "primary.main",
                  whiteSpace: "nowrap",
                  minWidth: "3rem",
                  maxHeight: "2rem",
                  borderRadius: "16px",
                  margin: "5px 0 0 2%",
                }}
              >
                Send
              </Button>
            </form>
          </Box>
        </Modal>
        <Drawer
          open={true}
          anchor="left"
          variant="permanent"
          sx={{
            overflowY: "auto",
            flexShrink: 0,
            width: "18vw",
            height: "100%",
            [`& .MuiDrawer-paper`]: {
              boxShadow: 2,
              width: "18vw",
              height: "100%",
              boxSizing: "border-box",
              borderRight: 2,
              borderColor: "secondary.main",
            },
          }}
        >
          <Toolbar />
          <Box p={2} pb={0} textAlign={"center"}>
            <Typography variant="h6" sx={{ color: "accent.main" }}>
              Instructions
            </Typography>
            <Divider
              sx={{ backgroundColor: "accent.main", marginBottom: "5%" }}
            />
          </Box>
          <Box pl={2} pr={2} textAlign={"left"}>
            <Typography textAlign={"left"} variant="body1">
              You have been matched with a chat partner with similar issues.
              Share your thoughts, experiences, and opinions openly. If you want
              an icebreaker or opening prompt, simply generate a prompt using
              Therapal. Feel free to take turns or discuss simultaneously with
              your chat partner.
            </Typography>
            <br />
            <Typography textAlign={"left"} variant="body1">
              When you're ready to explore a new topic, simply press the
              "Generate Question" button. Our chatbot, powered by AI, will
              process your ongoing conversation and generate a new question
              based on your discussion.
            </Typography>
          </Box>
          <Box p={1} textAlign={"center"}>
            <Typography variant="h6" sx={{ color: "accent.main" }}>
              Rules
            </Typography>
            <Divider sx={{ backgroundColor: "accent.main" }} />
          </Box>
          <List>
            <ListItem sx={{ paddingBottom: 0.5 }}>
              <Typography variant="body1">
                1. Respect and Empathy: Be kind and understanding.
              </Typography>
            </ListItem>
            <ListItem sx={{ paddingBottom: 0.5 }}>
              <Typography variant="body1">
                2. Active Listening: Listen without interrupting.
              </Typography>
            </ListItem>
            <ListItem sx={{ paddingBottom: 0.5 }}>
              <Typography variant="body1">
                3. Seek Professional Help if Necessary: Consider professional
                support.
              </Typography>
            </ListItem>
            <ListItem sx={{ paddingBottom: 0.5 }}>
              <Typography variant="body1">
                4. Stay Open-Minded: Be willing to learn from each other.
              </Typography>
            </ListItem>
            <ListItem sx={{ paddingBottom: 0.5 }}>
              <Typography variant="body1">
                5. Respect and Empathy: Be kind and understanding.
              </Typography>
            </ListItem>
          </List>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              fontSize: "1rem",
              position: "relative",
              bgcolor: "primary.main",
              maxWidth: "15rem",
              minHeight: "2.5rem",
              borderRadius: "16px",
              margin: "2% auto",
            }}
          >
            <FlagCircleIcon sx={{ marginRight: "5%", color: "accent.main" }} />
            Report
          </Button>
        </Drawer>
      </Responsive>
    </React.Fragment>
  );
}

export default SideBar;
