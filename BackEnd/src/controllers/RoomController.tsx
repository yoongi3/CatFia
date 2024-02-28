// This controller manages the creation, deletion, and retrieval of rooms. 
// It defines endpoints or functions to handle requests related to rooms,
// such as creating a new room, deleting an existing room, and fetching room data.

import { Server } from "socket.io";
import { RoomDatabase, roomDatabase } from "../databases/RoomDatabase";
import { Room } from "../models/RoomModel";
import { Player } from "../models/PlayerModel";
import { generateUniquePlayerID, generateUniqueRoomID } from "../utils/CodeGenerator";

export const handleRoomSocketConnections = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('A user connected to room socket');
    
        socket.on('message', (action, roomID, displayName) => {
        console.log('Received request from frontend:', action);

        if (action === 'createRoom'){
            const room = createRoom();
            RoomDatabase.addRoom(room);
            socket.emit('room code', room.roomID);
            console.log(roomDatabase)
        }

        else if(action === 'joinRoom'){
            const player = createPlayer(displayName);
            const room = RoomDatabase.findRoomByID(roomID);
            if (room) {
                const existingPlayer = room.players.find(player => player.displayName === displayName);
                if (existingPlayer) {
                    console.log('find new name');
                }
                else{
                    room.players.push(player)
                    console.log(room)
                }
            }
            else{
                console.log('room not found')
            }
        }
        else socket.emit('message', action);
        });
    
        socket.on('disconnect', () => {
        console.log('User disconnected from room socket');
        });
    });
}
const createPlayer = (name: string): Player => {
    const playerID: string = generateUniquePlayerID();
    const displayName: string = name;
    const player: Player = {
        playerID,
        displayName
    }; return player;
}
const createRoom = (): Room => {
    const roomID: string = generateUniqueRoomID();
    const players: Player[] = [];

    const room: Room = {
        roomID,
        players
    }; return room
}
