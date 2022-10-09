
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
    root: {
        width: "100vw",
            height: "100vh",
            position: "absolute",
            backgroundColor: "#343d46",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
    },

    cat: {
        fill: "none",
        stroke: "#c0c5ce",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "11.32",
        strokeDashoffset: 100,
        strokeDasharray: 50,
        animation: `catDraw 2s cubic-bezier(0.65, 0, 0.35, 1) forwards infinite`,
    },

    "@global": {
        "@keyframes catDraw": {
            to: {
                strokeDashoffset: 0,
            },
        }
    }
})

function LoadingRoom() {
    const classes = useStyles();

    return <div className = {classes.root}>
        <svg width="min(50%, 30rem)" height="auto" viewBox="0 0 303.88 300" >
            <path
                d = "m25.339 220.11c-16.443-33.114-5.4257-80.629-5.4257-80.629-8.3844-27.493-27.253-114.95-0.19859-131.18 22.092-11.125 86.332 61.924 86.332 61.924s28.695-11.125 46.12-11.393c17.425-0.26807 43.737 10.365 43.737 10.365s65.183-71.307 85.687-62.818c25.559 35.143 16.827 92.053 3.8723 131.13 0 0 4.2757 51.255-8.1997 83.855-39.951 92.77-201.71 101.56-251.92-1.26z"
                className = {classes.cat}
                pathLength = {100}
            />
        </svg>
    </div>
}

export default LoadingRoom;