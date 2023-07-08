import React from "react";
import BestTimes from "./bestTimes";
import { Typography } from "@mui/material";

const TempTypography = () => {
    return <Typography
        variant = "h4"
        fontFamily = "Architects Daughter"
        sx = {{height: 65, margin: "1rem"}}
    >
        Comin soohn!
    </Typography>
}

const ScoresWrapper = ({tabNumber}) => {
    const Component =
        tabNumber === 0
        ? BestTimes
        : () => TempTypography()
    
    return <Component/>
}

export default ScoresWrapper;