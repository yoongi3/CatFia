/*
  Manages room and player state, providing functions for adding, finding, and removing rooms,
  as well as associating players with rooms and querying rooms by player ID.
*/

import { Room } from "../models/RoomModel";

export const roomDatabase: Room[] = [];

const playerRoomMap: { [playerID: string]: string } = {};

export const RoomDatabase = {
    // Add room to database
    addRoom(room: Room): void {
        roomDatabase.push(room);
    },

    // Find room by ID
    findRoomByID(roomID: string): Room | undefined {
        return roomDatabase.find(room => room.roomID === roomID)
    },
    
    // Delete room by ID
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

    // Associate player with room
    addPlayerToRoomMap(playerID: string, roomID: string): void {
        playerRoomMap[playerID] = roomID;
    },

    // Find room by player ID
    findRoomByPlayerID(playerID: string): Room | undefined {
        const roomID = playerRoomMap[playerID];
        if (roomID) {
            return roomDatabase.find(room => room.roomID === roomID);
        }
        return undefined;
    },

    // Remove player from room map
    removePlayerFromRoomMap(playerID: string): void {
        delete playerRoomMap[playerID];
    },

    // Find player name by player ID
    findPlayerNameByPlayerID(playerID: string): string | undefined {
        const roomID = playerRoomMap[playerID];
        const room = roomID && roomDatabase.find(room => room.roomID === roomID);
        const player = room?.players.find(player => player.ID === playerID);
        return player?.displayName;
    },
}