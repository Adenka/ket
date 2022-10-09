const { Game } = require("./game");

class Room {
    #roomId;
    #name;
    #gamemode;

    players;
    game;
    colors;

    constructor(roomId, name, gamemode) {
        this.#roomId = roomId;
        this.#name = name;
        this.#gamemode = gamemode;

        this.players = {};
        this.game = null;
        this.colors = [0, 1, 2, 3, 4, 5].sort((elem1, elem2) => 0.5 - Math.random());
    }

    get roomId() {
        return this.#roomId;
    }

    get name () {
        return this.#name;
    }

    get gamemode() {
        return this.#gamemode;
    }

    newGame = (players) => {
        console.log("nowa gra");
        this.game = new Game(players, this.#gamemode);

        Object.values(this.players).forEach(player => {
            player.resetForRematch();
        });
    }

    getPlayersInfo = () => {
        return Object.values(this.players).map((player) => ({
            playerId: player.playerId,
            username: player.username,
            points: player.points,
            colorNumber: player.colorNumber
        }))
    }

    broadcastToRoom = (type, res) => {
        Object.values(this.players).forEach(player => {
            player.websocket.send(JSON.stringify({type: type, content: res}));
        });        
    }

    addPlayer = (player) => {
        if (this.game !== null) {
            return { added: false, message: "Kittehz pluying!" };
        }

        if (this.players.length === 6) {
            return { added: false, message: "2 lotz da kittehz!" };
        }

        player.websocket.roomId = this.#roomId;

        player.colorNumber = this.colors[Object.keys(this.players).length];
        this.players[player.playerId] = player;

        this.broadcastToRoom("players", this.getPlayersInfo());

        return { added: true, playerId: player.playerId };
    }

    removePlayer = (playerId) => {
        this.players[playerId].websocket.close();
        delete this.players[playerId];

        this.broadcastToRoom("players", this.getPlayersInfo());
    }
}

module.exports = { Room }