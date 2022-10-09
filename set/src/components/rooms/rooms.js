import React, { useContext, useEffect, useState } from "react";
import RoomPaper from "./roomPaper";
import AddRoomButton from "./addRoomButton";
import AddRoomDialog from "./addRoomDialog";
import CatsCorner from "../../assets/cats/catsCorner.svg"
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography, Tab, Tabs } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import "../../assets/fonts.css";
import {TabPanel, TabContext} from "@mui/lab";
import SwipeableViews from 'react-swipeable-views';
import SnackBar from "../snackBar";
import { ErrorContext } from "../errors";

const useStyles = makeStyles({
    werUPlayin: {
        paddingLeft: "3rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
    }
})

function RoomTopMenu() {
    const classes = useStyles();
    const navigate = useNavigate();

    function redirectToHome() {
        navigate("/");
    }

    return <AppBar position = "static" sx = {{height: "5.5rem"}}>
        <Toolbar>
            <IconButton onClick = {redirectToHome}>
                <HomeIcon fontSize = "large"/>
            </IconButton>
            <Typography
                className = {classes.werUPlayin}
                variant = "h3"
                sx = {{fontFamily: "Architects Daughter"}}
            >
                Wer u playin
            </Typography>
        </Toolbar>
    </AppBar>
}

function ModeTabs(props) {
    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    return <div style = {{padding: "3rem"}}>
    <TabContext value = {props.value}>
        <Tabs
            value = {props.value}
            onChange = {props.onChange}
            aria-label = "gamemode"
            centered
        >
            <Tab
                label = "Cooperashun wif othr kittehz"
                sx = {{
                    width: "50%",
                    minWidth: "33%",
                    fontSize: "1.25rem",
                    height: "4.5rem",
                }}
                {...a11yProps(0)}
            ></Tab>
            <Tab 
                label = "Aganzt othr kittehz"
                sx = {{
                    width: "50%",
                    minWidth: "33%",
                    fontSize: "1.25rem",
                }}
                {...a11yProps(1)}
            ></Tab>
        </Tabs>
        <SwipeableViews axis = "x" index = {props.value} onChangeIndex = {props.onChangeIndex}>
            <TabPanel value = {props.value} index = {0} sx = {{padding: 0}}>
                <RoomPaper alignment = {props.value}/>
            </TabPanel>
            <TabPanel value = {props.value} index = {1} sx = {{padding: 0}}>
                <RoomPaper alignment = {props.value}/>
            </TabPanel>
        </SwipeableViews>
    </TabContext>
</div>

}

function Rooms() {
    const [alignment, setAlignment] = useState(0);
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const { addPlayerError, setAddPlayerError } = useContext(ErrorContext);

    useEffect(() => {
        if (addPlayerError !== "") {
            setOpenSnackBar(true);
        }
    }, [addPlayerError])

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAddPlayerError("");
        setOpenSnackBar(false);
    }

    const [openDialog, setOpenDialog] = useState(false);
    function handleOpenDialog() {
        setOpenDialog(true);
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    function handleChangeIndex(index) {
        setAlignment(index);
    }

    console.log("add player error: ", addPlayerError);
    return <div
        style = {{
            minHeight: "100vh",
            backgroundImage: `url(${CatsCorner})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left 2rem bottom 1rem"
        }}
    >
        <RoomTopMenu/>
        <ModeTabs
            value = {alignment}
            onChange = {handleAlignment}
            onChangeIndex = {handleChangeIndex}
        />
        <AddRoomDialog open = {openDialog} onClose = {handleCloseDialog} defaultValue = {alignment}/>
        <AddRoomButton onClick = {handleOpenDialog}/>
        <SnackBar
            text = {addPlayerError}
            severity = "error"
            open = {openSnackBar}
            onClose = {handleCloseSnackBar}
        />
    </div>
}

export default Rooms;