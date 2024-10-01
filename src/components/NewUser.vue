<template>
    <div>
        <h2 class="bg-zg2 text-zg1 p-2 text-xl font-bold text-center font-sans">👶 Add new user</h2>

        <form @submit.prevent="submitForm">
            <div class="flex flex-row">
                <div class="bg-zg1/20 basis-3/4">
                    <div class="p-2 flex flex-row">
                        <label for="user" class="basis-1/3 text-right pr-2"> Name: </label>
                        <input type="text" v-model="user" id="winner" class="w-full basis-2/3 pr-2">
                    </div>
                </div>
                <button type="submit" class="bg-zg1 basis-1/4 font-bold active:bg-zg1/80">Submit</button>
            </div>
        </form>



    </div>

</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const user = ref<string>('');

// Emit an event when the game is successfully submitted
const emit = defineEmits(['userSubmitted']);

const submitForm = async () => {
    if (!user.value) {
        alert("Please enter a username");
        return;
    }
    try {
        const response = await fetch(`/api/users/${user.value}`, { method: 'POST' })
        if (!response.ok) {
            alert("Failed to create user. Most likely it already exists ☝️🤓");
        }
        emit('userSubmitted');
        user.value = ""
    } catch (error) {
        console.error(error);
        alert(`There was an error submitting the form: ${error}`);
    }
};
</script>