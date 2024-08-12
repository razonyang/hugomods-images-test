<template>
  <div class="container" v-if="$account.theCustomerAddresses?.length">
    <div class="mt-5 form-floating">
      <select
        class="form-select"
        id="customerAddresses"
        @change="onAddressChange($event)"
      >
        <option value="" selected>Select your saved address</option>
        <option
          v-for="address in $account.theCustomerAddresses"
          :key="address.id"
          :value="address.id"
        >
          {{ address.fullName }},
          {{ address.streetLine1 }} {{ address.streetLine2 }},
          {{ address.city }}, {{ address.province }}, {{ address.postalCode }},
          {{ address.country.code }}
          {{ address.phoneNumber ? ", " : "" }}
          {{ address.phoneNumber }}
        </option>
      </select>
      <label for="customerAddresses" class="form-label"
        >Select your saved address</label
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAccountStore } from "../../account/accountStore";
import { Address } from "../../graphql/generated-shop";

const $account = useAccountStore();

const props = defineProps<{
  modelValue: {
    address: Address | null;
  };
}>();

function onAddressChange(event: any) {
  if (event.target.value && event.target.value !== "" && $account.theCustomerAddresses) {
    props.modelValue.address = $account.theCustomerAddresses.find(
      (address) => address.id === event.target.value
    ) as Address || null;
  } else {
    props.modelValue.address = null;
  }
}
</script>

<style lang="scss" scoped></style>
