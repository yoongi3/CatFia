"use strict";
/*
  Manages room and player state, providing functions for adding, finding, and removing rooms,
  as well as associating players with rooms and querying rooms by player ID.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomDatabase = exports.roomDatabase = void 0;
exports.roomDatabase = [];
const playerRoomMap = {};
exports.RoomDatabase = {
    // Add room to database
    addRoom(room) {
        exports.roomDatabase.push(room);
    },
    // Find room by ID
    findRoomByID(roomID) {
        return exports.roomDatabase.find(room => room.roomID === roomID);
    },
    // Delete room by ID
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
    // Associate player with room
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
    // Find player name by player ID
    findPlayerNameByPlayerID(playerID) {
        const roomID = playerRoomMap[playerID];
        const room = roomID && exports.roomDatabase.find(room => room.roomID === roomID);
        const player = room === null || room === void 0 ? void 0 : room.players.find(player => player.ID === playerID);
        return player === null || player === void 0 ? void 0 : player.displayName;
    },
};
//# sourceMappingURL=RoomDatabase.js.map