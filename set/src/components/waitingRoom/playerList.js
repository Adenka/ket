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
            width: "4.5rem",
            height: "4.5rem",
            margin: "1rem",

            fontSize: "2.25rem",
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
            height: "6rem",
            borderRadius: "100rem",
            margin: "0.5rem",
            paddingRight: "2rem",

            fontSize: "2rem",
            fontFamily: "Prompt",
            fontWeight: 200,
            letterSpacing: "0.125rem",

            backgroundColor: colorShade,
        }}
        label = {props.text}
    />
}

function PlayerList(props) {
    const classes = useStyles();

    return <div className = {classes.root}>
        <Typography
            sx = {{
                fontSize: "min(3.5rem, 10vw)",
                fontFamily: "Prompt",
                padding: "1.5rem"
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