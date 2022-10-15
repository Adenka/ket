import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import "../../assets/fonts.css";
import { useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { ErrorContext } from "../errors";

const useStyles = makeStyles(theme => ({
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
    const { setIsMessageOn, setCurrentMessage, setCurrentSeverity } = useContext(ErrorContext);

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
                        onClick = {() => {
                            navigator.clipboard.writeText(url);
                            setIsMessageOn(true);
                            setCurrentMessage("Link copid!");
                            setCurrentSeverity("info");
                        }}
                    >
                        <ContentCopyIcon fontSize = "large"/>
                    </IconButton>
                    </div>
                </InputAdornment>,
            
            style: {
                fontSize: "min(1.5rem, 5vw)",
                width: "100%",
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