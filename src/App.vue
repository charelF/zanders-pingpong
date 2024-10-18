<template>
    <div class="flex items-center justify-center font-mono">
        <div class="w-full md:w-2/3 lg:w-2/4 overflow-x-auto space-y-6">
            <NewGame @gameSubmitted="refreshGames" :users="users" />
            <Leaderboard :rankings="rankings" />
            <GameTable @gameDeleted="refreshGames":games="games" />
            <NewUser @userSubmitted="refreshUsers" :users="users" />
        </div>
    </div>


    


</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import GameTable from './components/GameTable.vue';
import Leaderboard from './components/Leaderboard.vue';
import NewGame from './components/NewGame.vue';
import type { Game, Ranking, User } from "@/models"
import NewUser from './components/NewUser.vue';

const games = ref<Game[]>([]);
const rankings = ref<Ranking[]>([]);
const users = ref<User[]>([]);

const fetchGames = async (): Promise<void> => {
    const response = await fetch('api/games2?limit=5');
    games.value = await response.json()
};

const fetchRankigns = async (): Promise<void> => {
    const response = await fetch('/api/elo');
    rankings.value = await response.json()
};

const fetchUsers = async (): Promise<void> => {
    const response = await fetch('api/users');
    users.value = await response.json();
};

// Fetch the games when the parent component is mounted
onMounted(() => {
    fetchGames();
    fetchRankigns();
    fetchUsers();
});

// Refresh the games list when a new game is submitted
const refreshGames = () => {
    fetchGames();
    fetchRankigns();
    fetchUsers();
};

const refreshUsers = () => {
    fetchGames();
    fetchRankigns();
    fetchUsers();
};

</script>