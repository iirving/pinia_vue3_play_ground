<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";

const productStore = useProductStore();
const cartStore = useCartStore();

productStore.fetchProducts();

//const unsubscribe =
cartStore.$onAction(({
  name, // name of the action
  store, // store instance, same as `someStore`
  args, // array of parameters passed to the action
  after, // hook after the action returns or resolves
  onError, // hook if the action throws or rejects
}) => {
  // a shared variable for this specific action call
  // const startTime = Date.now()
  // this will trigger before an action on `store` is executed
  // console.log(`Start "${name}" with params [${args.join(', ')}].`)

  if (name === "addItem") { // only if the addItem action is called
    console.log("CartStore Action:", name, "CartStore Store:", store, "CartStore Args:", args, "CartStore After:", after);
    console.log("CartStore OnError:", onError);

    after(() => {
      console.log("CartStore After Action:", name, args);
    })
  }
});

// manually remove the listener
// unsubscribe()



</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addItem($event, product)" />
    </ul>
  </div>
</template>
