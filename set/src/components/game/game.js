import React, { useContext, useEffect } from "react";
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Card from "./card.js"
import { useTheme } from "@emotion/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Timer from "./timer.js";
import{ ReactComponent as CardIcon} from "../../assets/cardIcon.svg"
import { cyan } from "@mui/material/colors";
import "../../assets/fonts.css"
import GameScoresCooperation from "./gameScoresCooperation.js";
import GameScoresAgainst from "./gameScoresAgainst.js";
import { GameContext } from "../gameContext.js";
import { Navigate, useNavigate } from "react-router-dom";

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

    //PostGameDialog

    resultImg: {
        position: "relative",
        display: "flex",
        justifyContent: "center"
    },

    result: {
        position: "absolute",
        top: "1rem",
        fontFamily: "Prompt",
        fontSize: "4rem",
        letterSpacing: "0.5rem",
        color: theme.palette.error.main
    },

    timeWrap: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        fontFamily: "Prompt",
        fontSize: "2rem",
        marginTop: "1rem",
        padding: "1rem",
        backgroundColor: theme.palette.secondary.light,
    },

    time: {
        display: "flex",
        justifyContent: "center",
        fontSize: "3rem",
        color: theme.palette.error.main
    }
}));

function CardsLeft() {
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

function GameTopMenu() {
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

function TableCellNicknames(props) {
    const theme = useTheme();

    return <TableCell
        align = "center"
        sx = {{
            fontFamily: "Prompt",
            fontSize: "1rem",
            backgroundColor: theme.palette.secondary.main
        }}
    >
        {props.text}
    </TableCell>
}

function TableCellResults(props) {
    const theme = useTheme();
    return <TableCell
        align = "center"
        sx = {{
            fontFamily: "Prompt",
            fontSize: "1.5rem",
            backgroundColor: theme.palette.secondary.light
        }}
    >
        {props.text}
    </TableCell>
}

const WinImage = <img
    alt = "smiling kittehz"
    src = {require("../../assets/smile.jpg")}
    style = {{width: "100%"}}
/>

const LoseImage = <img
    alt = "sadge kittehz"
    src = {require("../../assets/sadge.jpg")}
    style = {{width: "100%"}}
/>

function DialogContentCooperation() {
    const classes = useStyles();
    const { gameStartTime, gameOverTime } = useContext(GameContext);
    const time = (gameOverTime - gameStartTime) / 100;
    const minutes = Math.floor(time / 600);
    const seconds = Math.floor(time / 10) % 60;
    const milliseconds = Math.floor((time) % 10);

    return <DialogContent>
        <div className = {classes.resultImg}>
            <div className = {classes.result}>
                U won!
            </div>
            {WinImage}
        </div>
        <div className = {classes.timeWrap}>
            <div style = {{ display: "flex", justifyContent: "center" }}>
                U clickd all cardz in
            </div>
            <div className = {classes.time}>
                {(minutes < 10 ? "0" : "") + minutes} : {("0" + seconds).slice(-2)} . {milliseconds}
            </div>
        </div>
    </DialogContent>
}

function DialogContentAgainst() {
    const classes = useStyles();
    const { players, returnPlayer } = useContext(GameContext);

    function isPlayerWinner() {
        let max = 0, winners = [];
        players.forEach(player => {
            if (player.points > max) {
                max = player.points;
                winners = [player.playerId];
            }
            else if (player.points === max) {
                winners.push(player.playerId);
            }
        });
        
        console.log("player id: ", returnPlayer().playerId);
        console.log("winnersRes: ", winners);
        const isWinner = winners.some(id => returnPlayer().playerId === id);
        console.log("isWinner: ", isWinner);
    
        return isWinner;
    }

    const isWinner = isPlayerWinner();

    return <DialogContent>
        <div className = {classes.resultImg}>
            <div className = {classes.result}>
                {isWinner ? "U won!" : "U lost..."}
            </div>
            {isWinner ? WinImage : LoseImage}
        </div>
        <TableContainer component = {Paper} sx = {{marginTop: "1rem"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        {players.map(player => (
                            <TableCellNicknames text = {player.username} />
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {players.map(player => (
                            <TableCellResults text = {player.points} />
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </DialogContent>
}

function PostGameDialog(props) {
    const { gamemode, rematch, leave } = useContext(GameContext);

    function handleKeyPressed(event) {
        if (event.key === "Enter") {
            rematch();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPressed)

        return () => {
            window.removeEventListener("keydown", handleKeyPressed);
        }
    }, [])

    let DialogContent = null;

    if (gamemode === "Cooperation" || gamemode === "Singleplayer") {
        DialogContent = DialogContentCooperation;
    }
    else if (gamemode === "Against") {
        DialogContent = DialogContentAgainst;
    }

    return <Dialog
        open = {props.open} 
        onClose = {props.onClose}
        fullWidth maxWidth = "sm"
    >
        <DialogTitle sx = {{fontSize: "2.5rem", fontFamily: "Prompt"}}>
            Game ovar!
        </DialogTitle>
        <DialogContent/>
        <DialogActions>
            <Button
                sx = {{padding: "1rem", margin: "0.5rem", fontSize: "1.25rem"}}
                onClick = {leave}
            >
                Leef
            </Button>
            <Button
                sx = {{padding: "1rem", margin: "0.5rem", fontSize: "1.25rem"}}
                onClick = {rematch}
                variant = "contained"
            >
                Pulay again
            </Button>
        </DialogActions>
    </Dialog>
}

function Game() {
    const theme = useTheme();
    const classes = useStyles();
    const { cardsOnTable, isGameOver, gamemode, cardOnClick } = useContext(GameContext);
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));

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
                <Card
                    key = {card.name}

                    amount = {card.number}
                    color = {card.color}
                    shape = {card.shape}
                    fill = {card.fill}

                    clicked = {card.clicked}

                    cardObject = {card}

                    onClick = {() => cardOnClick(card.name)}
                />
            )}
            </div>
        </div>
        <GameScores/>
    </div>
}

export default Game;