<template>
  <form novalidate="true" action="#">
    <div class="row">
      <div class="col-12">
        <label for="credit-card-number" class="fw-bold">Card Number:</label>
        <div class="input-group">
          <div class="input-group-text">
            <FontAwesomeIcon :icon="cardIcon" />
          </div>
          <input
            autocomplete="cc-number"
            v-model="modelValue.cardNumber"
            id="credit-card-number"
            type="text"
            name="credit-card-number"
            class="form-control"
            autocorrect="off"
            autocapitalize="none"
            spellcheck="false"
            inputmode="numeric"
            pattern="\d*"
            maxlength="25"
            v-maska
            :data-maska="cardNumberMask"
            data-maska-tokens="0:[0-9]:optional"
            placeholder="&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;"
          />
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-6">
        <label for="expiration-autofill-field">Expires:</label>
        <input
          autocomplete="cc-exp"
          v-model="expiration"
          id="expiration-autofill-field"
          type="text"
          name="expiration-month"
          class="form-control"
          autocorrect="off"
          autocapitalize="none"
          spellcheck="false"
          inputmode="numeric"
          pattern="\d*"
          placeholder="MM/YYYY"
          v-maska
          data-maska="#9/##99"
          data-maska-tokens="9:[0-9]:optional"
          @blur="formatExpiration(expiration)"
        />
      </div>
      <div class="col-6">
        <label for="">&nbsp;CVV:</label>
        <input
          autocomplete="cc-csc"
          v-model="modelValue.cardCode"
          id="cvv-autofill-field"
          type="text"
          name="cvv"
          class="form-control"
          autocorrect="off"
          autocapitalize="none"
          spellcheck="false"
          inputmode="numeric"
          pattern="\d*"
          maxlength="4"
          placeholder="CVV"
          v-maska
          :data-maska="cardCodeMask"
          data-maska-tokens="0:[0-9]:optional"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { AuthorizeNetCardData } from "./authorizeNet";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as fa from "../../icons/fontawesome";
import { vMaska } from "maska";

import { cardFromNumber, validateCardNumber } from "../card/payment";

const expiration = ref("");
const params = defineProps<{
  modelValue: AuthorizeNetCardData;
}>();

watch(
  () => [params.modelValue.month, params.modelValue.year],
  (newVal) => {
    if (newVal[0] && newVal[1]) {
      formatExpiration(newVal[0] + "/" + newVal[1]);
    }
  },
  { deep: true }
);

const cardObj = computed(() => cardFromNumber(params.modelValue.cardNumber));
const cardType = computed(() => cardObj.value?.type || "unknown");
const cardIsValid = computed(() => {
  return validateCardNumber(params.modelValue.cardNumber);
});
const expiryValid = computed(() => {
  const { month, year } = params.modelValue;
  if (!month || !year) {
    return false;
  }

  const fullYear = Number(`20${year}`);
  const monthNum = Number(month);
  const today = new Date();
  if (fullYear < today.getFullYear()) {
    return false;
  } else if (fullYear === today.getFullYear()) {
    return monthNum >= today.getMonth() + 1;
  } else {
    return monthNum > 0 && monthNum <= 12;
  }
});
const cardNumberMask = computed(() => {
  return cardObj.value?.mask || "#### #### #### ####";
});
const cardCodeMask = computed(() => {
  return cardObj.value?.cvcMask || "###0";
});

const iconMap = {
  visa: fa.faCcVisa,
  mastercard: fa.faCcMastercard,
  amex: fa.faCcAmex,
  discover: fa.faCcDiscover,
  dinersclub: fa.faCcDinersClub,
  jcb: fa.faCcJcb,
  unknown: fa.faCreditCard,
};

const cardIcon = computed(() => {
  if (cardType.value in iconMap) {
    return iconMap[cardType.value];
  } else {
    return fa.faCreditCard;
  }
});

function formatExpiration(exp: string) {
  // Could be M/YY or MM/YY or M/YYYY or MM/YYYY
  const parts = exp.split("/");
  if (!parts[0]?.trim()) {
    expiration.value = "";
    params.modelValue.month = "";
    params.modelValue.year = "";
    return;
  } else if (parts.length === 1) {
    if (parts[0].length === 1) {
      parts[0] = "0" + parts[0];
    }
    exp = parts[0].padStart(2, "0") + "/";
  } else if (parts.length === 2) {
    let [month, year] = parts;
    month = month.padStart(2, "0");
    if (year.length < 4) {
      year = "20" + year.slice(-2);
    }
    exp = `${month}/${year}`;
  }
  if (expiration.value !== exp) {
    expiration.value = exp;
  }
  const [month, year] = exp.split("/");
  if (Number(month)) params.modelValue.month = month.padStart(2, "0");
  params.modelValue.year = year.substring(2); // Last two digits only
}

// const cardNumberMask = {
//   mask: (value: string) => {
//     const card = cardFromNumber(value);

//   }
// };
</script>
