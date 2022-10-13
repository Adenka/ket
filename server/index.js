const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const {v4: uuidv4} = require("uuid");

const { Player } = require("./classes/player");

const app = express();
const PORT = process.env.PORT || 5000;

const wss = new WebSocket.Server({ noServer: true })

app.use(express.static(path.join(__dirname, "../", "set", "build")));
app.use(express.json());

let currentRooms = require("./classes/rooms");

wss.on("connection", (ws) => {
    console.log("Connection established");
    ws.isAlive = true;

    ws.on("pong", () => {
        ws.isAlive = true;
    })

    ws.on("message", (message) => {
        try {
            data = JSON.parse(message);
            type = data.type;

            const room = currentRooms.returnRoom(ws.roomId || data.roomId);

            switch(type) {
                case "newPlayerInRoom": {
                    const player = new Player(data.username, ws);
                    const addRes = room.addPlayer(player);

                    if (addRes.added) {
                        ws.send(JSON.stringify({type: "playerId", content: addRes.playerId}));
                    }
                    else {
                        ws.send(JSON.stringify({type: "playerJoinError", content: addRes.message}));
                    }

                    break;
                }

                case "redirectToGame": {
                    if (room.hostId != "" && ws.playerId != room.hostId) {
                        ws.send(JSON.stringify({
                            type: "error",
                            content: {message: "startNotByHost"}
                        }));

                        break;
                    }

                    room.newGame(room.players);
                    room.broadcastToRoom("players", room.getPlayersInfo())
                    const initialInfo = room.game.initialInfo();

                    console.log("INITIAL INFO:", initialInfo);
                    console.log("game id: ", room.game.gameId);
                    room.broadcastToRoom(
                        "redirectToGame",
                        {
                            roomId: data.roomId,
                            initialInfo: initialInfo,
                            gameId: room.game.gameId
                        }
                    );
                    break;
                }

                case "game": {
                    let dataToSend = data.data;
                    dataToSend.playerId = ws.playerId;

                    room.game.handleGameMessage(dataToSend);
                    break;
                }
                
                case "rematch": {
                    console.log("rematch a tu id: ", data.roomId);
                    room.game = null;

                    ws.send(JSON.stringify({
                        type: "rematch",
                        content: {}
                    }));
                    break;
                }
            }
        }
        catch (err) {
            ws.send(JSON.stringify({
                type: "error",
                content: {message: err}
            }));
        }
    })

    ws.on('close', () => {
        console.log("leef ", ws.roomId, ws.playerId);
        const room = currentRooms.returnRoom(ws.roomId);
        room.removePlayer(ws.playerId);

        if (Object.entries(room.players).length == 0) {
            currentRooms.removeRoom(ws.roomId);
        }
    })

    ws.send(JSON.stringify({state: "success"}));
})

const interval = setInterval(() => {
    //console.log("#sockets: ", wss.clients.size);
    wss.clients.forEach((ws) => {
        if (!ws.isAlive) {
            console.log("Connection lost");
            return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping(null, false, true);
    })
}, 10000);

wss.on("close", () => {
    clearInterval(interval);
})

app.post("/rooms", (req, res) => {
    res.send(currentRooms.toJSONPreview());
})

app.post("/newRoom", (req, res) => {
    const roomId = uuidv4();
    
    try {
        console.log("name: ", req.body);
        console.log("name: ", req.body.name);
        currentRooms.addRoomDisassembled(roomId, req.body.name, req.body.gamemode);
        
        //todo - timeout jeśli nikt nie wszedł
        res.json(roomId);
    }
    catch {
        res.json({message: "You fucking donkey"})
    }
})

app.post("/canPlayerJoin", (req, res) => {
    const room = currentRooms.returnRoom(req.body.roomId);

    if (!room) {
        res.json({addRes: false, message: "Room doesn't exist"});
    }

    if (room.players.length === 6) {
        res.json({addRes: false, message: "2 lotz da kittehz!"});
        return;
    }

    if (room.game !== null) {
        res.json({addRes: false, message: "Kittehz pluying!"});
        return;
    }

    res.json({addRes: true});
})

app.post("/*", (req, res) => {
    res.status(404).send({error: "Not found ;/"});
})

app.get("/*", (req, res) => {
    console.log(`Requested ${req.url}`);
    res.sendFile(path.join(__dirname, "../", "set", "build", "index.html"));
})

const server = app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});

server.on('upgrade', (request, socket, head) => {
    console.log('websocket attempt')
    wss.handleUpgrade(request, socket, head, socket => {
        wss.emit('connection', socket, request);
    });
});