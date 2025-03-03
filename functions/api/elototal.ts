interface Env {
    DB: D1Database;
}

import type { Ranking, Game } from "../../src/models";
import { getQuarter } from "../../src/utils"

function computeElo(games: Game[]): Ranking[] {
    const K = 32;  // K-factor for Elo calculation
    const initialElo = 1500;  // Initial Elo score for new players

    // A map to track each player's data (Elo score, games played, wins)
    const playerStats: Record<string, { score: number; total: number }> = {};

    // Helper function to get or initialize a player's stats
    const getPlayerStats = (username: string) => {
        if (!playerStats[username]) {
            playerStats[username] = { score: initialElo, total: 0 };
        }
        return playerStats[username];
    };


    // Get the current quarter
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentQuarter = getQuarter(currentDate);

    // Filter the games to include only those from the current quarter
    const currentQuarterGames = games  // no, use all games


    // Iterate over each game to update Elo ratings
    currentQuarterGames.forEach((game) => {
        const winnerStats = getPlayerStats(game.winner);
        const loserStats = getPlayerStats(game.loser);

        const expectedWinnerScore = 1 / (1 + Math.pow(10, (loserStats.score - winnerStats.score) / 400));
        const expectedLoserScore = 1 / (1 + Math.pow(10, (winnerStats.score - loserStats.score) / 400));

        winnerStats.score += K * (1 - expectedWinnerScore);  // 1 for win
        loserStats.score += K * (0 - expectedLoserScore);    // 0 for loss
        winnerStats.total += 1;
        loserStats.total += 1;
    });

    // Convert playerStats map into a list of rankings
    const rankings: Ranking[] = Object.keys(playerStats).map((username) => {
        const stats = playerStats[username];
        return {
            username,
            score: Math.round(stats.score),
            total: -1 // hehe otherwise liam hates me
        };
    });

    rankings.sort((a, b) => b.score - a.score);
    return rankings;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const { searchParams } = new URL(context.request.url);
    const amount = parseInt(searchParams.get('limit') ?? '10000', 10);

    const ps = context.env.DB.prepare(`
        SELECT 
            games.id,
            games.dt,
            winner_user.id AS winner_id,
            winner_user.username AS winner,
            loser_user.id AS loser_id,
            loser_user.username AS loser
        FROM 
            games
        JOIN 
            users AS winner_user ON games.winner = winner_user.id
        JOIN 
            users AS loser_user ON games.loser = loser_user.id
        ORDER BY 
            games.dt DESC
        LIMIT ?
    `).bind(amount);
    const { results } = await ps.all<Game>();
    const elo = computeElo(results)
    return Response.json(elo)
};