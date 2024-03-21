"use strict";
/*
  Manages WebSocket connections for rooms: creation, deletion, joining, and message handling.
  Interacts with RoomDatabase for room and player state management.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoomSocketConnections = void 0;
const RoomDatabase_1 = require("../databases/RoomDatabase");
const RoomUtils_1 = require("../utils/RoomUtils");
const handleRoomSocketConnections = (io) => {
    io.on('connection', (socket) => {
        socket.on('message', (action, roomID, displayName) => {
            handleClientMessage(io, socket, action, roomID, displayName);
        });
        socket.on('disconnect', () => {
            console.log(socket.id + 'disconnected from room socket');
            handleDisconnect(io, socket);
        });
    });
};
exports.handleRoomSocketConnections = handleRoomSocketConnections;
const handleClientMessage = (io, socket, action, roomID, displayName) => {
    console.log('Recieved request from frontend:', action);
    switch (action) {
        case 'createRoom':
            handleCreateRoom(socket);
            break;
        case 'joinRoom':
            handleJoinRoom(io, socket, roomID, displayName);
            break;
        case 'getName':
            handleGetName(socket);
            break;
        default:
            socket.emit('message', action);
            console.log(action);
            break;
    }
};
const handleGetName = (socket) => {
    const name = RoomDatabase_1.RoomDatabase.findPlayerNameByPlayerID(socket.id);
    socket.emit('name', name);
};
const handleCreateRoom = (socket) => {
    const room = (0, RoomUtils_1.createRoom)(socket.id);
    RoomDatabase_1.RoomDatabase.addRoom(room);
    socket.emit('room code', room.roomID);
    console.log(RoomDatabase_1.roomDatabase);
};
const handleJoinRoom = (io, socket, roomID, displayName) => {
    const player = (0, RoomUtils_1.createPlayer)(socket.id, displayName);
    const room = RoomDatabase_1.RoomDatabase.findRoomByID(roomID);
    if (!room) {
        socket.emit('errorMessage', 'Room not found');
        console.log('Room not found');
        return;
    }
    const existingPlayer = room.players.find(player => player.displayName === displayName);
    if (existingPlayer) {
        console.log('Player with the same name already exists');
        socket.emit('errorMessage', 'Name in use');
        return;
    }
    room.players.push(player);
    RoomDatabase_1.RoomDatabase.addPlayerToRoomMap(socket.id, roomID);
    const hostSocket = findHostSocket(io, roomID);
    if (hostSocket) {
        console.log(player.displayName + ' joined the lobby');
        socket.emit('joinRoom', player.displayName);
        hostSocket.emit('playerJoined', player.displayName);
    }
    else {
        console.log('Host socket not found');
    }
};
const handleDisconnect = (io, socket) => {
    // Check if the disconnected socket is a host
    const roomID = RoomDatabase_1.RoomDatabase.getRoomIDByHostID(socket.id);
    if (roomID) {
        console.log('Host socket disconnected, removing room: ' + roomID);
        RoomDatabase_1.RoomDatabase.removeRoomById(roomID);
    }
    else {
        // Check if the disconnected socket is a player
        const room = RoomDatabase_1.RoomDatabase.findRoomByPlayerID(socket.id);
        if (room) {
            console.log('Player disconnected from room ' + room.roomID);
            // Remove the player from the room
            const playerIndex = room.players.findIndex(p => p.ID === socket.id);
            if (playerIndex !== -1) {
                const playerName = room.players[playerIndex].displayName;
                room.players.splice(playerIndex, 1);
                const hostSocket = findHostSocket(io, room.roomID);
                if (hostSocket) {
                    hostSocket.emit('playerLeft', playerName);
                }
            }
        }
    }
};
const findHostSocket = (io, roomID) => {
    const room = RoomDatabase_1.RoomDatabase.findRoomByID(roomID);
    if (room && room.hostID) {
        return io.sockets.sockets.get(room.hostID);
    }
    return undefined;
};
//# sourceMappingURL=RoomController.js.map