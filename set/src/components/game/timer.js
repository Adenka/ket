import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../gameContext";

function Timer() {
    const theme = useTheme();
    const [time, setTime] = useState(0);
    const { isGameOver, gameId } = useContext(GameContext);
    const startDate = useRef(null);
    const isSmall = useMediaQuery(theme.breakpoints.down("lg"));

    useEffect(() => {
        startDate.current = Date.now();
    }, [gameId])

    useEffect(() => {
        let interval;

        if (!isGameOver) {
            interval = setInterval(() => {
                setTime(Date.now() - startDate.current);
            }, 100);
        }
        else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isGameOver])

    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor(time / 1000) % 60;
    const milliseconds = Math.floor((time / 100) % 10);

    return <div style = {{fontSize: isSmall ? "2.5rem" : "3rem"}}>
        {(minutes < 10 ? "0" : "") + minutes} : {("0" + seconds).slice(-2)} . {milliseconds}
    </div>
}

export default Timer;