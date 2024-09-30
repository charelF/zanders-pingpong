export interface Game {
    id: number;
    dt: string;
    winner_id: number;
    winner: string;
    loser_id: number;
    loser: string;
}

export interface Ranking {
    username: string;
    score: number;
    total: number;
}

