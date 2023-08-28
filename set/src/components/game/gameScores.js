import React from "react";
import { Grid } from "@mui/material";
import GameScore from "./gameScore";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flex: 1,
        alignItems: "end",
        height: "100%",
    },

    gridWrap: {
        backgroundColor: "white",
        padding: "min(1rem, 2vw)",
        borderRadius: "min(2rem, 4vw)",
        width: "100%"
    },

    scoresWrap: {
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
    },
})

const GameScores = ({players}) => {
    const classes = useStyles();

    return <div className = {classes.root}>
        <div className = {classes.gridWrap}>
            <Grid
                container
                spacing = {2}
                className = {classes.scoresWrap}
                classes = {{root: classes.scoresWrap}}
            >
                {players.map((player, index) => (
                    <GameScore
                        key = {index}
                        text = {player.username}
                        points = {player.points}
                        colorNumber = {player.colorNumber}
                        numberOfPlayers = {players.length}
                    />
                ))}
            </Grid>
        </div>
    </div>
}
export default GameScores;