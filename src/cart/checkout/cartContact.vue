<template>
  <div class="col col-12 spacer"></div>

  <div class="col col-12 col-lg-8 main pt-3">
    <div>
      <h2 class="text-center">Shipping</h2>
      <div class="text-center">
        <CheckoutCrumbs cur="contact" />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div><!-- spacer --></div>
      <div>
        <a
          href=""
          @click.prevent="$account.showLogin"
          v-if="!$account.isLoggedIn"
          class="me-3"
        >
          Have an account? Sign in
        </a>
      </div>
    </div>
    <div class="container">
      <div class="d-flex mt-4" v-if="$account.isLoggedIn">
        <div class="avatar">
          <img :src="$account.avatarUrl" class="img-fluid" alt="avatar" />
        </div>
        <div class="ms-3">
          {{ $account.fullname }} ({{ $account.email }})<br />
          <a href="" @click.prevent="$account.logout">Log out</a>
        </div>
      </div>

      <div v-else>
        <form ref="emailForm" :class="{ 'was-validated': email.length }">
          <div class="row">
            <div class="col-12 col-sm-8">
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': emailInvalid }"
                  id="email"
                  v-model.lazy="email"
                  placeholder="john@elmer.com"
                  required
                  @change.lazy="emailInvalid = false"
                  :pattern="emailPattern"
                  autocomplete="email"
                />
                <label for="email">Email address</label>
                <div class="invalid-feedback">
                  You must enter a valid email address
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-4 mt-3 mt-sm-0">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control text-uppercase"
                  id="callsign"
                  v-model.lazy.trim="callsign"
                  placeholder="AA1AAA"
                  :pattern="callsignPattern"
                  autocomplete="callsign"
                />
                <label for="callsign">Call Sign (optional)</label>
                <div class="invalid-feedback">Not a valid US callsign</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div>
      <AddressDropDown v-model="selectedAddress" ref="customerAddressEl" />
      <div class="d-flex justify-content-between align-items-baseline">
        <h2 class="fs-4 mt-5">Shipping Address</h2>
        <div v-if="isValidUSCallsign">
          <button class="btn btn-text btn-iris" @click.prevent="addressFromUls">
            <i class="fa-duotone fa-magnifying-glass pe-2"></i>Load from ULS
          </button>
        </div>
      </div>
      <AddressInfo
        v-model="shippingAddress"
        :is-shipping="true"
        ref="shippingAddressEl"
      />
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
      <button class="btn btn-text" @click.prevent="$router.navTo('cart')">
        <i class="fa-solid fa-arrow-left pe-2"></i>
        Return to cart
      </button>
      <button class="btn btn-ss-iris" @click.prevent="saveAndNext">
        Continue to Shipping
        <i class="fa-solid fa-arrow-right ps-2"></i>
      </button>
    </div>
  </div>
  <div class="col col-12 d-none d-lg-block col-lg-4">
    <CartSummary />
  </div>
</template>

<script lang="ts" setup>
import AddressInfo from "./addressInfo.vue";
import AddressDropDown from "./address-drop-down.vue";
import CartSummary from "./cartSummary.vue";
import CheckoutCrumbs from "./checkoutCrumbs.vue";
import {
  CustomerAddress,
  isValidEmail,
  useAccountStore,
} from "../../account/accountStore";
import { validCallFilter } from "../../lib/us-callsign-regex";

import { getEmptyAddress } from "../../account/accountStore";
import { useCartStore } from "../cartStore";
import { computed, onActivated, onMounted, ref, watch } from "vue";
import { emailValidateRegex } from "../../lib/emailRegex";
import { useRouter } from "./checkoutRouter";
import { doUlsLookup } from "../../lib/ulsLookup";
import { Address } from "../../graphql/generated-shop";

const $router = useRouter();
const $account = useAccountStore();
const $cartStore = useCartStore();

const shippingAddressEl = ref<InstanceType<typeof AddressInfo> | null>();

const customerAddressEl = ref<Address[]>([]);

const emailPattern = emailValidateRegex.source;

const email = ref("");
const emailInvalid = ref(false);
const callsign = ref("");
const emailForm = ref<HTMLFormElement | null>(null);

const shippingAddress = ref<CustomerAddress>(getEmptyAddress());

const selectedAddress = ref<{ address: Address | null }>({
  address: null,
});

watch(
  () => [selectedAddress.value],
  () => {
    if (selectedAddress.value.address) {
      shippingAddress.value = {
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
    }else{
      shippingAddress.value = getEmptyAddress();
    }
  },
  { deep: true }
);

onMounted(async () => {
  await $cartStore.transitionOrderToState("AddingItems");
  console.log($account.theCustomerAddresses);
  const detailedOrderInfo = await $cartStore.updateCurrentOrderDetailed();
  if (detailedOrderInfo?.shippingAddress) {
    const addr = detailedOrderInfo.shippingAddress;
    shippingAddress.value = {
      customFields: {
        firstName: "",
        lastName: "",
        ...(addr.customFields ?? {}),
      },
      streetLine1: addr.streetLine1 || "",
      streetLine2: addr.streetLine2,
      city: addr.city,
      province: addr.province,
      postalCode: addr.postalCode,
      company: addr.company,
      countryCode: addr.countryCode || "US",
      phoneNumber: addr.phoneNumber,
    };
  }
  if (detailedOrderInfo?.customer) {
    const cust = detailedOrderInfo.customer;
    email.value = cust.emailAddress;
    callsign.value = cust.customFields?.callsign || "";
  }
});

const isValidUSCallsign = computed(() => {
  return validCallFilter.test(callsign.value);
});

const errorMsg = ref("");

watch(
  () => [shippingAddress.value, email.value, callsign.value],
  () => {
    errorMsg.value = "";
  },
  { deep: true }
);

const callsignPattern = computed(() => {
  if (shippingAddress.value?.countryCode !== "US") {
    return "";
  }
  return validCallFilter.source;
});

function fixCaps(str: string) {
  // If the string is all caps, make it title case
  if (str === str.toUpperCase()) {
    return str.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  }
  return str;
}

async function addressFromUls() {
  try {
    const ulsRecord = await doUlsLookup(callsign.value);
    if ("code" in ulsRecord) {
      errorMsg.value = `Could not find current amateur license: ${
        (<any>ulsRecord).message
      }`;
      return;
    }

    shippingAddress.value = {
      ...shippingAddress.value,
      customFields: {
        firstName: fixCaps(ulsRecord.first_name),
        lastName: fixCaps(ulsRecord.last_name),
      },
      ...(ulsRecord.pobox
        ? {
            streetLine1: `PO Box ${ulsRecord.pobox}`,
          }
        : {
            streetLine1: ulsRecord.address,
          }),
      city: ulsRecord.city,
      province: ulsRecord.state,
      postalCode: ulsRecord.zip,
    };
  } catch (err: any) {
    errorMsg.value = `Could not find current amateur license: ${
      err?.message ?? err
    }`;
  }
}

async function saveAndNext() {
  errorMsg.value = "";
  const promises: Promise<any>[] = [];
  const isValid = shippingAddressEl.value?.checkValidity();
  if (!isValid) {
    errorMsg.value = "Please fill out all required fields";
    return;
  }
  try {
    // First validate the form(s)
    if (!$account.isLoggedIn) {
      if (emailForm.value) {
        const isValid = emailForm.value.checkValidity();
        if (!isValid) {
          errorMsg.value = "Please enter a valid email address";
          return;
        }
      }
      // Validate the email address
      if (!(await isValidEmail(email.value))) {
        errorMsg.value = "Please enter a valid email address";
        emailInvalid.value = false;
        return;
      }
      shippingAddress.value.customFields = {
        ...shippingAddress.value.customFields,
        email: email.value.trim().toLowerCase(),
      };
      promises.push(
        $cartStore.setGuestAccount({
          callsign: callsign.value.trim().toUpperCase(),
          email: email.value.trim().toLowerCase(),
          firstname: shippingAddress.value.customFields!.firstName!,
          lastname: shippingAddress.value.customFields!.lastName!,
          phoneNumber: shippingAddress.value.phoneNumber || undefined,
        })
      );
    } else {
      // TODO
    }
    promises.push($cartStore.setShippingAddress(shippingAddress.value));

    await Promise.all(promises);

    // If everything worked....
    $router.navTo("shipping");
  } catch (err: any) {
    errorMsg.value = err.message;
    return;
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
