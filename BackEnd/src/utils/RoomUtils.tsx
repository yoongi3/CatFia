import { Player } from "../models/PlayerModel";
import { Room } from "../models/RoomModel";

import { generateUniquePlayerID, generateUniqueRoomID } from "./CodeGenerator";

export const createPlayer = (name: string): Player => {
    const playerID: string = generateUniquePlayerID();
    const displayName: string = name;
    const player: Player = {
        playerID,
        displayName
    }; return player;
}

export const createRoom = (hostSocketID: string): Room => {
    const roomID: string = generateUniqueRoomID();
    const players: Player[] = [];
    const hostID: string = hostSocketID;

    const room: Room = {
        roomID,
        players,
        hostID,
    }; return room
}
