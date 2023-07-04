import { Grid, Paper } from "@mui/material";
import React, { useContext } from "react";
import useStyles from "./gameScoreStyles";
import { kolorki } from "../../assets/kolorki"
import { GameContext } from "../contexts/gameContext";

function GameScore(props) {
    const classes = useStyles();

    const { returnPlayer } = useContext(GameContext);
    const player = returnPlayer();

    return <Grid item xs = {12}>
        <Paper
            className = {classes.scoreWrap}
            sx = {{
                backgroundColor: kolorki[player.colorNumber][500],
                fontFamily: "Prompt",
                borderRadius: "1rem"
            }}
        >
            <div className = {classes.usernameWrap}>
                {props.teamname}
            </div>
            <div className = {classes.pointsWrap}>
                {props.points}
            </div>
        </Paper>
    </Grid>
}

function GameScoresCooperation() {
    let totalPoints = 0;
    const { players } = useContext(GameContext);
    const classes = useStyles();

    //TODO - players leave with their points!
    Object.values(players).map(player => totalPoints += player.points);

    return <div className = {classes.root}>
        <div className = {classes.gridWrap}>
            <Grid
                container
                spacing = {2}
                className = {classes.scoresWrap}
                classes = {{root: classes.scoresWrap}}
            >
                <GameScore
                    teamname = "Fuzzzd Kittehz"
                    points = {totalPoints}
                />
            </Grid>
        </div>
    </div>
}

export default GameScoresCooperation;