import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Outlet, useLocation, matchRoutes } from "react-router-dom";
import { ErrorContext } from "./errors";
import { GameContext } from "./gameContext";

const routes = [{ path: "/:roomId/game" }, {path: "/:roomId/wait"}];

export function Sockets() {
    const { setSnackbar } = useContext(ErrorContext);

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
    const location = useLocation();
    const [{ route }] = matchRoutes(routes, location);
    const connectionTimeout = useRef(1000);
    const timeoutNumber = useRef(null);

    const stupidTimeoutNumber = useRef(null);

    const amI = (cardObject) => {
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
        socket.current = new WebSocket(`wss://${window.location.hostname}`);
        //socket.current = new WebSocket(`ws://localhost:5000`);
        
        socket.current.onopen = () => {
            console.log("Connected socket main component");
            setSocketConnected(true);

            connectionTimeout.current = 250;

            socket.current.send(JSON.stringify({
                type: "newPlayerInRoom",
                username: localStorage.getItem("username"),
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
                    setPlayerId(content);

                    break;
                }

                case "madeHost": {
                    setSnackbar("U r bos now", "info");

                    break;
                }

                case "players": {
                    setPlayers(content);
                    break;
                }

                case "redirectToGame": {
                    const info = content.initialInfo;
                    navigate(`/${content.roomId}/game`);

                    setCardsOnTable(info.cardsOnTable);
                    setCardsLeft(DECK_AMOUNT - info.cardsUsed);
                    setGameStartTime(info.startTime);
                    setGamemode(info.gamemode);

                    setGameId(content.gameId);

                    setIsGameOver(false);

                    break;
                }

                case "cardClicked": {
                    setCardsOnTable(content);

                    break;
                }

                case "error": {
                    switch(content) {
                        case "wrongRoomId": {
                            setSnackbar("Bad kitteh bed number!", "error");
                            leave();
                            break;
                        }
                        case "gameOnGoing": {
                            setSnackbar("Kittehz pluying!", "error");
                            leave();
                            break;
                        }
                        case "playerLimitExceeded": {
                            setSnackbar("2 lotz da kittehz!", "error");
                            leave();
                            break;
                        }
                        case "cardNotOnTable":
                            setSnackbar("Da hell dude", "error");
                            break;
                        case "startNotByHost": {
                            setSnackbar("Othr kitteh iz bos", "error");
                            break;
                        }
                        default:
                            console.log("content: ", content);
                            setSnackbar(content, "error");
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
        if (route.path === "/:roomId/game" && socket.current === null) {
            setSnackbar("Left gaem", "info");
            navigate("/rooms");
            return;
        }

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
            amI,
            returnPlayer,
            isGameOver,
            gameStartTime,
            gameOverTime,
            rematch,
            leave,
        }}
    >
        {route.path === "/:roomId/game" && socket.current === null ? <div></div> : <Outlet/>}
    </GameContext.Provider>
}