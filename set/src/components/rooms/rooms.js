import React, { useContext, useEffect, useState } from "react";
import RoomPaper from "./roomPaper";
import AddRoomButton from "./addRoomButton";
import AddRoomDialog from "./addRoomDialog";
import CatsCorner from "../../assets/cats/catsCorner.svg"
import { Tab, Tabs } from "@mui/material";
import "../../assets/fonts.css";
import {TabPanel, TabContext} from "@mui/lab";
import SwipeableViews from 'react-swipeable-views';
import TopMenu from "../topMenu";

const ModeTab = (props) => {
    return <Tab
        sx = {{
            width: "50%",
            minWidth: "33%",
            fontSize: "min(4vw, 1.25rem)",
            height: "4.5rem",
        }}
        {...props}
    />
}

const ModeTabs = (props) => {
    return <div style = {{padding: "1rem", paddingTop: "2rem"}}>
        <TabContext value = {props.value}>
            <Tabs
                value = {props.value}
                onChange = {props.onChange}
                aria-label = "gamemode"
                centered
            >
                <ModeTab label = "Cooperashun wif othr kittehz" />
                <ModeTab label = "Aganzt othr kittehz" />
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
        <TopMenu content="Wer u playin"/>
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