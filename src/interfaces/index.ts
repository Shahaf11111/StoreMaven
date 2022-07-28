export interface User {
    _id: string;
    username: string;
    score: number;
}

export interface Score {
    username: string;
    score: number;
}

interface Response {
    data: any;
    message: string;
}

export interface UserResponse extends Response {
    data: User;
}

export interface LeaderboardResponse extends Response {
    data: Score[];
}

export interface ScoreUpdateResponse extends Response {
    data: number | null;
    message: string;
}

export interface IMenuItem {
    title: string;
    action: Function;
}

export enum Side {
    left = "left",
    right = "right",
}

export interface Size {
    width: number;
    height: number;
}
