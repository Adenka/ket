import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flex: 1,
        width: "95vw",
        alignItems: "end",
        paddingBottom: "2rem",
        height: "100%"
    },

    gridWrap: {
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "2rem",
        width: "100%"
    },

    scoresWrap: {
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
    },

    //GameScore

    scoreWrap: {
        padding: "min(1.25rem, 2.5vw)",
        display: "flex",
    },

    usernameWrap: {
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        fontSize: "min(1.5rem, 3vw)"
    },

    pointsWrap: {
        display: "flex",
        width: "3rem",
        justifyContent: "right",
        fontSize: "min(2rem, 4vw)"
    },
})

export default useStyles;
