import { Divider, Drawer, IconButton, Typography } from "@mui/material";
import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from "@emotion/react";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 400,
        backgroundColor: theme.palette.secondary.light,
        color: grey[800],
        height: "100%"
    },
    drawerTitle: {
        padding: "2.5rem",
        paddingLeft: 0,
        fontFamily: "Righteous",
        letterSpacing: "0.125rem",
        fontSize: 32
    },
    userIconWrapper: {
        width: 64,
        height: 64,
        margin: "2rem 1rem 2rem 1rem"
    },
    userIcon: {
        color: grey[800],
        fontSize: 40
    },
    divider: {
        margin: "0 1rem 0 1rem",
        backgroundColor: theme.palette.secondary.main
    },
    drawerListElement: {
        padding: "2rem",
        transition: "0.25s",
        color: grey[600],
        fontFamily: "Prompt",
        fontSize: 22.5,
        "&:hover": {
            color: theme.palette.secondary.light,
            backgroundColor: theme.palette.primary.main
        }
    }
}))

const StartPageDrawer = ({openDrawer, setOpenDrawer}) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const navigate = useNavigate(theme);

    return <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
    >
        <div className={classes.root}>
            <div style={{display: "flex"}}>
                <IconButton className={classes.userIconWrapper} disabled>
                    <PersonIcon className={classes.userIcon}/>
                </IconButton>
                <Typography className={classes.drawerTitle}>
                    {localStorage.getItem("username")}
                </Typography>
            </div>
            <Divider className={classes.divider}/>
            <Typography
                className = {classes.drawerListElement}
                onClick = {() => {navigate("/scores")}}
            >
                Mah scorez
            </Typography>
        </div>
    </Drawer>
}

export default StartPageDrawer;