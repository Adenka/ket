import React, { useContext, useEffect } from "react";
import BellsAndWhistles from "./bellsAndWhistles";
import PlayerList from "./playerList";
import { makeStyles } from "@mui/styles";
import RoomLink from "./roomLink";
import LoadingRoom from "./loadingRoom";
import { GameContext } from "../gameContext";

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%",
        position: "fixed",
        backgroundImage: "radial-gradient(bottom left, #b2ebf2 40%, #18ffff 65%, #00acc1)",
        padding: "2rem",
        display: "flex"
    },

    leftWrap: {
        width: "35%",
        height: "100%",
        padding: "1.5rem",
        borderRadius: "2rem",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column"
    }
})

function WaitingRoom() {
    const classes = useStyles();
    const { socket, roomId, players, socketConnected } = useContext(GameContext);

    function handleButtonOnClick() {
        socket.current.send(JSON.stringify({
            type: "redirectToGame",  
            roomId: roomId
        }))
    }

    function handleKeyPressed(event) {
        if (event.key === "Enter") {
            handleButtonOnClick();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPressed)

        return () => {
            window.removeEventListener("keydown", handleKeyPressed);
        }
    }, [])

    console.log("players", players);
    
    return <div>
        {
            (!socketConnected)
            ?
            <LoadingRoom/>
            :
            <div className = {classes.root}>
                <div style = {{display: "flex"}}>
                    <div className = {classes.leftWrap}>
                        <PlayerList players = {players}/>
                        <RoomLink/>
                    </div>
                    <BellsAndWhistles
                        onClick = {handleButtonOnClick}
                        onKeyPress = {handleKeyPressed}
                    />
                </div>
            </div>
        }
    </div>
}

export default WaitingRoom;