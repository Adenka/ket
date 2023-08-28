import React, { useContext } from "react";
import { GameContext } from "../contexts/gameContext";
import GameScores from "./gameScores";

const GameScoresAgainst = () => {
    const { players } = useContext(GameContext);

    return <GameScores players = {players} />;
}

export default GameScoresAgainst;