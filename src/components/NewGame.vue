<template>
    <div>
        <h2 class="bg-zg2 text-zg1 p-2 text-xl font-bold text-center">Record new game</h2>

        <form @submit.prevent="submitForm">

            <div>
                <input type="text" v-model="winner" list="users">
                <datalist id="users">
                    <option v-for="user in users" :key="user.id" :value="user.username"></option>
                </datalist>
            </div>

            <div>
                <input type="text" v-model="loser" list="users">
                <datalist id="users">
                    <option v-for="user in users" :key="user.id" :value="user.username"></option>
                </datalist>
            </div>
            <button type="submit" class="bg-blue-500 text-white p-2 mt-4 rounded">Submit</button>
        </form>


    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue'
import type { User } from "@/models"

const users = ref<User[]>([]);
const winner = ref<string>('');
const loser = ref<string>('');

// Fetch users from API
const fetchUsers = async (): Promise<void> => {
    const response = await fetch('api/users');
    users.value = await response.json();
};

// Emit an event when the game is successfully submitted
const emit = defineEmits(['gameSubmitted']);

const submitForm = async () => {
    if (!winner.value) {
        alert("Please select a winner 😂");
        return;
    }
    if (!loser.value) {
        alert("Please select a loser 😂");
        return;
    }
    if (winner.value == loser.value) {
        alert("Winner and loser cant be the same person 😂");
        return;
    }

    const winner_id = users.value.find(u => u.username === winner.value)?.id;
    const loser_id = users.value.find(u => u.username === loser.value)?.id;

    if (!winner_id) {
        alert("Enter a valid winner 🫣");
        return;
    }
    if (!loser_id) {
        alert("Enter a valid loser 🫣");
        return;
    }

    try {
        const response = await fetch('api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ winner: winner_id, loser: loser_id }),
        });

        if (!response.ok) {
            alert("Failed to submit the game data 😭");
        }

        emit('gameSubmitted');

    } catch (error) {
        console.error(error);
        alert("There was an error submitting the form.");
    }

};

// Fetch users when the component is mounted
onMounted(() => {
    fetchUsers();
});

</script>