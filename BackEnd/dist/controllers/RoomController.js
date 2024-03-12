"use strict";
// This controller manages the creation, deletion, and retrieval of rooms. 
// It defines endpoints or functions to handle requests related to rooms,
// such as creating a new room, deleting an existing room, and fetching room data.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoomSocketConnections = void 0;
const RoomDatabase_1 = require("../databases/RoomDatabase");
const RoomUtils_1 = require("../utils/RoomUtils");
const handleRoomSocketConnections = (io) => {
    io.on('connection', (socket) => {
        socket.on('message', (action, roomID, displayName) => {
            handleMessage(io, socket, action, roomID, displayName);
        });
        socket.on('disconnect', () => {
            console.log(socket.id + 'disconnected from room socket');
            handleDisconnect(socket);
        });
    });
};
exports.handleRoomSocketConnections = handleRoomSocketConnections;
const handleMessage = (io, socket, action, roomID, displayName) => {
    console.log('Recieved request from frontend:', action);
    switch (action) {
        case 'createRoom':
            handleCreateRoom(socket);
            break;
        case 'joinRoom':
            handleJoinRoom(io, socket, roomID, displayName);
            break;
        default:
            socket.emit('message', action);
            break;
    }
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
        console.log('Room not found');
        return;
    }
    const existingPlayer = room.players.find(player => player.displayName === displayName);
    if (existingPlayer) {
        console.log('Player with the same name already exists');
        // Handle error message
        return;
    }
    room.players.push(player);
    console.log(room);
    const hostSocket = findHostSocket(io, roomID);
    if (hostSocket) {
        console.log(player.displayName + 'joined the lobby');
        console.log('socket: ' + player.ID);
        hostSocket.emit('playerJoined', player.displayName);
    }
    else {
        console.log('Host socket not found');
    }
};
const handleDisconnect = (socket) => {
    // If socket is a host ID delete from RoomDB
    const roomID = RoomDatabase_1.RoomDatabase.getRoomIDByHostID(socket.id);
    if (roomID) {
        console.log('Host socket disconnected, removing room ' + roomID);
        RoomDatabase_1.RoomDatabase.removeRoomById(roomID);
    }
    // If socket is a player ID remove from room
    else {
        const player = RoomDatabase_1.RoomDatabase.findPlayerBySocketID(socket.id);
        if (player) {
            console.log(player.displayName + ' disconnected');
            RoomDatabase_1.RoomDatabase.removePlayer(player.ID);
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