<template>
    <div>
        <h2 class="bg-zg2 text-zg1 p-2 text-xl font-bold text-center">Record new game</h2>

        <div>
            <input type="text" v-model="selected" list="users">
            <datalist id="users">
                <option v-for="user in users" :key="user.id" :value="user.username"></option>
            </datalist>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from "@/models"

const users = ref<User[]>([]);
const selected = ref<string>('');

// Fetch users from API
const fetchUsers = async (): Promise<void> => {
    const response = await fetch('api/users');
    users.value = await response.json();
};

// Fetch users when the component is mounted
onMounted(() => {
    fetchUsers();
});





// <!-- <label for="games">Winner</label>
//         <input list="gameList" id="games" name="games">
//         <datalist id="gameList">
//             <option value="Chess"></option>
//             <option value="Checkers"></option>
//             <option value="Scrabble"></option>
//             <option value="Monopoly"></option>
//         </datalist> -->

// const props = defineProps<Props>()

// const winnerInput = ref('')
// const loserInput = ref('')

// const filteredWinners = computed(() => {
//     return props.users.filter(user =>
//         user.username.toLowerCase().includes(winnerInput.value.toLowerCase()) &&
//         user.username.toLowerCase() !== loserInput.value.toLowerCase()
//     )
// })

// const filteredLosers = computed(() => {
//     return props.users.filter(user =>
//         user.username.toLowerCase().includes(loserInput.value.toLowerCase()) &&
//         user.username.toLowerCase() !== winnerInput.value.toLowerCase()
//     )
// })

// const filterNames = (type: 'winner' | 'loser') => {
//     // This function is called on input, but we don't need to do anything here
//     // as the computed properties will handle the filtering
// }

// const selectName = (type: 'winner' | 'loser', name: string) => {
//     if (type === 'winner') {
//         winnerInput.value = name
//     } else {
//         loserInput.value = name
//     }
// }

// const submitForm = () => {
//     // Here you can handle the form submission
//     console.log('Winner:', winnerInput.value)
//     console.log('Loser:', loserInput.value)
//     // You might want to emit an event with the form data or call an API
// }

</script>