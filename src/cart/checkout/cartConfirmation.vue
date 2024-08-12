<template>
  <div class="col col-12 spacer"></div>

  <div
    :class="`${
      $cartStore.activeOrder.active
        ? [
            'col',
            'col-12',
            'col-lg-8',
            'd-flex',
            'flex-column',
            'align-items-center',
          ]
        : [
            'col',
            'col-12',
            'col-lg-12',
            'd-flex',
            'flex-column',
            'align-items-center',
          ]
    }`"
  >
    <div>
      <h2 class="text-center">Confirmation</h2>
    </div>

    <div class="mt-5 align-items-center">
      <h2 class="text-center">Thank you for your order!</h2>
    </div>

    <div class="mt-5 text-center">
      Your order number is: {{ $cartStore.finalOrderCode }}
    </div>

    <div class="mt-3 text-center">
      <button class="btn btn-action-light" @click.prevent="saveAndNext">
        Go To Home
      </button>
    </div>

    <div class="mt-3 text-center" v-if="!$account.isLoggedIn && !successMsg">
      <button class="btn btn-ss-iris" @click.prevent="createAccount">
        Create Account
      </button>
    </div>

    <div
      class="alert alert-danger mt-4 d-flex justify-content-between"
      v-if="errorMsg"
    >
      <div>
        <i class="fa-duotone fa-land-mine-on fa-xl pe-2"></i>{{ errorMsg }}
      </div>
      <button class="btn btn-close float-right" @click="errorMsg = ''"></button>
    </div>

    <div
      class="alert alert-success mt-4 text-center mx-auto justify-content-between w-50"
      v-if="successMsg"
    >
      <div class="text-center">
        {{ successMsg }}
      </div>
    </div>
  </div>

  <div
    class="col d-none d-lg-block col-lg-4"
    v-if="$cartStore.activeOrder.active"
  >
    <CartSummary />
  </div>
</template>

<script lang="ts" setup>
import CartSummary from "./cartSummary.vue";
import { useCartStore } from "../cartStore";
import { useAccountStore } from "../../account/accountStore";
import { ref } from "vue";

const $cartStore = useCartStore();
const $account = useAccountStore();

const errorMsg = ref("");
const successMsg = ref("");

async function saveAndNext() {
  window.location.href = "/";
}

async function createAccount() {
  if (!$cartStore.finalOrderCode) {
    return;
  }
  const theCustomer = await $cartStore.createGuestOrderCustomer(
    $cartStore.finalOrderCode
  );
  console.log(theCustomer);
  if (theCustomer) {
    successMsg.value = `Account created successfully. Please check your email ${theCustomer.emailAddress} for more information.`;
  } else {
    errorMsg.value =
      "Error creating account. Please try again or manually create an account.";
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 50px;
  img {
    border-radius: 8px;
  }
}
div.spacer {
  height: 4em;
}
</style>
