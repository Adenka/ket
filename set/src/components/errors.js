import React, { useState } from "react";

export const ErrorContext = React.createContext();

export function Errors(props) {
    const [ isMessageOn, setIsMessageOn ] = useState(false);
    const [ currentMessage, setCurrentMessage ] = useState("");
    const [ currentSeverity, setCurrentSeverity] = useState("");

    /*const [ addPlayerError, setAddPlayerError ] = useState("");
    const [ cardNotOnTable, setCardNotOnTable ] = useState("");
    const [ startNotByHost, setStartNotByHost ] = useState("")*/

    return <ErrorContext.Provider
        value = {{
            isMessageOn, setIsMessageOn,
            currentMessage, setCurrentMessage,
            currentSeverity, setCurrentSeverity
        }}
    >
        {props.children}
    </ErrorContext.Provider>
}