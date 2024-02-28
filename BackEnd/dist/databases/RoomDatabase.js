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
};
//# sourceMappingURL=RoomDatabase.js.map