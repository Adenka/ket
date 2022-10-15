import { Button, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import "../../assets/fonts.css"
import{ ReactComponent as K} from "../../assets/k.svg"
import{ ReactComponent as E} from "../../assets/e.svg"
import{ ReactComponent as T} from "../../assets/t.svg"
import { useTheme } from "@emotion/react";
import { GameContext } from "../gameContext";

const useStyles = makeStyles({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    
    ketWrapper: {
        padding: "2rem",
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
    },

    letter: {
        padding: "1.5rem"
    }
})

function BellsAndWhistles(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { leave } = useContext(GameContext);
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));

    return <div className = {classes.root}>
        <div style = {{
            display: "flex",
            flexDirection: isSmall ? "row" : "column",
            width: isSmall ? "100%" : "",
            alignContent: "center",
            justifyContent: "center"
        }}>
            {
                (!isSmall)
                ?
                <div className = {classes.ketWrapper}>
                    <div className = {classes.letter}><K/></div>
                    <div className = {classes.letter}><E/></div>
                    <div className = {classes.letter}><T/></div>
                </div>
                :
                <div></div>    
            }
            <Button
                variant = "contained"
                color = "error"
                onClick = {props.onClick}
                onKeyPress = {props.onKeyPress}
                sx = {{
                    height: "7.5rem",
                    width: "min(40rem, 100%)",
                    fontSize: "min(2.25rem, 5.5vw)",
                    fontFamily: "Prompt",
                    letterSpacing: "0.375rem",
                    margin: "1rem"
                }}>
                Start!
            </Button>
            <Button
                color = "error"
                onClick = { leave }
                sx = {{
                    height: "7.5rem",
                    width: "min(40rem, 100%)",
                    fontSize: "min(2.25rem, 5.5vw)",
                    fontFamily: "Prompt",
                    letterSpacing: "0.375rem",
                    backgroundColor: "white",
                    "&:hover": {
                        backgroundColor: theme.palette.secondary.light
                    },
                    margin: "1rem"
                }}>
                Leef...
            </Button>
        </div>
    </div>
}

export default BellsAndWhistles;