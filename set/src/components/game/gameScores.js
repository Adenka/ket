import React from "react";
import { Grid } from "@mui/material";
import GameScore from "./gameScore";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flex: 1,
        height: "100%",
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
}
export default GameScores;