import React, { useContext, useEffect } from "react";
import BellsAndWhistles from "./bellsAndWhistles";
import PlayerList from "./playerList";
import { makeStyles } from "@mui/styles";
import RoomLink from "./roomLink";
import LoadingRoom from "./loadingRoom";
import { GameContext } from "../contexts/gameContext";
import { SizeContext } from "../contexts/size";

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
    const { isSmall } = useContext(SizeContext);

    function handleButtonOnClick() {
        socket.current.send(JSON.stringify({
            type: "redirectToGame",  
            roomId: roomId,
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
    
    return <div>
        {
            (!socketConnected)
            ?
            <LoadingRoom/>
            :
            (
                <div className = {classes.root} style = {{flexDirection: isSmall ? "column" : "row"}}>
                    <div className = {classes.leftWrap} style = {{width: isSmall ? "100%" : "35%"}}>
                        <PlayerList players = {players}/>
                        <RoomLink/>
                    </div>
                    <BellsAndWhistles
                        onClick = {handleButtonOnClick}
                        onKeyPress = {handleKeyPressed}
                    />
                </div>
            )
        }
    </div>
}

export default WaitingRoom;