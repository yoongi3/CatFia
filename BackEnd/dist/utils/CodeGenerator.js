"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueRoomID = void 0;
const RoomDatabase_1 = require("../databases/RoomDatabase");
const generateUniqueRoomID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    do {
        code = Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    } while (RoomDatabase_1.RoomDatabase.findRoomByID(code));
    return code;
};
exports.generateUniqueRoomID = generateUniqueRoomID;
//# sourceMappingURL=CodeGenerator.js.map