const { Room } = require('./room');
const { Player } = require('./player');

class Rooms {
    rooms;
    
    constructor() {
        this.rooms = {};
    }

    toJSONPreview = () => {
        return JSON.stringify(
            Object.values(this.rooms)
            .filter((room) => Object.keys(room.players).length > 0)
            .map((room) => ({
                roomId: room.roomId,
                name: room.name,
                gamemode: room.gamemode,
                game: room.game ? true : false,
                players: Object.values(room.players).map(player => ({
                    username: player.username,
                    colorNumber: player.colorNumber
                })),
            }))
        )
    }

    addRoomAssembled = (room) => {
        if (this.rooms.hasOwnProperty(room.roomId)) {
            return;
        }

        this.rooms[room.roomId] = room;

        setTimeout(() => {
            if (Object.entries(room.players).length == 0) {
                this.removeRoom(room.roomId);
            }
        }, 5000);
    }

    addRoomDisassembled = (roomId, name, gamemode) => {
        const room = new Room(roomId, name, gamemode);
        
        this.addRoomAssembled(room);
    }

    #isIdOK = (roomId) => {
        if (!this.rooms.hasOwnProperty(roomId)) {
            console.log("Wrong id");
            
            return false;
        }

        return true;
    }

    returnRoom = (roomId) => {
        if (!this.#isIdOK(roomId)) {
            return null;
        }

        return this.rooms[roomId];
    }

    removeRoom = (roomId) => {
        if (!this.#isIdOK(roomId)) {
            return;
        }

        delete this.rooms[roomId];
    }
}

const rooms = new Rooms();

module.exports = rooms;