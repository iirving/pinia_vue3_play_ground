<script setup>
// imports
import { computed } from "vue";
import CartWidget from './CartWidget.vue';
import { useAuthUserStore } from "../stores/AuthUserStore.js";

const authUserStore = useAuthUserStore();
const userName = computed(() => authUserStore.userName)

</script>

<template>
  <header class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')">
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div>
      <span class="mr-2">{{ userName }}</span>
      <CartWidget class="inline-block" />
    </div>
  </header>
</template>
