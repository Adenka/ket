import React, { useEffect, useState } from "react";
import Room from "./room";
import { useContext } from "react";
import { ErrorContext } from "../contexts/errors";
import { gameModes } from "../utils/constants";

const RoomPaper = ({tabNumber}) => {
    const [rooms, setRooms] = useState([]);
    const { setSnackbar } = useContext(ErrorContext);

    const fetchRooms = async () => {
        const response = await fetch("/rooms", {
            method: "POST"
        });

        if (!response.ok) {
            setSnackbar("Error fetching rooms", "error");
            return;
        }

        const data = await response.json();

        setRooms(data)
    }

    useEffect(() => {
        fetchRooms();
    }, [])

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
        {rooms.filter(room => room.gamemode === gameModes[tabNumber]).map((room) => (
            <Room roomObject = {room} />
        ))}
    </div>
}

export default RoomPaper;