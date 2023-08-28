import React from "react";
import { Grid, Paper } from "@mui/material";
import { kolorki } from "../../assets/kolorki"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    scoreWrap: {
        padding: "min(1.25rem, 2.5vw)",
        display: "flex",
        flexGrow: 1,
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

const GameScore = ({numberOfPlayers, colorNumber, text, points}) => {
    const classes = useStyles();

    return <Grid item xs = {Math.max(12/numberOfPlayers)}>
        <Paper
            className = {classes.scoreWrap}
            sx = {{
                backgroundColor: kolorki[colorNumber][500],
                fontFamily: "Prompt",
                borderRadius: "1rem"
            }}
        >
            <div className = {classes.usernameWrap}>{text}</div>
            <div className = {classes.pointsWrap}>{points}</div>
        </Paper>
    </Grid>;
}
export default GameScore;