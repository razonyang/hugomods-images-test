<template>
  <div class="form-reset mx-auto">
    <form>
      <div class="form-floating">
        <div class="form-floating">
          <input type="email"
          class="form-control"
          id="email"
          v-model="email"
          placeholder="john@elmer.com"
          autocomplete="email">
        <label for="email">Email address</label>
      </div>
      </div>

      <div v-if="errorMsg" class="alert alert-danger my-3" role="alert">
        {{ errorMsg }}
      </div>

      <button class="btn btn-primary w-75 py-2 mt-5 mx-auto" @click.prevent="requestReset">Reset Password</button>
      
    </form>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useAccountStore, isValidEmail } from './accountStore';

const email= ref('');
const errorMsg = ref('');
const $account = useAccountStore();

async function requestReset() {
  const theCondition = await isValidEmail(email.value);
  if (theCondition) {
    $account.requestPasswordReset(email.value)
      .then(() => {
        errorMsg.value = "Password reset request sent. Check your email for further instructions.";
      })
      .catch((err) => {
        errorMsg.value = err;
      });

  }else{
    errorMsg.value = "Invalid email address";
    return;
  }
}

</script>

<style scoped lang="scss">

.form-reset {
  max-width: 100%;
  width: 400px;
  padding: 1rem;
  text-align: center;
}

.form-reset .form-floating:focus-within {
  z-index: 2;
}

.form-reset input {
  margin-bottom: -1px;
  border-radius: 0;
}


</style>
