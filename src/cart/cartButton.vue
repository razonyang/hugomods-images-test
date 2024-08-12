<template>
  <button class="btn btn-checkout position-relative w-100"
    @click.prevent="$cartStore.showCart"
  >
    <div class="text-nowrap">
      <i class="fa-duotone fa-basket-shopping pe-2"></i>
      <span id="cart-total-price" v-if="!$cartStore.isLoading">${{ $cartStore.total }}</span>
      <span id="cart-total-price" v-else><i class="fa-duotone fa-spinner fa-spin"></i></span>
    </div>
    <span v-if="$cartStore.itemCount" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      {{ $cartStore.itemCount }}
      <span class="visually-hidden">items in your cart</span>
    </span>
  </button>
</template>

<script lang="ts">
  export default {
    name: 'CartButton',
    inheritAttrs: false,
    customOptions: {}
  }
</script>

<script lang="ts" setup>

import { useCartStore } from './cartStore';

const $cartStore = useCartStore();

</script>

<style lang="scss">

</style>