import React, { useState } from "react";

export const ErrorContext = React.createContext();

export function Errors(props) {
    const [ isMessageOn, setIsMessageOn ] = useState(false);
    const [ currentMessage, setCurrentMessage ] = useState("");
    const [ currentSeverity, setCurrentSeverity] = useState("");

    const setSnackbar = (message, severity) => {
        setIsMessageOn(true);
        setCurrentMessage(message);
        setCurrentSeverity(severity);
    }

    return <ErrorContext.Provider
        value = {{
            isMessageOn, setIsMessageOn,
            currentMessage, setCurrentMessage,
            currentSeverity, setCurrentSeverity,
            setSnackbar
        }}
    >
        {props.children}
    </ErrorContext.Provider>
}