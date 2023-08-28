import React, { useContext } from "react";
import { GameContext } from "../contexts/gameContext";
import GameScores from "./gameScores";

function GameScoresCooperation() {
    let totalPoints = 0;
    const { players, returnPlayer } = useContext(GameContext);
    const player = returnPlayer();

    //TODO - players leave with their points!
    Object.values(players).map(playerrr => totalPoints += playerrr.points);

    const cooperationPlayers = [
        {
            username: "Fuzzzd Kittehz",
            points: totalPoints,
            colorNumber: player.colorNumber
        }
    ]

    return <GameScores players = {cooperationPlayers} />;
}

export default GameScoresCooperation;