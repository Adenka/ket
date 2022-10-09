import { Alert, Snackbar } from "@mui/material";
import React from "react";
import "../assets/fonts.css";

function SnackBar(props) {
    return <Snackbar open = {props.open} autoHideDuration = {2000} onClose = {props.onClose}>
        <Alert
            variant = "filled"
            severity = {props.severity}
            sx = {{fontFamily: "Prompt", fontSize: "1rem", letterSpacing: "0.125rem"}}
        >
            {props.text}
        </Alert>
    </Snackbar>
}

export default SnackBar;