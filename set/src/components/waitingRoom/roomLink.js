import { makeStyles } from "@mui/styles";
import React from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import "../../assets/fonts.css";
import { useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";

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
        padding: "1rem",
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
    const theme = useTheme();
    const url = `https://ket.onrender.com/${roomId}/wait`;

    return <TextField
        //className = {classes.textWrap}
        variant = "standard"
        InputProps = {{
            disableUnderline: "true",
            endAdornment:
                <InputAdornment position="end">
                    <div className = {classes.iconWrap}>
                    <IconButton
                        size = "large"
                        onClick = {() => navigator.clipboard.writeText(url)}
                    >
                        <ContentCopyIcon fontSize = "large"/>
                    </IconButton>
                    </div>
                </InputAdornment>,
            
            style: {
                fontSize: "min(2.5vh, 5vw)",
                width: "min(40rem, 100%)",
                padding: "2rem",
                backgroundColor: theme.palette.secondary.light,
                borderRadius: "100rem",
                fontFamily: "Prompt",
                letterSpacing: "0.125rem",
            }
        }}
        value = {url}
    >
    
    </TextField>
}

export default RoomLink;