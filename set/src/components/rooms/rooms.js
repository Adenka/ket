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
import { ErrorContext } from "../contexts/errors";

const useStyles = makeStyles({
    werUPlayin: {
        paddingLeft: "3rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
    }
})

const RoomTopMenu = () => {
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
                Wer u playin
            </Typography>
        </Toolbar>
    </AppBar>
}

const ModeTab = ({label, index, a11yProps}) => {
    return <Tab
        label = {label}
        sx = {{
            width: "50%",
            minWidth: "33%",
            fontSize: "min(4vw, 1.25rem)",
            height: "4.5rem",
        }}
        {...a11yProps(index)}
    ></Tab>
}

const ModeTabs = (props) => {
    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    return <div style = {{padding: "1rem", paddingTop: "2rem"}}>
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
                        fontSize: "min(4vw, 1.25rem)",
                        height: "4.5rem",
                    }}
                    {...a11yProps(0)}
                ></Tab>
                {/*<ModeTab label = "Cooperashun wif othr kittehz" index = {0} a11yProps = {a11yProps}/>*/}
                {/*<ModeTab label = "Aganzt othr kittehz" index = {1} a11yProps = {a11yProps}/>*/}
                <Tab 
                    label = "Aganzt othr kittehz"
                    sx = {{
                        width: "50%",
                        minWidth: "33%",
                        fontSize: "min(4vw, 1.25rem)",
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

const Rooms = () => {
    const [alignment, setAlignment] = useState(parseInt(localStorage.getItem("alignment")) || 0);
    const handleAlignment = (event, newAlignment) => {
        console.log(newAlignment);
        localStorage.setItem("alignment", newAlignment);
        setAlignment(newAlignment);
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleChangeIndex = (index) => {
        setAlignment(index);
    }

    return <div
        style = {{
            minHeight: "100vh",
            backgroundImage: `url(${CatsCorner})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left 2rem bottom 1rem",
        }}
    >
        <RoomTopMenu/>
        <ModeTabs
            value = {alignment}
            onChange = {handleAlignment}
            onChangeIndex = {handleChangeIndex}
        />
        <AddRoomDialog open = {openDialog} onClose = {() => setOpenDialog(false)} defaultValue = {alignment}/>
        <AddRoomButton onClick = {() => setOpenDialog(true)}/>
    </div>
}

export default Rooms;