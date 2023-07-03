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

const AddRoomButton = (props) => {
    const [animationStyle, setAnimationStyle] = useState({});

    return <Fab 
        color = "primary"
        onClick = {props.onClick}
        sx = {{
            position: "fixed",
            right: "min(4rem, 10vw)",
            bottom: "min(4rem, 10vw)",
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
            onMouseOver = {() => setAnimationStyle('clockwise')}
            onMouseOut = {() => setAnimationStyle('anticlockwise')}
        />
    </Fab>
}

export default AddRoomButton;