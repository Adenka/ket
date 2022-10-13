import React, { useState } from "react";

export const ErrorContext = React.createContext();

export function Errors(props) {
    const [ addPlayerError, setAddPlayerError ] = useState("");
    const [ cardNotOnTable, setCardNotOnTable ] = useState(false);
    const [ startNotByHost, setStartNotByHost ] = useState(false)

    return <ErrorContext.Provider
        value = {{
            addPlayerError, setAddPlayerError,
            cardNotOnTable, setCardNotOnTable,
            startNotByHost, setStartNotByHost
        }}
    >
        {props.children}
    </ErrorContext.Provider>
}