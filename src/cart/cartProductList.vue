<template>
  <!-- #region Cart item -->
  <div v-for="item of $cartStore.items" class="card my-3" :key="`card-${item.id}`">
    <div class="d-flex flex-nowrap">
      <div class="" style="width: 150px">
        <img :src="imageForCard(item)" class="img-fluid p-3" />
      </div>
      <div class="card-body ps-0">
        <div class="cart-title">{{ item.productVariant.name }}</div>
        <div class="cart-text">
          <div class="d-flex justify-content-between mb-3 me-3">
            <template v-if="$cartStore.hasItemDiscount(item)">
              <div>
                <div class="text-nowrap text-ss-grey-light text-decoration-line-through">
                  ${{ $cartStore.formatPrice(item.unitPrice) }} / ea
                </div>
                <div class="text-nowrap text-danger">
                  ${{ $cartStore.formatPrice($cartStore.adjustedItemPrice(item)) }} / ea
                </div>
              </div>
            </template>
            <div class="text-nowrap text-ss-grey" v-else>
              ${{ $cartStore.formatPrice($cartStore.adjustedItemPrice(item)) }} / ea
            </div>
            <div class="text-right">
              <a
                href="#"
                color="btn btn-text text-ss-iris text-decoration-underline"
                @click.prevent="$cartStore.removeFromCart(item.id)"
              ><i class="fa-duotone fa-trash pe-2"></i>Remove</a>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <CInputGroup>
                <button
                  class="btn btn-outline-grey"
                  :disabled="$cartStore.isLoading > 0"
                  @click="adjustQuantity(item.id, -1)"
                >
                  <i class="fa-solid fa-minus"></i>
                </button>
                <input
                  class="form-control p-1 text-center w-4rem"
                  type="text"
                  v-model.lazy.number="adjustedQuantities[item.id]"
                  :disabled="$cartStore.isLoading > 0"
                  :class="{'border-warning': qUpdatePending(item.id), 'border-ss-grey-dark': !qUpdatePending(item.id)}"
                />
                <button
                  class="btn btn-outline-grey"
                  :class="{disabled: $cartStore.isLoading > 0}"
                  @click.prevent="adjustQuantity(item.id, 1)"
                >
                  <i class="fa-solid fa-plus fs-normal"></i>
                </button>
              </CInputGroup>
            </div>
            <div class="mx-3 text-nowrap">
              <strong class="text-ss-grey-dark fs1_5"
                :class="{'text-ss-grey-light': qUpdatePending(item.id)}"
                >${{ $cartStore.formatPrice($cartStore.adjustedLinePrice(item)) }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!$cartStore.items?.length"
    class="text-center py-5 my-5 text-ss-grey"
  >
    No items in your cart
    <br />
    <i class="fa-duotone fa-tower-cell fa-xl fa-beat-fade my-4"></i>
  </div>
</template>

<script lang="ts" setup>

import {
  CInputGroup,
} from '@coreui/bootstrap-vue/src/components/form/index';

import { OrderType, useCartStore } from './cartStore';
import { computed, ref, watch } from 'vue';

import debounce from 'lodash/debounce';

// When you change a quantity, it changes "adjustedQuantities" immediately, but
// doesn't save it to the server. Once it saves then it will match up again
const adjustedQuantities = ref({} as Record<string, number>);
function adjustQuantity(id: string, delta: number, absolute = false) {
  const adjustedValue = absolute ? delta : adjustedQuantities.value[id] + delta;

  // Value must be between 0 and 300
  let newQuantity = Math.min(
    Math.max( adjustedValue, 1 ),
    300
  );
  adjustedQuantities.value[id] = newQuantity;
}

const quantityMap = computed(() => {
  const items = $cartStore.items;
  const quantityMap = Object.fromEntries(items.map((item) => [item.id, item.quantity]));
  return quantityMap;
});

const $cartStore = useCartStore();

const debounceUpdate = debounce(async () => {
  try {
    // Find a list of all updated quantities
    const updatedQuantities = Object.entries(adjustedQuantities.value)
      .filter(([id, quantity]) => quantity !== quantityMap.value[id])
      .map(([id, quantity]) => ({ id, quantity }));

    if (updatedQuantities.length === 0) {
      return;
    }

    await $cartStore.updateItemQuantities(updatedQuantities);
  } catch (err) {
    console.warn("Error updating cart:", err);
  }
}, 500);

function imageForCard(item: OrderType['lines'][0]) {
  return item.productVariant.featuredAsset?.source
    || item.productVariant.product.featuredAsset?.source;
}

function qUpdatePending(id: string) {
  return (adjustedQuantities.value[id] !== quantityMap.value[id]);
}

watch(adjustedQuantities, debounceUpdate, { deep: true });
watch(quantityMap, (newQuantities) => {
  // When the saved order updates, update the adjusted map to match, if it doesn't yet
  for (const [id, quantity] of Object.entries(newQuantities)) {
    if (quantity !== adjustedQuantities.value[id]) {
      adjustedQuantities.value[id] = quantity;
    }
  }
}, { deep: true });

</script>

<style lang="scss" scoped>
</style>