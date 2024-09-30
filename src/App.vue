<template>
    <div class="flex items-center justify-center">
        <div class="w-full md:w-2/3 lg:w-2/4 overflow-x-auto space-y-6">
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


const games = ref<Game[]>([]);
const rankings = ref<Ranking[]>([]);

const fetchGames = async (): Promise<void> => {
    const response = await fetch('api/games2?limit=5');
    games.value = await response.json()
};

const fetchRankigns = async (): Promise<void> => {
    const response = await fetch('/api/elo');
    rankings.value = await response.json()
};

onMounted(() => {
    fetchGames();
    fetchRankigns();
});
</script>