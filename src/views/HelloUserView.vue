<template>
  <div class="h-full flex justify-center items-center">
    <h1 class="text-black text-2xl">
      Hello, <span class="text-green-600">{{ userData }}</span>
    </h1>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const userData = ref('')

onMounted(() => {
  let token = localStorage.getItem('token')
  if (token != undefined) {
    axios
      .get('http://localhost:3000/auth/test', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        axios
          .post('http://localhost:3000/auth/data', {
            password: response.data.password
          })
          .then((response) => {
            userData.value = response.data.name
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  }
})
</script>
<style scoped></style>
