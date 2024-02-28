"use strict";
// This controller manages the creation, deletion, and retrieval of rooms. 
// It defines endpoints or functions to handle requests related to rooms,
// such as creating a new room, deleting an existing room, and fetching room data.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoomSocketConnections = void 0;
const RoomDatabase_1 = require("../databases/RoomDatabase");
const CodeGenerator_1 = require("../utils/CodeGenerator");
const handleRoomSocketConnections = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected to room socket');
        socket.on('message', (data) => {
            console.log('Received request from frontend:', data);
            if (data === 'create new room') {
                const room = createRoom();
                RoomDatabase_1.RoomDatabase.addRoom(room);
                console.log('room code:', room.roomID);
                socket.emit('room code', room.roomID);
                console.log(RoomDatabase_1.roomDatabase);
            }
            else
                socket.emit('message', data);
        });
        socket.on('disconnect', () => {
            console.log('User disconnected from room socket');
        });
    });
};
exports.handleRoomSocketConnections = handleRoomSocketConnections;
const createRoom = () => {
    const roomID = (0, CodeGenerator_1.generateUniqueRoomID)();
    const players = [];
    const room = {
        roomID,
        players
    };
    return room;
};
//# sourceMappingURL=RoomController.js.map