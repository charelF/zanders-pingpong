<template>
    <div class="font-mono bg-zg1/20 text-zg2 pb-2">
        <table id="gameTable" class="table-auto w-full">
            <thead class="bg-zg1">
                <tr>
                    <th class="p-2 pr-2 text-right">Winner</th>
                    <th class="p-2 pr-5">Loser</th>
                    <th class="p-2">Time</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="game in games" :key="game.dt">
                    <td class="pr-2 text-right font-bold">{{ game.winner }}</td>
                    <td class="pr-5">{{ game.loser }}</td>
                    <td class="">{{ formatDate(game.dt) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
interface Game {
    winner: string;
    loser: string;
    dt: string;
}

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('nl-NL', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
};

defineProps<{
    games: Game[]
}>();
</script>