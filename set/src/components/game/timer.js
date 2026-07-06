import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/gameContext";

function Timer() {
    const [time, setTime] = useState(0);
    const { isGameOver, gameStartTime, gameOverTime } = useContext(GameContext);

    useEffect(() => {
        let interval;

        if (!isGameOver) {
            interval = setInterval(() => {
                setTime(Date.now() - gameStartTime);
            }, 100);
        }
        else {
            setTime(gameOverTime - gameStartTime);
        }

        return () => clearInterval(interval);
    }, [isGameOver, gameOverTime, gameStartTime])

    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor(time / 1000) % 60;
    const milliseconds = Math.floor((time / 100) % 10);

    return <div style = {{
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        fontSize: "min(7.5vw, 3rem)"
    }}>
        {(minutes < 10 ? "0" : "") + minutes} : {("0" + seconds).slice(-2)} . {milliseconds}
    </div>
}

export default Timer;