import React, { useEffect, useState } from "react";
import Room from "./room";

const RoomPaper = (props) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("/rooms", {
            method: "POST"
        }).then(
            response => response.json()
        ).then(
            data => setRooms(data)
        )
    }, [])
    console.log(rooms);
    const gameModes = ["Cooperation", "Against"];

    return <div
        style = {{
            backgroundColor: "none",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            minHeight: "70vh",
            flexGrow: 1
        }}
    >
        {rooms.filter(room => room.gamemode === gameModes[props.alignment]).map((room) => (
            <Room roomObject = {room} />
        ))}
    </div>
}

export default RoomPaper;