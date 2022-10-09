import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flex: 1,
        width: "95vw",
        alignItems: "end",
        paddingBottom: "2rem"
    },

    gridWrap: {
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "2rem",
        width: "100%"
    },

    scoresWrap: {
        //padding: "1rem",
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
    },

    //GameScore

    scoreWrapBig: {
        padding: "1.25rem",
        display: "flex",
    },

    scoreWrapSmall: {
        padding: "0.5rem",
        display: "flex"
    },

    usernameWrapBig: {
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        fontSize: "1.5rem"
    },

    usernameWrapSmall: {
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        fontSize: "1rem"
    },

    pointsWrapBig: {
        display: "flex",
        width: "3rem",
        justifyContent: "right",
        fontSize: "2rem"
    },

    pointsWrapSmall: {
        display: "flex",
        width: "3rem",
        justifyContent: "right",
        fontSize: "1.25rem"
    }

})

export default useStyles;
