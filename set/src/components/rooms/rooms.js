import React, { useState } from "react";
import FunctionButton from "../functionButton";
import AddRoomDialog from "./addRoomDialog";
import CatsCorner from "../../assets/cats/catsCorner.svg"
import "../../assets/fonts.css";
import TopMenu from "../topMenu";
import ModeTabs from "./modeTabs";
import RoomPaper from "./roomPaper";
import AddIcon from '@mui/icons-material/Add';

const Rooms = () => {
    const localStorageTabNumber = parseInt(localStorage.getItem("tabNumber")) || 0;
    const [openDialog, setOpenDialog] = useState(false);
    
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
        <FunctionButton onClick = {() => setOpenDialog(true)} icon={AddIcon}/>
    </div>
}

export default Rooms;