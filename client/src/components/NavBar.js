import React from "react";
import { AppBar, Toolbar, Typography} from "@mui/material"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function NavBar(){

    return <AppBar position="static">
        <Toolbar>
            <Typography variant="h1">Therapal</Typography>
        </Toolbar>
    </AppBar>
}