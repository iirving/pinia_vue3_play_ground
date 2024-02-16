<script setup>
import { ref, computed } from "vue";
import CartItem from "@/components/CartItem.vue";
import { useCartStore } from "@/stores/CartStore";

const cartStore = useCartStore();

// data
const active = ref(false);

// computed
// totalPrice hides the complexity of the calculation from the templat
const totalPrice = computed(() => cartStore.displayTotalPrice)
const count = computed(() => cartStore.count);

// methods
// const updateCount = (name, count) => {
//   cartStore.updateCount(name, count);
// };
const clearItem = (name) => {
  cartStore.clearItem(name);
};
const clearCart = () => {
  cartStore.clear();
};

const updateCount = (name, count) => {
  cartStore.setItemCount(name, count);
};
</script>

<template>
  <div class="relative">
    <!-- Icon that always shows -->
    <span class="cursor-pointer" @click="active = true">
      <fa icon="shopping-cart" size="lg" class="text-gray-700" />
      <div class="cart-count absolute">{{ count }}</div>
    </span>
    <!-- Modal Overlay only shows when cart is clicked on -->
    <AppModalOverlay :active="active" @close="active = false">
      <div v-if="cartStore.isNotEmpty">
        <ul class="items-in-cart">
          <CartItem v-for="(items, name) in cartStore.grouped" :key="name" :product="items[0]"
            :count="cartStore.groupCount(name)" @updateCount="updateCount(items[0], $event)" @clear="clearItem(name)" />
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong>{{ totalPrice }}</strong>
        </div>
        <div class="flex justify-end">
          <AppButton class="secondary mr-2" @click="clearCart">Clear Cart</AppButton>
          <AppButton class="primary" @click="cartStore.checkOut">Checkout</AppButton>
        </div>
      </div>
      <!-- Uncomment and use condition to show when cart is empty -->
      <div v-else><em>Cart is Empty</em></div>
    </AppModalOverlay>
  </div>
</template>

<style lang="pcss" scoped>
.items-in-cart{
  @apply mb-5;
}
.items-in-cart li{
  @apply flex justify-between p-2;
}
.items-in-cart li:nth-of-type(even){
  @apply bg-gray-300;
}
</style>
