<template>
  <div class="form-reset mx-auto">
    <form>
      <div class="form-floating">
        <div class="form-floating">
        <input type="password"
          class="form-control"
          id="password1"
          v-model="password1"
          placeholder="Password"
          autocomplete="new-password">
        <label for="password1">Password</label>
      </div>
      <div class="form-floating">
        <input type="password"
          class="form-control"
          id="password2"
          v-model="password2"
          placeholder="Re-enter Password"
          autocomplete="new-password">
        <label for="password2">Re-enter Password</label>
      </div>
      </div>

      <div v-if="errorMsg" class="alert alert-danger my-3" role="alert">
        {{ errorMsg }}
      </div>

      <button class="btn btn-primary w-75 py-2 mt-5 mx-auto" @click.prevent="reset">Reset</button>
      
    </form>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useAccountStore } from './accountStore';

const password1 = ref('');
const password2 = ref('');
const errorMsg = ref('');
const $account = useAccountStore();

async function reset() {
  const theCondition = password1.value.length >= 8 && password1.value === password2.value;
  if (theCondition) {
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get('token');
    if(!resetToken) {
      errorMsg.value = "No reset token found in URL for password reset.";
      return;
    }

    $account.resetPassword(resetToken, password1.value)
      .then(() => {
        errorMsg.value = "Password reset successfully. Redirecting towards shop...";
        setTimeout(() => {
          window.location.href = window.location.origin + '/shop';
        }, 2000);
      })
      .catch((err) => {
        errorMsg.value = err;
      });

  }else{
    errorMsg.value = "Your passwords must match and have at least 8 characters.";
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
