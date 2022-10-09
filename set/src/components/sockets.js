import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { UsernameContext } from "./App";
import { ErrorContext } from "./errors";
import { GameContext } from "./gameContext";

export function Sockets() {
    const { setAddPlayerError, setCardNotOnTable }  = useContext(ErrorContext);

    const socket = useRef(null);
    const [ socketConnected, setSocketConnected ] = useState(false);

    const { roomId } = useParams();
    const [ playerId, setPlayerId ]             = useState("");
    const [ players, setPlayers ]               = useState([]);

    const DECK_AMOUNT = 81;
    const [ cardsOnTable, setCardsOnTable ]     = useState([]);
    const [ cardsLeft, setCardsLeft ]           = useState(DECK_AMOUNT);

    const [ gameId, setGameId ]                 = useState("");
    const [ gamemode, setGamemode ]             = useState("");
    const [ isGameOver, setIsGameOver ]         = useState(false);
    const [ gameStartTime, setGameStartTime]    = useState(0);
    const [ gameOverTime, setGameOverTime ]     = useState(0);

    const navigate = useNavigate();
    const connectionTimeout = useRef(1000);
    const timeoutNumber = useRef(null);

    const stupidTimeoutNumber = useRef(null);

    const { username } = useContext(UsernameContext);

    const aaamI = (cardObject) => {
        return Object.values(cardObject.clicked).some(click => click.playerId === playerId);
    }

    const returnPlayer = () => {
        return Object.values(players).find(player => player.playerId === playerId);
    }

    const cardOnClick = (name) => {
        socket.current.send(JSON.stringify({
            type: "game",
            roomId: roomId,
            data: {
                type: "cardOnClick",
                cardName: name,
                roomId: roomId
            }
        }))
    }

    const rematch = () => {
        console.log("wysyłam skarpete o rematch");
        socket.current.send(JSON.stringify({
            type: "rematch",
            roomId: roomId
        }));
    }

    const leave = () => {
        socket.current.onclose = () => {};
        socket.current.close();
        setSocketConnected(false);
        navigate("/rooms");
        clearTimeout(timeoutNumber.current);
    }

    const connect = () => {
        socket.current = new WebSocket("ws://localhost:5000");
        
        socket.current.onopen = () => {
            console.log("Connected socket main component");
            setSocketConnected(true);

            connectionTimeout.current = 250;
            console.log("wysylam newplayerinroom");
            console.log("roomid: ", roomId);

            socket.current.send(JSON.stringify({
                type: "newPlayerInRoom",
                username: username,
                roomId: roomId,  
            }));
        }

        socket.current.onclose = (event) => {
            console.log("Trying to reconnect, ", event.reason);
            setSocketConnected(false);

            timeoutNumber.current = setTimeout(reConnect, connectionTimeout.current)
        }

        socket.current.onerror = (err) => {
            console.error("Error, closing socket");
            setSocketConnected(false);
            socket.current.close();
        }

        socket.current.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log("data:", data);

            const type = data.type;
            const content = data.content;

            switch(type) {
                case "playerId": {
                    console.log("ustawiam id");
                    setPlayerId(content);
                    break;
                }

                case "playerJoinError": {
                    console.log("błąd dodania");
                    socket.current.onclose = () => {};
                    socket.current.close();
                    setSocketConnected(false);
                    setAddPlayerError(content)
                    navigate("/rooms");
                    break;
                }

                case "players": {
                    console.log("ustawiam graczy");
                    setPlayers(content);
                    break;
                }

                case "redirectToGame": {
                    console.log("przekierowywuję graczy");
                    const info = content.initialInfo;
                    navigate(`/${content.roomId}/game`);

                    setCardsOnTable(info.cardsOnTable);
                    setCardsLeft(DECK_AMOUNT - info.cardsUsed);
                    setGameStartTime(info.startTime);
                    console.log("start time: ", info.startTime);
                    setGamemode(info.gamemode);

                    setGameId(content.gameId);

                    setIsGameOver(false);

                    break;
                }

                case "cardClicked": {
                    console.log("kliknięto kartę");
                    setCardsOnTable(content);
                    break;
                }

                case "error": {
                    console.log("sussy bakka");
                    
                    switch(content.message) {
                        case "cardNotOnTable":
                            setCardNotOnTable(content.message);
                            break;
                        case "":
                            break;
                    }
                    
                    break;
                }
                
                case "gotSet": {
                    console.log("info z okazji seta");
                    setCardsLeft(DECK_AMOUNT - content.cardsUsed);
                    setIsGameOver(content.isGameOver);
                    if (content.isGameOver) {
                        setGameOverTime(content.time);
                        console.log("over time: ", content.time);
                    }
                    break;
                }

                case "rematch": {
                    console.log("ja chce jeszcze raz");
                    navigate(`${roomId}/wait`);
                    setIsGameOver(false);
                    break;
                }

                default: {
                    console.log("sth went wrong");
                    break;
                }
            }
        }
    }

    useEffect(() => {
        stupidTimeoutNumber.current = setTimeout(() => {
            connect();
            stupidTimeoutNumber.current = null;
        }, 500);

        return () => {
            if (stupidTimeoutNumber.current) {
                clearTimeout(stupidTimeoutNumber.current);
            } else {
                leave();
            }
        }
    }, [])

    const reConnect = () => {
        timeoutNumber.current = null;
        if (!socketConnected) {
            connect();
        }
    }

    console.log("roomId: ", roomId);

    return <GameContext.Provider
        value = {{
            socket,
            socketConnected,

            roomId,
            players,
            
            cardsOnTable,
            cardsLeft,
            cardOnClick,

            gameId,
            gamemode,
            aaamI,
            returnPlayer,
            isGameOver,
            gameStartTime,
            gameOverTime,
            rematch,
            leave,
        }}
    >
        <Outlet/>
    </GameContext.Provider>
}