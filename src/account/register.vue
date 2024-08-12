<template>
  <div class="form-register mx-auto" v-if="registerComplete">
    <!-- the user has registered and needs to check email to finish -->
    <div class="alert alert-success my-2" role="alert">
      <h4 class="alert-heading">Registration Complete!</h4>
      <p>
        Please check your email for a link to complete your registration.
      </p>
      <p>
        If you don't see the email, please check your spam folder.
      </p>
      <hr>
      <p class="mb-0">
        If you have any issues, please contact us at
        <a href="mailto:orders@signalstuff.com">orders@signalstuff.com</a>
      </p>
    </div>
  </div>
  <div class="form-register mx-auto" v-else>
    <form class="needs-validation" novalidate>
      <div class="form-floating">
        <input type="text"
          class="form-control"
          v-model="firstname"
          id="firstname"
          placeholder="John"
          :class="{'is-invalid': checkField('first'), 'is-valid': validChecked && !checkField('first')}"
          autocomplete="given-name">
        <label for="firstname">First Name</label>
        <div class="invalid-feedback">
          Some of our shipping providers require at least 2 digits for the first name
        </div>
      </div>
      <div class="form-floating">
        <input type="text"
          class="form-control"
          v-model="lastname"
          id="lastname"
          placeholder="Elmer"
          :class="{'is-invalid': checkField('last'), 'is-valid': validChecked && !checkField('last')}"
          autocomplete="family-name">
        <label for="lastname">Last Name</label>
        <div class="invalid-feedback">
          Some of our shipping providers require at least 2 digits for the last name
        </div>
      </div>
      <div class="form-floating">
        <input type="email"
          class="form-control"
          id="email"
          v-model="email"
          placeholder="john@elmer.com"
          :class="{'is-invalid': checkField('email'), 'is-valid': validChecked && !checkField('email')}"
          autocomplete="email">
        <label for="email">Email address</label>
        <div class="invalid-feedback">
          You must enter a valid email address
        </div>
      </div>
      <div class="form-floating">
        <input type="password"
          class="form-control"
          id="password1"
          v-model="password1"
          placeholder="Password"
          :class="{'is-invalid': checkField('password1'), 'is-valid': validChecked && !checkField('password1')}"
          autocomplete="new-password">
        <label for="password1">Password</label>
        <div class="invalid-feedback">
          Your password must be at least 8 characters long
        </div>
      </div>
      <div class="form-floating">
        <input type="password"
          class="form-control"
          id="password2"
          v-model="password2"
          placeholder="Re-enter Password"
          :class="{'is-invalid': checkField('password2'), 'is-valid': validChecked && !checkField('password2')}"
          autocomplete="new-password">
        <label for="password2">Re-enter Password</label>
        <div class="invalid-feedback">
          Your passwords must match
        </div>
      </div>
      <div class="form-floating">
        <input type="text"
          class="form-control text-uppercase"
          id="callsign"
          v-model="callsign"
          :class="{'is-valid': validChecked}"
          placeholder="Call Sign (optional)">
        <label for="callsign">Call Sign (optional)</label>
      </div>

      <div v-if="errorMsg" class="alert alert-danger my-2" role="alert">
        {{ errorMsg }}
      </div>

      <button class="btn btn-primary w-75 py-2 mt-5 mx-auto" @click.prevent="register">Register</button>
      
    </form>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { emailValidateRegex } from '../lib/emailRegex';
import { useAccountStore } from './accountStore';

const registerComplete = ref(false);
const errorMsg = ref('');

const $account = useAccountStore();

const validChecked = ref(false);
const isFormValid = ref(false);

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password1 = ref('');
const password2 = ref('');
const callsign = ref('');

async function register() {
  console.log('register');
  validChecked.value = true;
  isFormValid.value = true;
  for (const field of <const>['first', 'last', 'email', 'password1', 'password2']) {
    if (checkField(field)) {
      isFormValid.value = false;
      return;
    }
  }

  try {
    await $account.tryRegister({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password1.value,
      callsign: callsign.value.toUpperCase(),
    });
    registerComplete.value = true;
    console.log("Registered!");
  } catch (err) {
    console.error("Error registering", err);
    return;
  }
}

// function checkField(field: 'first' | 'last' | 'email' | 'password1' | 'password2') {
//   console.log("Checking field", field, firstname.value.length, lastname.value.length, email.value.length, password1.value.length, password2.value.length);

//   const res = _checkField(field);

//   console.log("Checked field", field, res);

//   return res;
// }
function checkField(field: 'first' | 'last' | 'email' | 'password1' | 'password2') {
  if (!validChecked.value) {
    return false;
  }
  // console.log("Checking field", field, firstname.value.length, lastname.value.length, email.value.length, password1.value.length, password2.value.length);
  switch(field) {
    case 'first':
      return firstname.value.length < 2;
    case 'last':
      return lastname.value.length < 2;
    case 'email':
      return !emailValidateRegex.test(email.value);
    case 'password1':
      return password1.value.length < 8;
    case 'password2':
      if (!password1.value) { return false; }
      return password2.value !== password1.value;
    break;
  }
}

</script>

<style scoped lang="scss">

.form-register {
  max-width: 100%;
  width: 400px;
  padding: 1rem;
  text-align: center;
}

.form-register .form-floating:focus-within {
  z-index: 2;
}

.form-register input {
  margin-bottom: -1px;
  border-radius: 0;
}
.form-register input#firstname {
  margin-bottom: -1px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}

.form-register input#callsign {
  margin-bottom: 10px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}


</style>
