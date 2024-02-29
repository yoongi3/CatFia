import { Player } from "./PlayerModel";

export type Room = {
    roomID: string;
    players: Player[];
    hostID: string;
}