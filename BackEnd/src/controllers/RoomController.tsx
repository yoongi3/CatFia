// This controller manages the creation, deletion, and retrieval of rooms. 
// It defines endpoints or functions to handle requests related to rooms,
// such as creating a new room, deleting an existing room, and fetching room data.

import { Server } from "socket.io";
import { RoomDatabase, roomDatabase } from "../databases/RoomDatabase";
import { Room } from "../models/RoomModel";
import { Player } from "../models/PlayerModel";
import { generateUniqueRoomID } from "../utils/CodeGenerator";

export const handleRoomSocketConnections = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('A user connected to room socket');
    
        socket.on('message', (data) => {
        console.log('Received request from frontend:', data);
        if (data === 'create new room'){
            const room = createRoom();
            RoomDatabase.addRoom(room);
            console.log('room code:', room.roomID)
            socket.emit('room code', room.roomID);
            console.log(roomDatabase)
        }
        else socket.emit('message', data);
        });
    
        socket.on('disconnect', () => {
        console.log('User disconnected from room socket');
        });
    });
}

const createRoom = (): Room => {
    const roomID: string = generateUniqueRoomID();
    const players: Player[] = [];

    const room: Room = {
        roomID,
        players
    };
    return room
}
