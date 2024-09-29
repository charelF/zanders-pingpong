<template>
    <div>
        <h2 class="bg-zg2 text-zg1 p-2 text-xl font-bold text-center"> Rankings {{ formatDate(new Date().toString()) }}</h2>

        <div class="font-mono bg-zg1/20 text-zg2 pb-2">
            <table id="gameTable" class="table-auto w-full">
                <thead class="bg-zg1">
                    <tr>
                        <th class="pr-5 pr-5 text-right">ELO</th>
                        <th class="py-2 pl-2 pr-2 text-left">User</th>
                    </tr>
                </thead>
                <p class="pt-1"></p>
                <tbody>
                    <tr v-for="entry in rankings" :key="entry.username">
                        <td class="pr-5 text-right">{{ entry.score }}</td>
                        <td class="pl-2 pr-2 font-bold">{{ entry.username }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Ranking } from "@/models.ts"

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('nl-NL', {
        month: 'long',
    });
};

defineProps<{
    rankings: Ranking[]
}>();
</script>