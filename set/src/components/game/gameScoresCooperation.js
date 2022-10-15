import { useTheme } from "@emotion/react";
import { Grid, Paper, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import useStyles from "./gameScoreStyles";
import { kolorki } from "../../assets/kolorki"
import { GameContext } from "../gameContext";

function GameScore(props) {
    const theme = useTheme();
    const classes = useStyles();
    const isSmall = useMediaQuery(theme.breakpoints.down("lg"));
    const bigOrSmall = isSmall ? "Small" : "Big";

    const { returnPlayer } = useContext(GameContext);
    const player = returnPlayer();

    return <Grid item xs = {12}>
        <Paper
            className = {classes[`scoreWrap${bigOrSmall}`]}
            sx = {{
                backgroundColor: kolorki[player.colorNumber][500],
                fontFamily: "Prompt",
                borderRadius: "1rem"
            }}
        >
            <div className = {classes[`usernameWrap${bigOrSmall}`]}>
                {props.teamname}
            </div>
            <div className = {classes[`pointsWrap${bigOrSmall}`]}>
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