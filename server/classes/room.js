const { Game } = require("./game");
const { broadcastToPlayers, getPlayersInfo } = require("../utils");

class Room {
    #roomId;
    #name;
    #gamemode;
    #hostId;

    players;
    game;
    colors;

    constructor(roomId, name, gamemode) {
        this.#roomId = roomId;
        this.#name = name;
        this.#gamemode = gamemode;
        this.#hostId = "";

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

    get hostId() {
        return this.#hostId;
    }

    newGame = (players) => {
        console.log("nowa gra");
        this.game = new Game(players, this.#gamemode);

        Object.values(this.players).forEach(player => {
            player.resetForRematch();
        });
    }

    setHost = () => {
        console.log("setHost");
        const playerArray = Object.keys(this.players);
        if (playerArray.length == 0) {
            return;
        }

        const hostId = playerArray[0];
        this.#hostId = hostId;
        this.players[hostId].websocket.send(JSON.stringify({type: "madeHost"}));
    }

    addPlayer = (player) => {
        if (this.game !== null) {
            return { added: false, message: "gameOnGoing" };
        }

        const playerAmount = Object.keys(this.players).length;

        if (playerAmount === 6) {
            return { added: false, message: "playerLimitExceeded" };
        }

        player.websocket.roomId = this.#roomId;

        player.colorNumber = this.colors[Object.keys(this.players).length];
        this.players[player.playerId] = player;

        if (playerAmount == 0) {
            this.setHost();
        }

        broadcastToPlayers("players", getPlayersInfo(this.players), this.players);

        return { added: true, playerId: player.playerId };
    }

    removePlayer = (playerId) => {
        this.players[playerId].websocket.close();
        delete this.players[playerId];

        if (playerId == this.#hostId) {
            this.setHost();
        }

        broadcastToPlayers("players", getPlayersInfo(this.players), this.players);
    }
}

module.exports = { Room }