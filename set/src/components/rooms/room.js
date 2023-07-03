import React, { useContext, useEffect, useRef } from "react";
import { Paper, Typography, Button, AvatarGroup, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import "../../assets/fonts.css"
import { useTheme } from "@emotion/react";
import { pink } from "@mui/material/colors";
import { ErrorContext } from "../errors";
import { kolorki } from "../../assets/kolorki";

const useStyles = makeStyles({
    root: {
        margin: "0.5rem",
        display: "flex",
        padding: "1rem",
        width: "min(95%, 30rem)",
        height: "12rem"
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

const Room = ({roomObject}) => {
    const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();
    const timer = useRef();
    const { setSnackbar } = useContext(ErrorContext);

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handlePlayOnClick = () => {
        fetch("/canPlayerJoin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({roomId: roomObject.roomId})
        }).then(
            response => response.json()
        ).then(function(data) {
            console.log(data);
            if (data.addRes) {
                navigate(`/${roomObject.roomId}/wait`)
            }
            else {
                setSnackbar(data.message, "error");
            }
        })
    }

    return <Paper className = {classes.root} sx = {{backgroundColor: theme.palette.secondary.light}}>
        <div className = {classes.leftWrap}>
            <Typography
                className = {classes.title}
                sx = {{fontSize: "min(2rem, 6.25vw)", fontFamily: "Prompt"}}>
                {roomObject.name}
            </Typography>
            <AvatarGroup max = {4} classes = {{ avatar: classes.avatar, root: classes.rootAvatar }}>
                {roomObject.usernames.map((item, key) =>
                    <Avatar key = {key}
                        alt = {item.username}
                        sx = {{backgroundColor: kolorki[item.colorNumber][500]}}
                    >{item.username[0]}</Avatar>
                )}
            </AvatarGroup>
        </div>
        <div className = {classes.joinButton}>
            <Button
                variant = "contained"
                onClick = {handlePlayOnClick}
                sx = {{height: "min(4.5rem, 15vw)", width: "min(7.5rem, 25vw)",}}
            >
                <Typography sx = {{fontSize: "min(4vw, 1.25rem)", letterSpacing: "0.125rem"}}>
                    pulay
                </Typography>
            </Button>
        </div>
    </Paper>
}

export default Room;