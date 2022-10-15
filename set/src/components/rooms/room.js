import React, { useContext, useEffect, useRef } from "react";
import { Paper, Typography, Button, AvatarGroup, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import "../../assets/fonts.css"
import { useTheme } from "@emotion/react";
import { pink } from "@mui/material/colors";
import { ErrorContext } from "../errors";

const useStyles = makeStyles({
    root: {
        margin: "0.5rem",
        display: "flex",
        padding: "1rem",
        width: "30rem",
        height: "13rem"
    },

    list: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
    },

    leftWrap: {
        flex: 2,
        padding: "1rem"
    },

    joinButton: {   
        flex: 1,
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        
        margin: "1.5rem"
    },

    rootAvatar: {
        justifyContent: "left",
        height: "75%",
        display: "flex",
        alignItems: "center"
    },

    avatar: {
        "&.MuiAvatar-root": {
            width: "3.5rem",
            height: "3.5rem",
            fontSize: "1.5rem"
        }
    }
})

function Room(props) {
    const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();
    const timer = useRef();
    const { setIsMessageOn, setCurrentMessage, setCurrentSeverity } = useContext(ErrorContext);

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    function handlePlayOnClick() {
        fetch("/canPlayerJoin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({roomId: props.roomId})
        }).then(
            response => response.json()
        ).then(function(data) {
            console.log(data);
            if (data.addRes) {
                navigate(`/${props.roomId}/wait`)
            }
            else {
                setIsMessageOn(true);
                setCurrentMessage(data.message)
                setCurrentSeverity("error");
            }
        })
    }

    function randomPink() {
        let rnd = (Math.floor(Math.random() * 9) + 1) * 100;
        
        return rnd;
    }

    return <Paper className = {classes.root} sx = {{backgroundColor: theme.palette.secondary.light}}>
        <div className = {classes.leftWrap}>
            <Typography
                className = {classes.title}
                sx = {{fontSize: "2rem", fontFamily: "Prompt"}}>
                {props.name}
            </Typography>
            <AvatarGroup max = {4} classes = {{ avatar: classes.avatar, root: classes.rootAvatar }}>
                {props.usernames.map((item, key) =>
                    <Avatar key = {key}
                        alt = {item.username}
                        sx = {{backgroundColor: pink[randomPink()]}}
                    >{item.username[0]}</Avatar>
                )}
            </AvatarGroup>
        </div>
        <div className = {classes.joinButton}>
            <Button
                variant = "contained"
                onClick = {handlePlayOnClick}
                sx = {{height: "4.5rem", width: "7.5rem",}}
            >
                <Typography sx = {{fontSize: "1.25rem", letterSpacing: "0.125rem"}}>
                    pulay
                </Typography>
            </Button>
        </div>
    </Paper>
}

export default Room;