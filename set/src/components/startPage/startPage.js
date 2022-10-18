import React, { useEffect, useState } from "react";
import { Typography, useMediaQuery, Button, TextField, AppBar, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import WaveStartPage from "../../assets/waveStartPage.svg"
import "../../assets/fonts.css";
import{ ReactComponent as Ket} from "../../assets/ket.svg"

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "fixed",

        backgroundImage: `url(${WaveStartPage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right min(-11.75rem, -16.5vw) bottom min(-15rem, -21vw)",
        backgroundSize: "max(50rem, 70vw)"
    },

    toolbar: {
        height: "100%"
    },

    ketWrap: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        paddingLeft: "min(5rem, 5%)",
        height: "100%"
    },

    nicknameInputWrap: {
        padding: "1rem",
    },

    buttonsWrap: {
        display: "flex"
    },

    buttonWrap: {
        width: "50%",
        height: "7rem",
        padding: "1rem"
    },

    button: {
        width: "100%",
        height: "100%",
        color: theme.palette.secondary
    },

    leftWrap: {
        display: "flex",
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 75%)"
    },

    rightWrap: {
        display: "flex",
        flex: 1,
        
        width: "100%",
        height: "100%"
    },

    rightWrapSm: {

    }
}));

function StartPageTopMenu() {
    const classes = useStyles();

    return <AppBar position = "static" sx = {{height: "5.5rem"}}>
        <Toolbar className = {classes.toolbar}>
            <div className = {classes.ketWrap}>
                <Ket/>
            </div>
        </Toolbar>
    </AppBar>
}

function NicknameInput() {
    const classes = useStyles();
    const theme = useTheme();

    const [rerenderState, setRerenderState] = useState(0);

    function handleTextFieldChange(event) {
        setRerenderState(rerenderState => rerenderState + 1);
        localStorage.setItem("username", event.target.value);
    }

    return <div className = {classes.nicknameInputWrap}>
        <TextField
            autoFocus
            inputProps = {{
                style: {
                    fontSize: "min(1.75rem, 5vw)",
                    width: "min(40rem, 100%)",
                    padding: "min(2rem, 5.5vw)",
                    backgroundColor: theme.palette.secondary.light
                }
            }}
            value = {localStorage.getItem("username")}
            onChange = {handleTextFieldChange}
            placeholder = "Ur naym"
            variant = "filled"
            fullWidth
        />
    </div>
}

function PlayButton(props) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return <div className = {classes.buttonWrap}>
        <Button
            variant = "contained"
            className = {classes.button}
            onClick = {props.onClick}
            sx = {{fontSize: "min(4vw, 1.25rem)"}}
        >
            {props.text}
        </Button>
    </div>
}

function StartPage() {
    const theme = useTheme();
    const classes = useStyles(theme);
    const navigate = useNavigate();
    const isBig = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    useEffect(() => {
        localStorage.setItem("username", "");
    }, []);

    return <div>
        <StartPageTopMenu/>
        <div className = {classes.root} style = {{alignItems: isBig ? "center" : "start", paddingTop: isBig ? 0 : "10vh"}}>
            <div className = {classes.leftWrap}>
                <div>
                    <Typography
                        sx = {{fontFamily: "Righteous", paddingLeft: "1rem", fontSize: "min(10vw, 8vh)"}}
                    >
                        Speedy card klikin
                    </Typography>
                    <NicknameInput/>
                    <div className = {classes.buttonsWrap}>
                        <PlayButton
                            text = "Lonely kitteh"
                            onClick = {() => navigate("/singleplayer")}
                        />
                        <PlayButton
                            text = "Kitteh haz frenz"
                            onClick = {() => navigate("/rooms")}
                        />
                    </div>
                </div>
            </div>
            <div className = {isBig ? classes.rightWrap : classes.rightWrapSm}>
            </div>
        </div>
    </div>
}

export default StartPage;