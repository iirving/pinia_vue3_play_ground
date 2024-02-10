<script setup>
// imports
import { ref } from "vue";
import AppCountInput from "./AppCountInput.vue";
import useDisplayCurrency from "../composables/useDisplayCurrency.js";

// props
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  product: {
    type: Object,
    default: null
  },
});

// emits
defineEmits(["addToCart"])

// data
const count = ref(0);
</script>

<template>
  <li class="card">
    <img :src="`/images/${product.image}`" class="mb-3" width="300" />
    <div>
      {{ product.name }} - <span class="text-green-500">{{ useDisplayCurrency(product.price) }}</span>
      <div class="text-center m-4">
        <AppCountInput v-model="count" />
      </div>
      <AppButton class="primary" @click="$emit('addToCart', count), (count = 0)">Add to Cart</AppButton>
    </div>
  </li>
</template>
