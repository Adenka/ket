const broadcastToPlayers = (type, res, players) => {
    Object.values(players).forEach(player => {
        player.websocket.send(JSON.stringify({type: type, content: res}));
    });        
}

const getPlayersInfo = (players) => {
    return Object.values(players).map((player) => ({
        playerId: player.playerId,
        username: player.username,
        points: player.points,
        colorNumber: player.colorNumber
    }))
}

module.exports = { broadcastToPlayers, getPlayersInfo }