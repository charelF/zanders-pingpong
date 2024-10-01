<template>
    <div>
        <h2 class="bg-zg2 text-zg1 p-2 text-xl font-bold text-center font-sans">⏳ Recent games</h2>

        <div class="bg-zg1/20 text-zg2 pb-1">
            <table id="gameTable" class="table-auto w-full">
                <thead class="bg-zg1">
                    <tr>
                        <th class="p-2 text-right">Winner</th>
                        <th class="p-2 text-left"></th>
                        <th class="p-2 text-left">Loser</th>
                        <th class="p-2 text-left">Date</th>
                        <th class="p-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="game in games" :key="game.dt">
                        <td class="px-2 py-1 text-right font-bold">{{ game.winner }}</td>
                        <td class="px-2 py-1 text-center">-</td>
                        <td class="px-2 py-1">{{ game.loser }}</td>
                        <td class="px-2 py-1">{{ formatDate(game.dt) }}</td>
                        <td class="px-2 py-1">
                            <button @click="deleteGame(game)" class="underline">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Game } from "@/models.ts"
import { defineEmits } from 'vue'

const emit = defineEmits(['gameDeleted']);

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('nl-NL', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
};

// Delete game function
const deleteGame = async (game: Game) => {
    const confirm = window.confirm(`Do you want to delete this game? ${game.winner} vs ${game.loser} at ${game.dt}`)
    if (!confirm) {
        return
    }
    const response = await fetch(`/api/games?id=${game.id}`, {method: 'DELETE',});
    try {
        if (response.ok) {
            emit('gameDeleted');
        } else {
            alert('Failed to delete game');
        }
    } catch (error) {
        console.error('Error deleting game:', error);
        alert('Error deleting game');
    }
};

defineProps<{
    games: Game[]
}>();
</script>