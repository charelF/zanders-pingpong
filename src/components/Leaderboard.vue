<template>
    <div>
        <h2 class="bg-zg2 text-zg1 p-2 text-xl font-bold text-center font-sans">🏆 {{ formatDate(new Date().toString()) }} Leaderboard
        </h2>

        <div class="bg-zg1/20 text-zg2 pb-1">
            <table id="gameTable" class="table-auto w-full">
                <thead class="bg-zg1">
                    <tr>
                        <th class="p-2 text-right">ELO</th>
                        <th class="p-2 text-left">User</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in rankings" :key="entry.username">
                        <td class="px-2 py-1 text-right">{{ entry.score }}</td>
                        <td class="px-2 py-1"> <strong>{{ entry.username }}</strong> <span class="opacity-50">({{
                                entry.total }})</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Ranking } from "@/models.ts"
import { getQuarter } from "@/utils"

const formatDate = (dateString: string): string => {
    return getQuarter(new Date(dateString))
};

defineProps<{
    rankings: Ranking[]
}>();
</script>