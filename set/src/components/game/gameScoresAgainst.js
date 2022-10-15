import React, { useContext } from "react";
import { Grid, Paper } from "@mui/material";
import "../../assets/fonts.css"
import useStyles from "./gameScoreStyles"
import { kolorki } from "../../assets/kolorki"
import { GameContext } from "../gameContext";

function GameScore(props) {
    const classes = useStyles();
    const { players } = useContext(GameContext);
    const numberOfPlayers = players.length;

    return <Grid item xs = {Math.max(12/numberOfPlayers)}>
        <Paper
            className = {classes.scoreWrap}
            sx = {{
                backgroundColor: kolorki[props.colorNumber][500],
                fontFamily: "Prompt",
                borderRadius: "1rem"
            }}
        >
            <div className = {classes.usernameWrap}>
                {props.username}
            </div>
            <div className = {classes.pointsWrap}>
                {props.points}
            </div>
        </Paper>
    </Grid>;
}

function GameScoresAgainst() {
    const classes = useStyles();
    const { players } = useContext(GameContext);

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
                        username = {player.username}
                        points = {player.points}
                        colorNumber = {player.colorNumber}
                    />
                ))}
            </Grid>
        </div>
    </div>
}

export default GameScoresAgainst;