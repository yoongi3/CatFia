import { RoomDatabase } from "../databases/RoomDatabase";

export const generateUniqueRoomID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    do {
        code = Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    } while (RoomDatabase.findRoomByID(code));
    return code;
}
export const generateUniquePlayerID = () => {
    // change to proper generator later
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    do {
        code = Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    } while (RoomDatabase.findRoomByID(code));
    return code;
}