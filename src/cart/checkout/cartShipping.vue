<template>
  <div class="col col-12 spacer"></div>

  <div class="col col-12 col-lg-8 main pt-3">
    <div>
      <h2 class="text-center">Shipping</h2>
      <div class="text-center">
        <CheckoutCrumbs cur="shipping" />
      </div>
    </div>
    <div class="card rounded-3">
      <div class="row border-bottom mx-2 py-2 align-items-center">
        <div class="col-2">Contact</div>
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
          <a href="" @click.prevent="$router.navTo('contact')" class=""
            >Change</a
          >
        </div>
      </div>
    </div>
    <div class="mt-5">
      <h2>
        Shipping options:
        <span v-if="$cartStore.allShippingRatesLoading"
          ><i class="fa-duotone fa-spinner-scale fa-spin"></i
        ></span>
      </h2>
      <div
        class="card round-4 shipMethods"
        v-if="$cartStore.allShippingRates?.length"
      >
        <label
          class="p-2"
          v-for="method in $cartStore.allShippingRates"
          :key="method.key"
        >
          <input
            type="radio"
            class="m-2"
            id="shippingMethod"
            :value="method"
            autocomplete="off"
            v-model="shipMethod"
          />
          <div class="w-100">{{ method.name }}</div>
          <div class="text-end">${{ formatCurrency(method.shipmentCost) }}</div>
        </label>
      </div>
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

    <div class="mt-5 d-flex w-100 flex-row justify-content-between">
      <button class="btn btn-text" @click.prevent="$router.navTo('contact')">
        <i class="fa-solid fa-arrow-left pe-2"></i>
        Return to contact
      </button>
      <button class="btn btn-ss-iris" @click.prevent="saveAndNext">
        Continue to Payment
        <i class="fa-solid fa-arrow-right ps-2"></i>
      </button>
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

import { computed, onMounted, ref, watch } from "vue";
import { NotNull } from "../../lib/typeHelpers";

const $account = useAccountStore();
const $router = useRouter();
const $cartStore = useCartStore();

const errorMsg = ref("");

onMounted(() => {
  $cartStore.transitionOrderToState("AddingItems");
});

const shipMethod = computed({
  get: () => {
    const curMethod = $cartStore.curShippingMethod;

    if (!curMethod) {
      return null;
    }
    if (curMethod.methodCode === "ship-station") {
      const found = $cartStore.allShippingRates?.find(
        (m) =>
          m.methodId === curMethod.methodId &&
          m.carrierCode === curMethod.carrierCode &&
          m.serviceCode === curMethod.serviceCode
      );
      if (found) {
        return found as ShippingMethod | null;
      } else {
        return null as ShippingMethod | null;
      }
    } else {
      const found = $cartStore.allShippingRates?.find(
        (m) => m.methodId === curMethod?.methodId
      );
      return found as ShippingMethod | null;
    }
  },
  set: (method: ShippingMethod | null) => {
    try{
      $cartStore.setOrderShippingMethod(method!);
    }catch(e: any){
      errorMsg.value = e.message;
    }
  },
});

watch(
  () => $cartStore.allShippingRates,
  () => {
    console.log("Length: ", $cartStore.allShippingRates?.length);
  }
);

const formatCurrency = (amount: number) => {
  return amount.toFixed(2);
};

// onMounted(() => {
// });

type ShippingMethod = NotNull<typeof $cartStore.allShippingRates>[0];

function saveAndNext() {
  if (shipMethod.value) {
    //await $cartStore.transitionOrderToState("ArrangingPayment");
    $router.navTo("payment");
  } else {
    errorMsg.value = "Please select a shipping option";
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

.shipMethods {
  label {
    align-items: center;
    border-bottom: var(--bs-border-width) var(--bs-border-style)
      var(--bs-border-color) !important;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
