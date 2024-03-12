import { Room } from "../models/RoomModel";
import { Player } from "../models/PlayerModel";

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

    // Get room ID by host ID
    getRoomIDByHostID(hostID: string): string | undefined {
        const room = roomDatabase.find(room => room.hostID === hostID);
        return room ? room.roomID : undefined;
    },

    // Find player by socket ID
    findPlayerBySocketID(socketID: string): Player | undefined {
        let player: Player | undefined;
        roomDatabase.forEach(room => {
            const foundPlayer = room.players.find(player => player.ID === socketID);
            if (foundPlayer) {
                player = foundPlayer;
            }
        });
        return player;
    },

    // Remove player by ID
    removePlayer(playerID: string): void {
        roomDatabase.forEach(room => {
            const index = room.players.findIndex(player => player.ID === playerID);
            if (index !== -1) {
                room.players.splice(index, 1);
            }
        });
    }
}