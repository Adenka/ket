import React, { useEffect, useState } from "react";
import Room from "./room";

function RoomPaper(props) {
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
            <Room
                key = {room.roomId}
                roomId = {room.roomId}
                name = {room.name}
                usernames = {room.players}
                gameOnGoing = {room.game}
            />
        ))}
    </div>
}

export default RoomPaper;