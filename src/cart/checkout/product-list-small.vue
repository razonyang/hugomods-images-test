<template>
  <!-- #region Cart item -->
  <div v-for="item of $cartStore.items" class="d-flex align-items-stretch py-2" :key="`card-${item.id}`">
    <div class="position-relative"><!-- #product image -->
      <CImage :src="imageForCard(item)" fluid class="img-64" />
      <span class="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-secondary">
        {{ item.quantity }}
        <span class="visually-hidden">of this item</span>
      </span>
    </div>
    <div class="flex-grow-1 ps-2 fs-6"><!-- #product name -->
      {{ item.productVariant.product.name }}
      <template v-for="option of item.productVariant.options">
        <div class="text-small rounded-pill fw-light badge badge-sm text-ss-grey-dark bg-ss-grey-light">{{ option.name }}</div>
      </template>
      
    </div>
    <div class="text-right d-flex align-items-center"><!-- #line price -->
      <div>
        ${{ $cartStore.formatPrice(item.linePrice) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { CImage } from '@coreui/bootstrap-vue/src/components/image/CImage';

import { OrderType, useCartStore } from '../cartStore';

const $cartStore = useCartStore();

function imageForCard(item: OrderType['lines'][0]) {
  return item.productVariant.featuredAsset?.source
    || item.productVariant.product.featuredAsset?.source;
}

</script>

<style lang="scss" scoped>
</style>