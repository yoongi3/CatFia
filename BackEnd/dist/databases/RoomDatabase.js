"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomDatabase = exports.roomDatabase = void 0;
exports.roomDatabase = [];
// Functions to interact with the room database
exports.RoomDatabase = {
    // Add room to database
    addRoom(room) {
        exports.roomDatabase.push(room);
    },
    // Find room
    findRoomByID(roomID) {
        return exports.roomDatabase.find(room => room.roomID === roomID);
    },
    // Delete room
    removeRoomById(roomID) {
        const index = exports.roomDatabase.findIndex(room => room.roomID === roomID);
        if (index !== -1) {
            exports.roomDatabase.splice(index, 1);
        }
    },
    // Get room ID by host ID
    getRoomIDByHostID(hostID) {
        const room = exports.roomDatabase.find(room => room.hostID === hostID);
        return room ? room.roomID : undefined;
    },
    // Find player by socket ID
    findPlayerBySocketID(socketID) {
        let player;
        exports.roomDatabase.forEach(room => {
            const foundPlayer = room.players.find(player => player.ID === socketID);
            if (foundPlayer) {
                player = foundPlayer;
            }
        });
        return player;
    },
    // Remove player by ID
    removePlayer(playerID) {
        exports.roomDatabase.forEach(room => {
            const index = room.players.findIndex(player => player.ID === playerID);
            if (index !== -1) {
                room.players.splice(index, 1);
            }
        });
    }
};
//# sourceMappingURL=RoomDatabase.js.map