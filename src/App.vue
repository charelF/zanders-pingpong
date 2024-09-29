<template>
    <div class="flex items-center justify-center p-4">
        <div class="w-full md:w-2/3 lg:w-2/4 overflow-x-auto space-y-4">
            <GameTable :games="games" />
            <Leaderboard :rankings="rankings" />
        </div>
    </div>


</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import GameTable from './components/GameTable.vue';
import Leaderboard from './components/Leaderboard.vue';
import type { Game, Ranking } from "@/models.ts"


const games = ref<Game[]>([]);
const rankings = ref<Ranking[]>([{ username: "charel", score: 1234, winpct: 1 }]);

const fetchGameData = async (): Promise<void> => {
    const response = await fetch('https://rq-pingpong.pages.dev/api/games?limit=5');
    games.value = await response.json();
};

onMounted(() => {
    fetchGameData();
});
</script>