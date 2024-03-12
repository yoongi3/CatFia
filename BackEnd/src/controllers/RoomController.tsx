// This controller manages the creation, deletion, and retrieval of rooms. 
// It defines endpoints or functions to handle requests related to rooms,
// such as creating a new room, deleting an existing room, and fetching room data.

import { Server, Socket } from "socket.io";
import { RoomDatabase, roomDatabase } from "../databases/RoomDatabase";
import { createRoom, createPlayer } from "../utils/RoomUtils";

export const handleRoomSocketConnections = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        socket.on('message', (action: string, roomID: string, displayName: string) => {
            handleMessage(io, socket, action, roomID, displayName);
        });

        socket.on('disconnect', () => {
            console.log(socket.id +'disconnected from room socket');
            handleDisconnect(socket);
        });
    });
}

const handleMessage = (io:Server, socket: Socket, action: string, roomID: string, displayName:string) => {
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
    console.log(room)

    const hostSocket = findHostSocket(io, roomID);
    if (hostSocket) {
        console.log(player.displayName + 'joined the lobby')
        console.log('socket: ' + player.ID)
        hostSocket.emit('playerJoined', player.displayName);
    } else {
        console.log('Host socket not found');
    }
    
}

const handleDisconnect = (socket: Socket) => {
    // If socket is a host ID delete from RoomDB
    const roomID = RoomDatabase.getRoomIDByHostID(socket.id);
    if (roomID) {
        console.log('Host socket disconnected, removing room ' + roomID);
        RoomDatabase.removeRoomById(roomID);
    }
    // If socket is a player ID remove from room
    else {
        const player = RoomDatabase.findPlayerBySocketID(socket.id);
        if (player) {
            console.log(player.displayName + ' disconnected');
            RoomDatabase.removePlayer(player.ID);
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