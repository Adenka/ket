import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import "../../assets/fonts.css";
import { ErrorContext } from "../contexts/errors";

function SnackBar() {
    const {
        isMessageOn, setIsMessageOn,
        currentSeverity,
        currentMessage
    } = useContext(ErrorContext);    

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setIsMessageOn(false);
    }
    
    return <Snackbar
        open = {isMessageOn}
        autoHideDuration = {2000}
        onClose = {handleCloseSnackBar}
    >
        <Alert
            variant = "filled"
            severity = {currentSeverity}
            sx = {{fontFamily: "Prompt", fontSize: "1rem", letterSpacing: "0.125rem"}}
        >
            {currentMessage}
        </Alert>
    </Snackbar>
}

export default SnackBar;