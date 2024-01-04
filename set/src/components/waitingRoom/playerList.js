import { Avatar, Chip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import "../../assets/fonts.css";
import { kolorki } from "../../assets/kolorki"

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%"
    },

    avatarWrap: {
        display: "flex",
        flexWrap: "wrap"
    }
})

const WaitingRoomAvatar = (props) => {
    return <Avatar
        title = {props.title}
        sx = {{
            width: "min(4.5rem, 15vw)",
            height: "min(4.5rem, 15vw)",
            margin: "min(1rem, 2vw)",

            fontSize: "min(2.25rem, 7.5vw)",
            color: kolorki[props.colorNumber][900],

            backgroundColor: kolorki[props.colorNumber][200],
        }
    }>
        {props.text}
    </Avatar>
}

const WaitingRoomChip = (props) => {
    const colorShade = kolorki[props.colorNumber][400];

    return <Chip
        avatar = {<WaitingRoomAvatar text = {props.text[0]} colorNumber = {props.colorNumber}/>}
        sx = {{
            justifyContent: "left",
            height: "min(6rem, 20vw)",
            borderRadius: "100rem",
            marginBottom: "1rem",
            marginRight: "2rem",
            paddingRight: "2rem",

            fontSize: "min(2rem, 8vw)",
            fontFamily: "Prompt",
            fontWeight: 200,
            letterSpacing: "0.125rem",

            backgroundColor: colorShade,
        }}
        label = {props.text}
    />
}

const PlayerList = (props) => {
    const classes = useStyles();

    return <div className = {classes.root}>
        <Typography
            sx = {{
                fontSize: "min(3.5rem, 10vw)",
                fontFamily: "Prompt",
                padding: "min(1.5rem, 2.5vw)"
            }}
        >
            Kittehs joind
        </Typography>
        <div className = {classes.avatarWrap}>
            {props.players.map((player) => (
                <WaitingRoomChip
                    key = {player.playerId}
                    text = {(player.username) ? player.username : ""}
                    colorNumber = {player.colorNumber}/>
            ))}
        </div>
    </div>
}

export default PlayerList;