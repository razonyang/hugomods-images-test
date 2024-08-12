<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="modalEl">
    <div class="modal-dialog form-signin">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <h5 class="modal-title position-absolute translate-middle-x start-50">Sign in</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @close="closeDialog"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-floating">
              <input type="email" class="form-control"
                autofocus id="floatingInput"
                placeholder="name@example.com"
                autocomplete="email"
                v-model.trim="emailField"
                :class="{'is-invalid': validChecked && !validEmail}"
                @change="resetValidations"
              >
              <label for="floatingInput">Email address</label>
              <div class="invalid-feedback">
                You must enter a valid email address
              </div>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control"
                id="floatingPassword"
                placeholder="Password"
                autocomplete="current-password"
                v-model.trim="passwordField"
                :class="{'is-invalid': validChecked && !validPassword}"
                @change="resetValidations"
              >
              <label for="floatingPassword">Password</label>
              <div class="invalid-feedback">
                Your password is invalid
              </div>
            </div>
            <div class="form-check text-start my-2">
              <input class="form-check-input" v-model="rememberMe" type="checkbox" :value="true" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Remember me
              </label>
            </div>

            <div v-if="errorMsg" class="alert alert-warning" role="alert">
              {{ errorMsg }}
            </div>

            <button class="btn btn-primary w-75 py-2" @click.prevent="tryLogin">Sign in</button>

            <div class="row mt-3">
              <div class="col text-end">
                <a class="btn btn-sm btn-text" @click.prevent="routeAndClose('/account/request-reset')">Forgot password?</a> |
                <a class="btn btn-sm btn-text" @click.prevent="routeAndClose('/account/register')">Create account</a>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </div> 
  </div>
</template>

<script setup lang="ts">

import Modal from 'bootstrap/js/dist/modal';
import { closeDialog } from '../lib/promiseDialog';
import { ref, onMounted, computed } from 'vue';
import { shopSdk } from '../graphql/shopClient';
import { emailValidateRegex } from '../lib/emailRegex';
import { useAccountStore } from '../account/accountStore';

const modalEl = ref<HTMLElement | null>(null);

const $account = useAccountStore();

const validChecked = ref(false);

const validPassword = computed(() => {
  return passwordField.value.length >= 8;
})
const validEmail = computed(() => {
  return emailValidateRegex.test(emailField.value.trim());
});

let bsModal: Modal | null = null;

const emailField = ref('');
const passwordField = ref('');
const rememberMe = ref(false);

const errorMsg = ref('');

function routeAndClose(route: string) {
  window.location.href = route;
  closeModal(false);
}

function closeModal(result: boolean) {
  bsModal?.hide();
  closeDialog(result);
}
onMounted(() => {
  if (modalEl.value) {
    bsModal = new Modal(modalEl.value);
    bsModal.show();
  }
});

function resetValidations() {
  errorMsg.value = '';
}

async function tryLogin() {
  validChecked.value = true;
  
  if (!validEmail.value || !validPassword.value) {
    return;
  }
  
  try {
    const result = await $account.tryLogin(emailField.value.trim(), passwordField.value, rememberMe.value);

    if (typeof result === 'boolean') {
      closeModal(result);
    } else {
      switch(result.type) {
        case 'InvalidCredentialsError':
          errorMsg.value = 'Invalid email or password';
          break;
        case 'NotVerifiedError':
          errorMsg.value = 'Your account has not been verified. Please check your email for a verification link.';
          break;
        default:
          errorMsg.value = `Unknown error occurred: ${result.type}: ${result.message}`;
          break;
      }
    }
  } catch (e: any) {
    errorMsg.value = `Unknown error occurred: ${e?.message || e}`
    console.error(e);
  }
}

function returnValue() {
  return true;
}

defineExpose({
  returnValue,
});

</script>

<style scoped lang="scss">

.form-signin {
  max-width: 100%;
  width: 400px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}


</style>
