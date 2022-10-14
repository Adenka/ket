import { Fab, keyframes } from "@mui/material";
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

const buttonClockwise = keyframes`
    100% {
        transform: rotate(180deg)
    }
`;

const buttonAnticlockwise = keyframes`
    100% {
        transform: rotate(-180deg)
    }
`;

function AddRoomButton(props) {
    const [animationStyle, setAnimationStyle] = useState({});

    function handleMouseOver(){
        setAnimationStyle('clockwise');
    }

    function handleMouseOut() {
        setAnimationStyle('anticlockwise');
    }

    return <Fab 
        color = "primary"
        onClick = {props.onClick}
        sx = {{
            position: "fixed",
            right: "4rem",
            bottom: "4rem",
            padding: "2.5rem",

            "path:first-of-type": {
                transformOrigin: "center",
                animation:
                    animationStyle === "clockwise"
                    ? `${buttonClockwise} 0.5s forwards 1`
                    : `${buttonAnticlockwise} 0.5s forwards 1`
            }
            
        }}
    >
        <AddIcon 
            sx = {{fontSize: "4rem", color: "#ffffff"}}
            onMouseOver = {handleMouseOver}
            onMouseOut = {handleMouseOut}
        />
    </Fab>
}

export default AddRoomButton;