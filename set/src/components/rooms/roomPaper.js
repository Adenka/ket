import React, { useEffect, useState } from "react";
import Room from "./room";

const RoomPaper = (props) => {
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        const response = await fetch("/rooms", {
            method: "POST"
        });

        const data = await response.json();

        setRooms(data)
    }

    useEffect(() => {
        fetchRooms();
    }, [])
    const gameModes = [ "Cooperation", "Against" ];

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