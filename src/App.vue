<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import router from '@/router'
import axios from 'axios'

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
        if (response.data != undefined) {
          router.push({ path: '/hello' })
        }
      })
      .catch((error) => console.log(error))
  }
})
</script>
<style scoped></style>
