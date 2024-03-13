"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomDatabase = exports.roomDatabase = void 0;
exports.roomDatabase = [];
const playerRoomMap = {};
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
    addPlayerToRoomMap(playerID, roomID) {
        playerRoomMap[playerID] = roomID;
    },
    // Find room by player ID
    findRoomByPlayerID(playerID) {
        const roomID = playerRoomMap[playerID];
        if (roomID) {
            return exports.roomDatabase.find(room => room.roomID === roomID);
        }
        return undefined;
    },
    // Remove player from room map
    removePlayerFromRoomMap(playerID) {
        delete playerRoomMap[playerID];
    },
};
//# sourceMappingURL=RoomDatabase.js.map