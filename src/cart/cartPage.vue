<template>
  <div class="col col-12 spacer"></div>

  <div class="col col-12 pt-3 col-md-8 order-2 order-md-1">
    <div>
      <h2 class="text-center">Cart</h2>
      <div class="text-center">
        <CheckoutCrumbs cur="cart" />
      </div>
    </div>
    <cart-product-list />
  </div>
  <div class="col col-12 col-md-4 order-1 order-md-2">
    <div class="card bg-ss-grey-lightest my-3">
      <div class="card-body pt-4">

        <div class="d-flex">
          <CInputGroup class="square border-0">
            <input
              class="form-control p-1 text-center border-0"
              type="text"
              placeholder="Coupon code"
              v-model="couponCode"
              :disabled="$cartStore.isLoading > 0"
            />
            <button
              class="btn btn-action-light border-0"
              :disabled="$cartStore.isLoading > 0"
              @click="applyCouponCodeFunction"
            >Apply</button>
          </CInputGroup>
        </div>

        <div class="text-danger mt-3 text-center" v-if="couponError.length > 0 && !isSuccessful">
          {{ couponError }}
        </div>

        <div class="mt-3" v-if="$cartStore.couponCodes.length!=0">
        <div class="d-flex w-100 mt-4 align-items-center" v-for="couponCode in $cartStore.couponCodes" :key="couponCode">
        <div class="col text-ss-grey-dark text-nowrap">
          {{ couponCode }}
        </div>
        <div class="col text-end">
          <button
            class="btn btn-link p-0"
            @click="$cartStore.removeCouponCode(couponCode)"
          >Remove</button>
        </div>
       </div>
      </div>
        
        <hr class="mt-3 mb-4" />

        <div class="d-flex w-100 mt-4 align-items-center">
          <div class="col text-bolder fs-5 text-ss-grey-dark text-nowrap">
            Subtotal
          </div>
          <div class="col text-end">
            ${{ $cartStore.orderTotal }}
          </div>
        </div>

        <div class="d-flex w-100 mt-4 align-items-center">
        <div class="col text-bolder fs-5 text-ss-grey-dark text-nowrap">
          Discount / Voucher
        </div>
        <div class="col text-end">
          {{ $cartStore.discount }}
        </div>
      </div>
        
        <div class="d-flex w-100 mt-4 align-items-center">
          <div class="col text-bolder fs-5 text-ss-grey-dark text-nowrap">
            Shipping
          </div>
          <div class="col text-end">
            <!--a href=""
              @click.prevent=""
              class="text-ss-iris text-decoration-underline"
            >Calculate</a-->
            ${{ $cartStore.shippingCost  }}
          </div>
        </div>
        
        <div class="d-flex w-100 mt-4 align-items-center">
          <div class="col text-bolder fs-5 text-ss-grey-dark text-nowrap">
            Sales Tax
          </div>
          <!--div class="col text-end">
            <a href=""
              @click.prevent=""
              class="text-ss-iris text-decoration-underline"
            >Calculate</a-->
            ${{ $cartStore.taxTotal }}
          </div>
        </div>
        
        <div class="d-flex w-100 mt-4 align-items-center">
          <div class="col text-bolder fs-5 text-ss-grey-dark text-nowrap">
            Total Order
          </div>
          <div class="col text-end">
            ${{ $cartStore.total }}
          </div>
        </div>
        
        <div class="d-flex w-100 mt-4 align-items-center" v-if="$cartStore.itemCount">
          <div class="col text-bolder fs-5 text-ss-grey-dark text-nowrap">
            <button class="btn btn-ss-iris w-100" @click="gotoCheckout">
              <i class="fa-duotone fa-cart-shopping me-2"></i>Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
</template>

<script lang="ts">
  export default {
    name: 'CartPage',
    inheritAttrs: false,
    customOptions: {}
  }
</script>
<script lang="ts" setup>

import CartProductList from './cartProductList.vue';
import CheckoutCrumbs from './checkout/checkoutCrumbs.vue';
import {
  CInputGroup,
} from '@coreui/bootstrap-vue/src/components/form/index';

import { useCartStore } from './cartStore';
import { useRouter } from './checkout/checkoutRouter';
import { onMounted, ref } from 'vue';

const $router = useRouter();
const $cartStore = useCartStore();
const couponCode = ref('');
const couponError = ref('');
const isSuccessful = ref(false);

function gotoCheckout() {
  console.log("Route requested");
  $router.navTo('contact');
}

onMounted(() => {
  $cartStore.transitionOrderToState("AddingItems");
});

async function applyCouponCodeFunction(){
  if(couponCode.value.length > 0){
    const result = await $cartStore.applyCouponCode(couponCode.value);
    if(!result.success && result.message){
      couponError.value = result.message;
      isSuccessful.value = false;
    }else{
      couponError.value = '';
      isSuccessful.value = true;
    }
  }
}

</script>

<style lang="scss" scoped>
div.spacer { height: 4em; }
</style>