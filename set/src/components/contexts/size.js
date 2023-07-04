import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

export const SizeContext = React.createContext();

export function Size(props) {
    const theme = useTheme();
    const [ isSmall, setIsSmall ] = React.useState(useMediaQuery(theme.breakpoints.down("md")));

    return <SizeContext.Provider value = {{ isSmall }}>
        {props.children}
    </SizeContext.Provider>
}