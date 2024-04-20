<template>
  <main class="w-full h-full flex justify-center items-center">
    <component
      :is="components[component]"
      @signUp="component = 'signUp'"
      @signIn="component = 'signIn'"
    ></component>
  </main>
</template>
<script setup>
import { ref } from 'vue'
import signIn from '@/components/signIn.vue'
import signUp from '@/components/signUp.vue'

let components = {
  signIn,
  signUp
}
const component = ref('signIn')

// const go = function (methodType) {
//   component.value = methodType
// }
</script>
