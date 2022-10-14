import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Outlet, useLocation, matchRoutes } from "react-router-dom";
import { UsernameContext } from "./App";
import { ErrorContext } from "./errors";
import { GameContext } from "./gameContext";

const routes = [{ path: "/:roomId/game" }, {path: "/:roomId/wait"}];

export function Sockets() {
    const {
        setIsMessageOn,
        setCurrentMessage,
        setCurrentSeverity
    }  = useContext(ErrorContext);

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
    console.log("route: ", route);
    const connectionTimeout = useRef(1000);
    const timeoutNumber = useRef(null);

    const stupidTimeoutNumber = useRef(null);

    const { username } = useContext(UsernameContext);

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
        socket.current = new WebSocket(`wss://${window.location.hostname}`);
        //socket.current = new WebSocket(`ws://localhost:5000`);
        
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

                case "madeHost": {
                    console.log("host");
                    setIsMessageOn(true);
                    setCurrentMessage("U r boz now");
                    setCurrentSeverity("info");

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

                    setIsMessageOn(true);
                    setCurrentSeverity("error");
                    
                    switch(content) {
                        case "wrongRoomId": {
                            setCurrentMessage("Bad kitteh bed number!");
                            leave();
                            break;
                        }
                        case "gameOnGoing": {
                            setCurrentMessage("Kittehz pluying!");
                            leave();
                            break;
                        }
                        case "playerLimitExceeded": {
                            setCurrentMessage("2 lotz da kittehz!");
                            leave();
                            break;
                        }
                        case "cardNotOnTable":
                            setCurrentMessage("Da hell dude");
                            break;
                        case "startNotByHost": {
                            setCurrentMessage("Othr kitteh iz bos");
                            break;
                        }
                        default:
                            console.log("content: ", content);
                            setCurrentMessage(content);
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
        console.log("xddddddddddd");

        if (route.path === "/:roomId/game" && socket.current === null) {
            setIsMessageOn(true);
            setCurrentMessage("Left gaem");
            setCurrentSeverity("info");
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


    console.log("soket: ", socket.current);
    console.log("route path: ", route.path);

    console.log("jebany if: ", route.path === "/:roomId/game", socket.current === null);

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