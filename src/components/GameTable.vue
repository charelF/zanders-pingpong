<template>
    <div class="font-mono bg-zg1/20 text-zg2 pb-2">
        <table id="gameTable" class="table-auto w-full">
            <thead class="bg-zg1">
                <tr>
                    <th class="py-2 pl-2 pr-2 text-right">Winner</th>
                    <th></th>
                    <th class="pr-5 pr-5 text-left">Loser</th>
                    <th class="pr-2 text-left">Date</th>
                </tr>
            </thead>
            <p class="pt-1"></p>
            <tbody>
                <tr v-for="game in games" :key="game.dt">
                    <td class="pl-2 pr-2 text-right font-bold">{{ game.winner }}</td>
                    <td>-</td>
                    <td class="pr-5">{{ game.loser }}</td>
                    <td class="pr-2">{{ formatDate(game.dt) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import type {Game} from "@/models.ts"

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('nl-NL', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
};

defineProps<{
    games: Game[]
}>();
</script>