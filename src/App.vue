<template>
    <div class="flex items-center justify-center p-4">
        <div class="w-full md:w-2/3 lg:w-2/4 overflow-x-auto space-y-4">
            <Leaderboard :rankings="rankings" />
            <GameTable :games="games" />
        </div>
    </div>


</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import GameTable from './components/GameTable.vue';
import Leaderboard from './components/Leaderboard.vue';
import type { Game, Ranking } from "@/models"
import { getQuarter } from "@/utils"

const games = ref<Game[]>([]);
const rankings = ref<Ranking[]>([]);

const fetchGames = async (): Promise<void> => {
    const response = await fetch('https://rq-pingpong.pages.dev/api/games?limit=5');
    games.value = await response.json();
};

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
    const currentQuarterGames = games.filter((game) => {
        const gameDate = new Date(game.dt);
        const gameYear = gameDate.getFullYear();
        const gameQuarter = getQuarter(gameDate);
        return gameYear === currentYear && gameQuarter === currentQuarter;
    });


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
            total: stats.total
        };
    });

    rankings.sort((a, b) => b.score - a.score);
    return rankings;
}



const fetchRankigns = async (): Promise<void> => {
    const response = await fetch('/elo');
    const response2 = await fetch('https://rq-pingpong.pages.dev/api/games?limit=100');
    rankings.value = computeElo(await response2.json())
};

onMounted(() => {
    fetchGames();
    fetchRankigns();
});
</script>