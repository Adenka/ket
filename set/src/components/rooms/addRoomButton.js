import { IconButton, keyframes } from "@mui/material";
import React, { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

    return <IconButton
        onMouseOver = {handleMouseOver}
        onMouseOut = {handleMouseOut}
        onClick = {props.onClick}
        
        color = "primary"
        size = "large"
        sx = {{
            position: "fixed",
            right: "2rem",
            bottom: "2rem",

            "path:first-of-type": {
                transformOrigin: "center",
                animation:
                    animationStyle === "clockwise"
                    ? `${buttonClockwise} 0.5s forwards 1`
                    : `${buttonAnticlockwise} 0.5s forwards 1`
            }
            
        }}>
        <AddCircleIcon sx = {{fontSize: "6.25rem"}}/>
    </IconButton>
}

export default AddRoomButton;