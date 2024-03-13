/*  
  Manages WebSocket connections for rooms: creation, deletion, joining, and message handling.
  Interacts with RoomDatabase for room and player state management. 
*/

import { Server, Socket } from "socket.io";
import { RoomDatabase, roomDatabase } from "../databases/RoomDatabase";
import { createRoom, createPlayer } from "../utils/RoomUtils";

export const handleRoomSocketConnections = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        socket.on('message', (action: string, roomID: string, displayName: string) => {
            handleClientMessage(io, socket, action, roomID, displayName);
        });

        socket.on('disconnect', () => {
            console.log(socket.id +'disconnected from room socket');
            handleDisconnect(io, socket);
        });
    });
}

const handleClientMessage = (io:Server, socket: Socket, action: string, roomID: string, displayName:string) => {
    console.log('Recieved request from frontend:', action)

    switch (action) {
        case 'createRoom':
            handleCreateRoom(socket);
            break;
        case 'joinRoom':
            handleJoinRoom(io, socket, roomID, displayName);
            break;
        default:
            socket.emit('message', action);
            break;
    }
}

const handleCreateRoom = (socket: Socket,) => {
    const room = createRoom(socket.id);
    RoomDatabase.addRoom(room);
    socket.emit('room code', room.roomID);
    console.log(roomDatabase)
}

const handleJoinRoom = (io: Server, socket: Socket, roomID: string, displayName: string) => {
    const player = createPlayer(socket.id, displayName);
    const room = RoomDatabase.findRoomByID(roomID);

    if(!room) {
        console.log('Room not found');
        return;
    }
    
    const existingPlayer = room.players.find(player => player.displayName === displayName);

    if (existingPlayer) {
        console.log('Player with the same name already exists');
        // Handle error message
        return;
    }
    
    room.players.push(player)
    RoomDatabase.addPlayerToRoomMap(socket.id, roomID);

    const hostSocket = findHostSocket(io, roomID);
    if (hostSocket) {
        console.log(player.displayName + ' joined the lobby')
        hostSocket.emit('playerJoined', player.displayName);
    } else {
        console.log('Host socket not found');
    }
}

const handleDisconnect = (io: Server, socket: Socket) => {
    // Check if the disconnected socket is a host
    const roomID = RoomDatabase.getRoomIDByHostID(socket.id);
    if (roomID) {
        console.log('Host socket disconnected, removing room ' + roomID);
        RoomDatabase.removeRoomById(roomID);
    } else {
        // Check if the disconnected socket is a player
        const room = RoomDatabase.findRoomByPlayerID(socket.id);
        if (room) {
            console.log('Player disconnected from room ' + room.roomID);
            // Remove the player from the room
            const playerIndex = room.players.findIndex(p => p.ID === socket.id);
            if (playerIndex !== -1) {
                const playerName = room.players[playerIndex].displayName
                room.players.splice(playerIndex, 1);
                const hostSocket = findHostSocket(io, room.roomID);
                if (hostSocket) {
                    hostSocket.emit('playerLeft', playerName);
                }
            }
        }
    }
}


const findHostSocket = (io:Server, roomID: string): Socket | undefined => {
    const room = RoomDatabase.findRoomByID(roomID);
    if (room && room.hostID) {
        return io.sockets.sockets.get(room.hostID);
    }
    return undefined;
}