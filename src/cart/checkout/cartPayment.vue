<template>
  <div class="col col-12 spacer"></div>

  <div class="col col-12 col-lg-8 main pt-3">
    <div>
      <h2 class="text-center">Payment</h2>
      <div class="text-center">
        <CheckoutCrumbs cur="payment" />
      </div>
    </div>
    <div class="card rounded-3">
      <div class="row border-bottom mx-2 py-2 align-items-center">
        <div class="col-2 text-nowrap">Contact</div>
        <div
          class="col d-flex flex-row justify-content-between align-items-center"
        >
          {{ $cartStore.customerEmail }}
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
    </div>

    <div>
      <AddressDropDown v-model="selectedAddress" ref="customerAddressEl" />
      <div class="d-flex justify-content-between align-items-baseline">
        <h2 class="fs-4 mt-5">Billing Address</h2>
        <div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              v-model="isShippingSameAsBilling"
              v-on:change="changeSameAddress()"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault"
              >Use Shipping Address</label
            >
          </div>
        </div>
      </div>
      <AddressInfo
        v-model="billingAddress"
        :is-shipping="false"
        ref="billingAddressEl"
      />
    </div>

    <div>
      <div class="d-flex justify-content-between align-items-baseline">
        <h2 class="fs-4 mt-5">Payment information</h2>
      </div>
      <div class="row justify-content-center">
        <div class="col col-md-10 col-lg-8">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <h3 class="text-center">Credit Card</h3>
              </div>
              <div class="card-text">
                <CreditCardForm v-model="cardData" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
          Return to shipping
        </button>
        <button class="btn btn-ss-iris" @click.prevent="saveAndNext">
          Checkout
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
import {
  CustomerAddress,
  getBillingAddress,
  getEmptyAddress,
  useAccountStore,
} from "../../account/accountStore";
import { useCartStore } from "../cartStore";
import { useRouter } from "./checkoutRouter";

import { onBeforeMount, onMounted, ref, watch } from "vue";
import {
  AuthorizeNetCardData,
  AuthorizeNetSecureData,
  dispatchData,
  getAccept,
} from "./authorizeNet";
import CreditCardForm from "./creditCard.component.vue";
import AddressInfo from "./addressInfo.vue";
import AddressDropDown from "./address-drop-down.vue";
import { Address } from "../../graphql/generated-shop";

const $router = useRouter();
const $cartStore = useCartStore();

const isShippingSameAsBilling = ref(false);

const errorMsg = ref("");

const customerAddressEl = ref<Address[]>([]);
const selectedAddress = ref<{ address: Address | null }>({
  address: null,
});

watch(
  () => [selectedAddress.value],
  () => {
    if (selectedAddress.value.address) {
      billingAddress.value = {
        customFields: {
          firstName: "",
          lastName: "",
          ...(selectedAddress.value.address.customFields ?? {}),
        },
        streetLine1: selectedAddress.value.address.streetLine1 || "",
        streetLine2: selectedAddress.value.address.streetLine2,
        city: selectedAddress.value.address.city,
        province: selectedAddress.value.address.province,
        postalCode: selectedAddress.value.address.postalCode,
        company: selectedAddress.value.address.company,
        countryCode: selectedAddress.value.address.country.code || "US",
        phoneNumber: selectedAddress.value.address.phoneNumber,
      };
    } else {
      billingAddress.value = getEmptyAddress();
    }
  },
  { deep: true }
);

onMounted(() => {
  $cartStore.transitionOrderToState("ArrangingPayment");
});

const billingAddress = ref<CustomerAddress>(
  getBillingAddress(
    $cartStore.activeOrder?.billingAddress as CustomerAddress
  ) ?? getEmptyAddress()
);

const cardData = ref<AuthorizeNetCardData>({
  cardNumber: "",
  year: "",
  month: "",
  cardCode: "",
  zip: "",
  fullName: "",
});

function goPrev() {
  //await $cartStore.transitionOrderToState("AddingItems");
  $router.navTo("shipping");
}

function changeSameAddress() {
  if (isShippingSameAsBilling.value) {
    billingAddress.value =
      getBillingAddress(
        $cartStore.activeOrder?.shippingAddress as CustomerAddress
      ) ?? getEmptyAddress();
  } else {
    billingAddress.value =
      getBillingAddress(
        $cartStore.activeOrder?.billingAddress as CustomerAddress
      ) ?? getEmptyAddress();
  }
}

async function saveAndNext() {
  try {
    const cardNumber = cardData.value.cardNumber;
    const expirationMonth = cardData.value.month;
    const expirationYear = cardData.value.year;
    const cardCode = cardData.value.cardCode;
    const zip = billingAddress.value.postalCode;
    const fullName =
      billingAddress.value.customFields?.firstName +
      " " +
      billingAddress.value.customFields?.lastName;

    if (
      !cardNumber ||
      !expirationMonth ||
      !expirationYear ||
      !cardCode ||
      !zip ||
      !fullName
    ) {
      errorMsg.value = "Please fill out all fields";
      return;
    }

    const [authorizeNetKeys, eligiblePaymentMethods] = await Promise.all([
      $cartStore.getAuthorizeNetKeys(),
      $cartStore.getEligiblePaymentMethods(),
    ]);
    const aNetMethod = eligiblePaymentMethods?.find((m) =>
      m.code.includes("authorize")
    );
    if (!authorizeNetKeys?.clientKey || !aNetMethod) {
      errorMsg.value = "Error loading payment system";
      return;
    }

    if (!authorizeNetKeys) {
      errorMsg.value = "Error loading payment system";
      return;
    }

    const secureData: AuthorizeNetSecureData = {
      authData: {
        clientKey: authorizeNetKeys.clientKey,
        apiLoginID: authorizeNetKeys.loginId,
      },
      cardData: {
        ...cardData.value,
        cardNumber: cardNumber.replace(/\s/g, ""),
        cardCode: cardCode.replace(/\s/g, ""),
      },
    };

    $cartStore.updatePaymentData(secureData, aNetMethod.code);
    await $cartStore.setBillingAddress(billingAddress.value);
    await $cartStore.setTaxCloudAuthorization();
    $router.navTo("review");
  } catch (e: any) {
    errorMsg.value = e.message;
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
