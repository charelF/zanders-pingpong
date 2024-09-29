export interface Game {
    winner: string;
    loser: string;
    dt: string;
}

export interface Ranking {
    username: string;
    score: number;
    winpct: number;
}