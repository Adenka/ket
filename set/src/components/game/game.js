import React, { useContext } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { cyan } from "@mui/material/colors";
import "../../assets/fonts.css"
import GameScoresCooperation from "./gameScoresCooperation.js";
import GameScoresAgainst from "./gameScoresAgainst.js";
import { GameContext } from "../contexts/gameContext.js";
import PostGameDialog from "./postGameDialog.js";
import { useTheme } from "@emotion/react";
import GameTopMenu from "./gameTopMenu.js";
import CardWrap from "./cardWrap.js";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100vw",
        minHeight: "100vh",

        display: "flex",
        alignItems: "center",
        flexDirection: "column",

        backgroundImage: `radial-gradient(bottom left, ${cyan[50]} 45%, ${cyan["A100"]} 75%, ${cyan[100]})`,
    },

    bottomStuffWrap: {
        display: "flex",
        backgroundColor: "white",
        padding: "min(1rem, 2vw)",
        borderRadius: "min(2rem, 4vw)",
        width: "calc(100% - 2*min(1rem, 2vw))",
        gap: "min(1rem, 2vw)",
        position: "absolute",
        margin: "min(1rem, 2vw)",
        bottom: 0,
    },
}));

const PracticeModeButton = () => {
    const theme = useTheme();
    const { findAndSetHelperSet } = useContext(GameContext);

    return <Button
            variant="contained"
            sx={{
                background:
                    `linear-gradient(60deg,
                        ${theme.palette.error.main} 0%,
                        #ec407a 35%,
                        #f48fb1 100%)`,
                fontSize: "min(1.35rem, 3vw)",
                color: theme.palette.secondary.veryLight,
                fontFamily: "Prompt",
                borderRadius: "min(1rem, 2vw)",
                fontWeight: "bold",
                letterSpacing: "0.15rem",
                maxWidth: "25vw",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
            }}
            onClick={() => findAndSetHelperSet()}
        >
            Plz help
        </Button>
}

const Game = () => {
    const classes = useStyles();
    const { isGameOver, gamemode } = useContext(GameContext);
    const practiceMode = localStorage.getItem("practiceMode") === "true";

    let GameScores = null;

    if (gamemode === "Cooperation") {
        GameScores = GameScoresCooperation;
    }
    else if (gamemode === "Against" || gamemode === "Singleplayer") {
        GameScores = GameScoresAgainst;
    }

    return <div className = {classes.root}>
        <PostGameDialog open = {isGameOver}/>
        <GameTopMenu/>
        <CardWrap/>
        <div className={classes.bottomStuffWrap}>
            <GameScores/>
            {practiceMode && gamemode === "Singleplayer"
            ? <PracticeModeButton/>
            : <></>}
        </div>
    </div>
}

export default Game;