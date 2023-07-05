import { Drawer } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {    BigIconButton,
            BigPersonIcon,
            UsernameTypography,
            DrawerDivider,
            DrawerElement } from "./startPageDrawerComponents";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 400,
        backgroundColor: theme.palette.secondary.light,
        color: grey[800],
        height: "100%"
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
                <BigIconButton disabled>
                    <BigPersonIcon/>
                </BigIconButton>
                <UsernameTypography>
                    {localStorage.getItem("username")}
                </UsernameTypography>
            </div>
            <DrawerDivider/>
            <DrawerElement
                onClick = {() => {navigate("/scores")}}
            >
                Mah scorez
            </DrawerElement>
        </div>
    </Drawer>
}

export default StartPageDrawer;