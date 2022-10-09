import { makeStyles } from "@mui/styles";
import React from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from "@mui/material";
import "../../assets/fonts.css";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.light,
        borderRadius: "100rem",
        padding: "1rem",
        display: "flex",
        width: "100%"
    },

    textWrap: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        height: "100%",
        padding: "0.5rem",
        fontSize: "1.375rem",
        fontFamily: "Prompt",
        letterSpacing: "0.125rem",
        wordWrap: "anywhere",
        //backgroundColor: "blue",
        flex: 7
    },

    iconWrap: {
        display: "flex",
        alignItems: "center",
        flex: 1,
        justifyContent: "right"
    }
}))

function RoomLink() {
    const classes = useStyles();
    const { roomId } = useParams();

    return <div className = {classes.root}>
        <div className = {classes.textWrap}>
        www.dupawtrokach.org.com.pl/{roomId}/wait
        </div>
        <div className = {classes.iconWrap}>
            <IconButton size = "large">
                <ContentCopyIcon fontSize = "large"/>
            </IconButton>
        </div>
    </div>
}

export default RoomLink;