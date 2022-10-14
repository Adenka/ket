import { Button } from "@mui/material";
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
        display: "flex"
    },

    letter: {
        padding: "1.5rem"
    }
})

function BellsAndWhistles(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { leave } = useContext(GameContext);

    return <div className = {classes.root}>
        <div>
            <div className = {classes.ketWrapper}>
                <div className = {classes.letter}><K/></div>
                <div className = {classes.letter}><E/></div>
                <div className = {classes.letter}><T/></div>
            </div>
            <Button
                variant = "contained"
                color = "error"
                onClick = {props.onClick}
                onKeyPress = {props.onKeyPress}
                sx = {{
                    height: "7.5rem",
                    width: "100%",
                    fontSize: "2.25rem",
                    fontFamily: "Prompt",
                    letterSpacing: "0.375rem"
                }}>
                Start!
            </Button>
            <Button
                color = "error"
                onClick = { leave }
                sx = {{
                    height: "7.5rem",
                    width: "100%",
                    fontSize: "2.25rem",
                    fontFamily: "Prompt",
                    letterSpacing: "0.375rem",
                    backgroundColor: "white",
                    "&:hover": {
                        backgroundColor: theme.palette.secondary.light
                    },
                    marginTop: "2rem"
                }}>
                Leef...
            </Button>
        </div>
    </div>
}

export default BellsAndWhistles;