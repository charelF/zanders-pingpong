<template>
    <GameTable :games="games" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import GameTable from './components/GameTable.vue';

interface Game {
    winner: string;
    loser: string;
    dt: string;
}

const games = ref<Game[]>([]);

const fetchGameData = async (): Promise<void> => {
    const response = await fetch('https://rq-pingpong.pages.dev/api/games');
    games.value = await response.json();
};

onMounted(() => {
    fetchGameData();
});
</script>

<style>
th,
td {
    text-align: left;
    padding-right: 20px;
}
</style>