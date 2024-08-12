<template>
  <COffcanvas
    :visible="$cartStore.cartVisible"
    placement="end"
    :backdrop="true"
    :keyboard="true"
    @show="$cartStore.showCart"
    @hide="$cartStore.hideCart">
    <COffcanvasHeader class="border-bottom">
      Welcome {{ $account.customerName }}
      <template v-if="$account.isLoggedIn">
        <button class="btn btn-sm btn-outline-grey dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Account
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="/account">My Account</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><button class="dropdown-item" @click.prevent="$account.logout">Sign out</button></li>
        </ul>
      </template>
      <template v-else>
        <span class="ms-2 text-small">
          <a class="text-ss-iris btn-outline-grey btn btn-sm" href=""
            @click.prevent="showLogin">Sign in
          </a>
        </span>
      </template>
      <CCloseButton class="text-reset"
        @click="$cartStore.hideCart"
      />
    </COffcanvasHeader>
    <COffcanvasBody class="d-flex flex-column justify-content-start overflow-y-auto">
      <cart-product-list />
    </COffcanvasBody>
    <div class="sidePanelFooter pb-3 border-top flex-grow-0 flex-shrink-1 d-flex flex-column align-items-center">
      <div class="row my-2 w-100">
        <div class="col text-bolder text-ss-grey-dark text-nowrap text-center text-uppercase">
          Subtotal
        </div>
        <div class="col text-center">
          ${{ $cartStore.subtotal }}
        </div>
      </div>
      <a class="btn btn-primary w-75" href="/cart/#!/contact">
        <i class="fa-duotone fa-cart-shopping-fast pe-2"></i>
        Checkout
      </a>
    </div>
  </COffcanvas>
</template>

<script lang="ts">
  export default {
    name: 'CartPanel',
    inheritAttrs: false,
    customOptions: {}
  }
</script>
<script lang="ts" setup>

import CartProductList from './cartProductList.vue';
import { CCloseButton } from '@coreui/bootstrap-vue/src/components/close-button/CCloseButton';
import {
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader, 
} from '@coreui/bootstrap-vue/src/components/offcanvas/index';
import { CButton } from '@coreui/bootstrap-vue/src/components/button/index';

import { useCartStore } from './cartStore';
import { useAccountStore } from '../account/accountStore';
import { watch } from 'vue';

const $account = useAccountStore();

const $cartStore = useCartStore();

function showLogin() {
  $cartStore.hideCart();
  $account.showLogin();
}

watch(() => $account.isLoggedIn, (isLoggedIn) => {
  if (isLoggedIn) {
    window.current_user = $account.customerName;
    if (window._userMessage) {
      window._userMessage.element.innerHTML = window._userMessage.html;
    }
  } else {
    window.current_user = void 0;
  }
});

</script>

<style lang="scss" scoped>

.text-small { font-size: 90%; }

</style>