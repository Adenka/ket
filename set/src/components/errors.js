import React, { useState } from "react";

export const ErrorContext = React.createContext();

export function Errors(props) {
    const [ addPlayerError, setAddPlayerError ] = useState("");
    const [ cardNotOnTable, setCardNotOnTable ] = useState(false);

    return <ErrorContext.Provider
        value = {{
            addPlayerError, setAddPlayerError,
            cardNotOnTable, setCardNotOnTable
        }}
    >
        {props.children}
    </ErrorContext.Provider>
}