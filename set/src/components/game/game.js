import React, { useContext } from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Card from "./card.js"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Timer from "./timer.js";
import{ ReactComponent as CardIcon} from "../../assets/cardIcon.svg"
import { cyan } from "@mui/material/colors";
import "../../assets/fonts.css"
import GameScoresCooperation from "./gameScoresCooperation.js";
import GameScoresAgainst from "./gameScoresAgainst.js";
import { GameContext } from "../contexts/gameContext.js";
import PostGameDialog from "./postGameDialog.js";
import { SizeContext } from "../contexts/size.js";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100vw",
        minHeight: "100vh",

        display: "flex",
        alignItems: "center",
        flexDirection: "column",

        backgroundImage: `radial-gradient(bottom left, ${cyan[50]} 45%, ${cyan["A100"]} 75%, ${cyan[100]})`,
    },

    cardWrap: {
        width: "100vw",
        height: "calc(100vh - 88px - 10rem)",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    cards: {
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
    },

    cardsBig: {
        flexDirection: "column",
        height: "calc(100vh - 10rem - 88px)",
        width: "100%",
        margin: "1.5rem",
    },

    cardsSmall: {
        height: "100%",
        width: "100%",
        margin: "0.5rem"
    },
}));

const CardsLeft = () => {
    const { cardsLeft } = useContext(GameContext);

    return <div style = {{display: "flex", alignContent: "center", justifyContent: "center", width: "min(16vw, 10rem)"}}>
        <CardIcon/>
        <div
            style = {{
                display: "flex",
                alignItems: "center",
                fontSize: "min(6.25vw, 2.5rem)",
                marginLeft: "min(2vw, 1.25rem)"
            }}
        >
            {cardsLeft}
        </div>
    </div>
}

const GameTopMenu = () => {
    const { leave } = useContext(GameContext);

    return <AppBar
        position = "static"
        sx = {{
            height: "5.5rem",
            display: "flex",
            justifyContent: "center",
        }}
    >
        <Toolbar>
            <div style = {{width: "min(16vw, 10rem)"}}>
            <IconButton>
                <ArrowBackIcon fontSize = "large" color = "black" onClick = {leave}/>
            </IconButton>
            </div>
            <div
                style = {{
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    height: "4rem"
                }}
            >
                <Timer/>
            </div>
            <CardsLeft/>
        </Toolbar>
    </AppBar>
}

const Game = () => {
    const classes = useStyles();
    const { cardsOnTable, isGameOver, gamemode, cardOnClick } = useContext(GameContext);
    const { isSmall } = useContext(SizeContext);

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
        <div className = {classes.cardWrap}>
            <div className = {clsx(classes.cards, isSmall ? classes.cardsSmall : classes.cardsBig)}>
            {cardsOnTable.map(card =>
                <Card cardObject = {card} onClick = {() => cardOnClick(card.name)} />
            )}
            </div>
        </div>
        <GameScores/>
    </div>
}

export default Game;