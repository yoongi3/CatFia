import { Room } from "../models/RoomModel";

export const roomDatabase: Room[] = [];

// Functions to interact with the room database
export const RoomDatabase = {
    // Add room to database
    addRoom(room: Room): void {
        roomDatabase.push(room);
    },

    // Find room
    findRoomByID(roomID: string): Room | undefined {
        return roomDatabase.find(room => room.roomID === roomID)
    },
    
    // Delete room
    removeRoomById(roomID: string): void {
        const index = roomDatabase.findIndex(room => room.roomID === roomID);
        if (index !== -1) {
          roomDatabase.splice(index, 1);
        }
    },
}