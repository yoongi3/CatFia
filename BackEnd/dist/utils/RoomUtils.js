"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = exports.createPlayer = void 0;
const CodeGenerator_1 = require("./CodeGenerator");
const createPlayer = (name) => {
    const playerID = (0, CodeGenerator_1.generateUniquePlayerID)();
    const displayName = name;
    const player = {
        playerID,
        displayName
    };
    return player;
};
exports.createPlayer = createPlayer;
const createRoom = (hostSocketID) => {
    const roomID = (0, CodeGenerator_1.generateUniqueRoomID)();
    const players = [];
    const hostID = hostSocketID;
    const room = {
        roomID,
        players,
        hostID,
    };
    return room;
};
exports.createRoom = createRoom;
//# sourceMappingURL=RoomUtils.js.map