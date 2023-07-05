import React, { useState } from "react";
import AddRoomButton from "./addRoomButton";
import AddRoomDialog from "./addRoomDialog";
import CatsCorner from "../../assets/cats/catsCorner.svg"
import "../../assets/fonts.css";
import TopMenu from "../topMenu";
import ModeTabs from "./modeTabs";
import RoomPaper from "./roomPaper";

const Rooms = () => {
    const [tabNumber, setTabNumber] = useState(parseInt(localStorage.getItem("tabNumber")) || 0);
    const handleTabNumberChange = (_, newTabNumber) => {
        console.log(newTabNumber);
        localStorage.setItem("tabNumber", newTabNumber);
        setTabNumber(newTabNumber);
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleChangeIndex = (index) => {
        setTabNumber(index);
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
            value = {tabNumber}
            onChange = {handleTabNumberChange}
            onChangeIndex = {handleChangeIndex}
            tabTitles = {["Cooperashun wif othr kittehz", "Aganzt othr kittehz"]}
            component = {<RoomPaper tabNumber = {tabNumber}/>}
        />
        <AddRoomDialog open = {openDialog} onClose = {() => setOpenDialog(false)} defaultValue = {tabNumber}/>
        <AddRoomButton onClick = {() => setOpenDialog(true)}/>
    </div>
}

export default Rooms;