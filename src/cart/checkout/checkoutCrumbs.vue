<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb justify-content-center">
      
      <li class="breadcrumb-item" v-for="(page, idx) in pageNames"
        :class="{
          active: page === cur,
          'text-ss-grey-light': pageNames.indexOf(cur) < idx
        }"
      >
        <a href="#"
          v-if="idx < pageNames.indexOf(cur)"
          @click.prevent="$router.navTo(page)">{{ nameMap[page] }}</a>
        <span v-else>{{ nameMap[page] }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">

import { useRouter, pageNames } from './checkoutRouter';

const nameMap = {
  cart: "Cart",
  contact: "Contact",
  shipping: "Shipping",
  payment: "Payment",
  review: "Review",
  confirmation: "Confirmation"
};

defineProps<{
  cur: pageNames
}>()

const $router = useRouter();

</script>