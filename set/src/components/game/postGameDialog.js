import React, {useEffect, useContext} from "react";
import { Button,
        Dialog, DialogActions, DialogContent, DialogTitle,
        Paper,
        Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useTheme } from "@emotion/react";
import { GameContext } from "../contexts/gameContext.js";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    resultImg: {
        position: "relative",
        display: "flex",
        justifyContent: "center"
    },

    result: {
        position: "absolute",
        top: "1rem",
        fontFamily: "Prompt",
        fontSize: "min(4rem, 12vw)",
        letterSpacing: "0.5rem",
        color: theme.palette.error.main
    },

    timeWrap: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        fontFamily: "Prompt",
        fontSize: "min(2rem, 6vw)",
        marginTop: "1rem",
        padding: "1rem",
        backgroundColor: theme.palette.secondary.light,
    },

    time: {
        display: "flex",
        justifyContent: "center",
        fontSize: "min(3rem, 9vw)",
        color: theme.palette.error.main
    }
}));

const TableCellNicknames = (props) => {
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

const TableCellResults = (props) => {
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

const PostGameImage = (isWinner) => {
    const classes = useStyles();

    return <div className = {classes.resultImg}>
        <div className = {classes.result}>
            {isWinner ? "U won!" : "U lost..."}
        </div>
        {isWinner ? WinImage : LoseImage}
    </div>    
}

const DialogContentCooperation = () => {
    const classes = useStyles();

    const { gameStartTime, gameOverTime } = useContext(GameContext);

    const time = (gameOverTime - gameStartTime) / 100;
    const minutes = Math.floor(time / 600);
    const seconds = Math.floor(time / 10) % 60;
    const milliseconds = Math.floor((time) % 10);

    return <DialogContent>
        <PostGameImage isWinner = {true}/>
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

const DialogContentAgainst = () => {
    const { players, returnPlayer } = useContext(GameContext);

    const isPlayerWinner = () => {
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
        
        return winners.some(id => returnPlayer().playerId === id);
    }

    const isWinner = isPlayerWinner();

    return <DialogContent>
        <PostGameImage isWinner = {isWinner}/>
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

const DialogButton = ({onClickFunction, text, variant}) => {
    return <Button
        sx = {{padding: "1rem", margin: "0.5rem", fontSize: "min(1.25rem, 4vw)"}}
        onClick = {onClickFunction}
        variant = {variant}
    >
        {text}
    </Button>
}

const DialogButtons = () => {
    const { rematch, leave } = useContext(GameContext);
    return <DialogActions>
        <DialogButton onClickFunction = {leave} text = "Leef" />
        <DialogButton onClickFunction = {rematch} text = "Pulay again" variant = "contained"/>
    </DialogActions>
}

const PostGameDialog = (props) => {
    const { gamemode, rematch } = useContext(GameContext);

    const handleKeyPressed = (event) => {
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

    return <Dialog
        open = {props.open} 
        onClose = {props.onClose}
        fullWidth maxWidth = "sm"
    >
        <DialogTitle sx = {{fontSize: "2.5rem", fontFamily: "Prompt"}}>
            Game ovar!
        </DialogTitle>

        {(gamemode === "Cooperation" || gamemode === "Singleplayer")
        ? <DialogContentCooperation />
        : <DialogContentAgainst />}

        <DialogButtons/>
    </Dialog>
}

export default PostGameDialog;