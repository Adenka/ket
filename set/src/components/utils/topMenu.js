import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

const useStyles = makeStyles({
    werUPlayin: {
        paddingLeft: "3rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
    }
})

const TopMenu = ({content}) => {
    const classes = useStyles();
    const navigate = useNavigate();

    return <AppBar position = "static" sx = {{height: "5.5rem"}}>
        <Toolbar>
            <IconButton onClick = {() => navigate("/")}>
                <HomeIcon fontSize = "large"/>
            </IconButton>
            <Typography
                className = {classes.werUPlayin}
                variant = "h4"
                sx = {{fontFamily: "Architects Daughter"}}
            >
                {content}
            </Typography>
        </Toolbar>
    </AppBar>
}

export default TopMenu;