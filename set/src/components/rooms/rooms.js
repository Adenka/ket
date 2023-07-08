import React, { useState } from "react";
import AddRoomButton from "./addRoomButton";
import AddRoomDialog from "./addRoomDialog";
import CatsCorner from "../../assets/cats/catsCorner.svg"
import "../../assets/fonts.css";
import TopMenu from "../topMenu";
import ModeTabs from "./modeTabs";
import RoomPaper from "./roomPaper";

const Rooms = () => {
    const localStorageTabNumber = parseInt(localStorage.getItem("tabNumber")) || 0;
    const [openDialog, setOpenDialog] = useState(false);
    const [tabNumber, setTabNumber] = useState(parseInt(localStorageTabNumber));

    console.log("rooms");

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
            localStorageElement = "tabNumber"
            tabTitles = {["Cooperashun wif othr kittehz", "Aganzt othr kittehz"]}
            component = {RoomPaper}
            orientation = "horizontal"
            wrapperStyle = {{}}
        />
        <AddRoomDialog
            open = {openDialog}
            onClose = {() => setOpenDialog(false)}
            defaultValue = {parseInt(localStorageTabNumber)}
        />
        <AddRoomButton onClick = {() => setOpenDialog(true)}/>
    </div>
}

export default Rooms;