import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import "../../assets/fonts.css";
import { useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { ErrorContext } from "../contexts/errors";

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
    const { setSnackbar } = useContext(ErrorContext);

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
                            setSnackbar("Link copid!", "info");
                        }}
                    >
                        <ContentCopyIcon fontSize = "large"/>
                    </IconButton>
                    </div>
                </InputAdornment>,
            
            style: {
                fontSize: "min(1.5rem, 5vw)",
                width: "100%",
                padding: "min(2rem, 5vw)",
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