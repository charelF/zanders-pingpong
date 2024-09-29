<template>
    <div class="font-mono bg-zg1/20 text-zg2 pb-2">
        <table id="gameTable" class="table-auto w-full">
            <thead class="bg-zg1">
                <tr>
                    <th class="py-2 pl-2 pr-2 text-left">User</th>
                    <th class="pr-5 pr-5 text-left">ELO</th>
                    <th class="pr-2 text-left">Win %</th>
                </tr>
            </thead>
            <p class="pt-1"></p>
            <tbody>
                <tr v-for="entry in rankings" :key="entry.username">
                    <td class="pl-2 pr-2 font-bold">{{ entry.username }}</td>
                    <td class="pr-5">{{ entry.score }}</td>
                    <td class="pr-2">{{ (100 * entry.winpct).toFixed(1) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import type {Ranking} from "@/models.ts"

defineProps<{
    rankings: Ranking[]
}>();
</script>