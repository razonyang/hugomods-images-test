<template>
  <div class="container">
    <form ref="addressForm" :class="{'was-validated': wasValidated}">
      <div class="mb-3 form-floating">
        <select class="form-select" id="customerCountry" aria-label="Select your country or Region"
          v-model="modelValue.countryCode"
        >
          <option v-for="country in $cartStore.availableCountries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <label for="customerCountry" class="form-label">Country/Region</label>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3 form-floating">
            <input type="text" class="form-control"
              required="true" minlength="2"
              id="customerCity" placeholder="First Name"
              v-model="modelValue.customFields!.firstName"
            />
            <label for="customerCity" class="form-label">First Name</label>
            <div class="invalid-feedback" v-if="isShipping">
              Some shipping providers require at least 2 digits for the first name
            </div>
          </div>
        </div>
        <div class="col">
          <div class="mb-3 form-floating">
            <input type="text" class="form-control"
              required="true" minlength="2"
              id="customerCity" placeholder="Last Name"
              v-model="modelValue.customFields!.lastName"
            />
            <label for="customerCity" class="form-label">Last Name</label>
            <div class="invalid-feedback" v-if="isShipping">
              Some shipping providers require at least 2 digits for the first name
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3 form-floating">
        <input type="text" class="form-control" id="customerCompany" placeholder="Acme, Inc."
          v-model="modelValue.company"
        />
        <label for="customerCompany" class="form-label">Company (optional)</label>
      </div>
      <div class="mb-3 form-floating">
        <input type="text"
          required="true" minlength="5"
          class="form-control"
          id="customerAddress1"
          v-model="modelValue.streetLine1"
        />
        <label for="customerAddress" class="form-label">Address</label>
        <div class="invalid-feedback">
          Please enter your address
        </div>
      </div>
      <div class="mb-3 form-floating">
        <input type="text" class="form-control" id="customerAddress2" placeholder="Apartment, suite, etc (optional)"
          v-model="modelValue.streetLine2"
        />
        <label for="customerAddress" class="form-label">Apartment, suite, etc (optional)</label>
      </div>
      <div class="row">
        <div class="col-12 col-sm-4">
          <div class="mb-3 form-floating">
            <input type="text" class="form-control"
              required="true" minlength="2"
              id="customerCity" placeholder="City"
              v-model="modelValue.city"
            />
            <label for="customerCity" class="form-label">City</label>
            <div class="invalid-feedback">
              You must enter your city
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="mb-3 form-floating" v-if="modelValue.countryCode !== 'US'">
            <input type="text" class="form-control" id="customerState" placeholder="State/Province"
              v-model="modelValue.province"
            />
            <label for="customerState" class="form-label">State/Province</label>
            <div class="invalid-feedback">
              You must enter your state or province
            </div>
          </div>
          <div class="mb-3 form-floating" v-if="modelValue.countryCode === 'US'">
            <SelectState class="form-select"
              required="true"
              id="customerState" placeholder="State"
              v-model="modelValue.province"
            />
            <label for="customerState" class="form-label">State</label>
            <div class="invalid-feedback">
              You must select a state
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="mb-3 form-floating">
            <input type="text" class="form-control"
              required
              :pattern="countryPostalCodeRegex"
              id="customerZip" placeholder="Zip / Postal Code"
              v-model="modelValue.postalCode"
            />
            <label for="customerZip" class="form-label">Zip / Postal Code</label>
            <div class="invalid-feedback">
              You must provide a valid postal code for your country
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3 form-floating">
        <input type="tel" class="form-control" id="customerPhoneNumber" placeholder="Phone number (optional)"
          v-model="modelValue.phoneNumber"
        />
        <label for="customerPhoneNumber" class="form-label" v-if="modelValue.countryCode === 'US'">Phone (optional)</label>
        <label for="customerPhoneNumber" class="form-label" v-else>Phone (required)</label>
      </div>
      <div class="mb-3" v-if="isShipping">
        <label class="d-block mb-2">Is this address Residential or Commercial?</label>
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" id="addrResidence" value="res" autocomplete="off" v-model="addrType" required>
          <label class="btn btn-outline-secondary" for="addrResidence" @click.prevent="addrTypeClick('res')">Residential</label>

          <input type="radio" class="btn-check" id="addrCommercial" value="com" autocomplete="off" v-model="addrType" required>
          <label class="btn btn-outline-secondary" for="addrCommercial" @click.prevent="addrTypeClick('com')">Commercial</label>
        </div>
        <div class="invalid-feedback" :class="{'d-block': wasValidated && addrType === null}">
          We need this for accurate shipping rates
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>

import { computed, ref, watch } from 'vue';
import type { CustomerAddress } from '../../account/accountStore';
import { useCartStore } from '../cartStore';
import SelectState from './select-state.vue';
import { validateCode } from './postCodeRegex';

const $cartStore = useCartStore();

const addressForm = ref<HTMLFormElement>();
const wasValidated = ref(false);

const props = withDefaults(defineProps<{
  modelValue: CustomerAddress,
  isShipping?: boolean,
}>(), {
  isShipping: true,
});

function checkValidity() {
  if (!addressForm.value) return;
  wasValidated.value = true;
  
  return addressForm.value.checkValidity() && addrType.value !== null;
}

const addrType = computed<'res' | 'com' | null>({
  get: () => {
    const curVal = props.modelValue.customFields?.isResidential;
    if (curVal === true) {
      return 'res';
    } else if (curVal === false) {
      return 'com';
    } else {
      return null;
    }
  },
  set: (newVal: 'res' | 'com' | null) => {
    if (newVal === 'res') {
      props.modelValue.customFields!.isResidential = true;
    } else if (newVal === 'com') {
      props.modelValue.customFields!.isResidential = false;
    } else {
      props.modelValue.customFields!.isResidential = undefined;
    }
  },
});
function addrTypeClick(type: 'res' | 'com') {
  if (addrType.value === type) {
    addrType.value = null;
  } else {
    addrType.value = type;
  }
};

const countryPostalCodeRegex = computed(() => {
  const countryCode = props.modelValue.countryCode!;

  if (countryCode in validateCode) {
    const regex = validateCode[countryCode as keyof typeof validateCode];
    return regex.source;
  } else {
    return '';
  }
});

defineExpose({
  checkValidity,
});

const emitUpdate = defineEmits(["update:modelValue"]);

</script>

<style lang="scss" scoped>
</style>