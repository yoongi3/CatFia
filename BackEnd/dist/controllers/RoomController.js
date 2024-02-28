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
        socket.on('message', (action, roomID, displayName) => {
            console.log('Received request from frontend:', action);
            if (action === 'createRoom') {
                const room = createRoom();
                RoomDatabase_1.RoomDatabase.addRoom(room);
                socket.emit('room code', room.roomID);
                console.log(RoomDatabase_1.roomDatabase);
            }
            else if (action === 'joinRoom') {
                const player = createPlayer(displayName);
                const room = RoomDatabase_1.RoomDatabase.findRoomByID(roomID);
                if (room) {
                    const existingPlayer = room.players.find(player => player.displayName === displayName);
                    if (existingPlayer) {
                        console.log('find new name');
                    }
                    else {
                        room.players.push(player);
                        console.log(room);
                    }
                }
                else {
                    console.log('room not found');
                }
            }
            else
                socket.emit('message', action);
        });
        socket.on('disconnect', () => {
            console.log('User disconnected from room socket');
        });
    });
};
exports.handleRoomSocketConnections = handleRoomSocketConnections;
const createPlayer = (name) => {
    const playerID = (0, CodeGenerator_1.generateUniquePlayerID)();
    const displayName = name;
    const player = {
        playerID,
        displayName
    };
    return player;
};
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