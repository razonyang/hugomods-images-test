<template>
  <div class="col col-12 spacer"></div>

  <div class="col col-12 col-lg-8 main pt-3">
    <div>
      <h2 class="text-center">Review</h2>
      <div class="text-center">
        <CheckoutCrumbs cur="review" />
      </div>
    </div>
    <div class="card rounded-3">
      <div class="row border-bottom mx-2 py-2 align-items-center">
        <div class="col-2 text-nowrap">Contact</div>
        <div
          class="col d-flex flex-row justify-content-between align-items-center"
        >
          {{
            $cartStore.customerEmail
          }}
          <a href="" @click.prevent="$router.navTo('contact')" class=""
            >Change</a
          >
        </div>
      </div>
      <div class="row mx-2 py-2 align-items-center">
        <div class="col-2">Ship to</div>
        <div class="col d-flex flex-row justify-content-between">
          {{ $cartStore.formattedShippingAddress }}
          <a href="" @click.prevent="$router.navTo('contact')">Change</a>
        </div>
      </div>
      <div class="row mx-2 py-2 align-items-center">
        <div class="col-2 text-nowrap">Method</div>
        <div class="col d-flex flex-row justify-content-between">
          {{ $cartStore.customFields?.serviceName }}
          <a href="" @click.prevent="$router.navTo('shipping')">Change</a>
        </div>
      </div>
      <div class="row mx-2 py-2 align-items-center">
        <div class="col-2">Bill to</div>
        <div class="col d-flex flex-row justify-content-between">
          {{ $cartStore.formattedBillingAddress }}
          <a href="" @click.prevent="$router.navTo('payment')">Change</a>
        </div>
      </div>
    </div>

    <div>
      <div
        class="alert alert-danger mt-4 d-flex justify-content-between"
        v-if="errorMsg"
      >
        <div>
          <i class="fa-duotone fa-land-mine-on fa-xl pe-2"></i>{{ errorMsg }}
        </div>
        <button
          class="btn btn-close float-right"
          @click="errorMsg = ''"
        ></button>
      </div>

      <div class="mt-5 d-flex w-100 flex-row justify-content-between">
        <button class="btn btn-text" @click.prevent="goPrev()">
          <i class="fa-solid fa-arrow-left pe-2"></i>
          Return to payment
        </button>
        <button class="btn btn-ss-iris" @click.prevent="saveAndNext">
          Place An Order
          <i class="fa-solid fa-arrow-right ps-2"></i>
        </button>
      </div>
    </div>
  </div>

  <div class="col d-none d-lg-block col-lg-4">
    <CartSummary />
  </div>
</template>

<script lang="ts" setup>
import CartSummary from "./cartSummary.vue";
import CheckoutCrumbs from "./checkoutCrumbs.vue";
import { useAccountStore } from "../../account/accountStore";
import { useCartStore } from "../cartStore";
import { useRouter } from "./checkoutRouter";

import { onMounted, ref } from "vue";
import { dispatchData } from "./authorizeNet";

const $account = useAccountStore();
const $router = useRouter();
const $cartStore = useCartStore();

const errorMsg = ref("");

function goPrev() {
  $router.navTo("payment");
}

onMounted(() => {
  $cartStore.transitionOrderToState("ArrangingPayment");
});

async function saveAndNext() {
  const authorizeData = $cartStore.authorizeNetSecureData;
  if (!authorizeData) {
    errorMsg.value = "No payment data found";
    return;
  }
  const paymentMethodCode = $cartStore.selectedPaymentMethodCode;
  if (!paymentMethodCode) {
    errorMsg.value = "No payment method selected";
    return;
  }

  try {
    const response = await dispatchData(authorizeData);
    if (response.opaqueData.dataDescriptor && response.opaqueData.dataValue) {
      await $cartStore.addPaymentToOrder(paymentMethodCode, {
        dataDescriptor: response.opaqueData.dataDescriptor,
        dataValue: response.opaqueData.dataValue,
      });
      $router.navTo("confirmation");
    } else {
      errorMsg.value = "No payment data returned";
    }
  } catch (err: any) {
    errorMsg.value = err?.message ?? "unknown error processing payment";
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
