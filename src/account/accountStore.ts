

import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { shopSdk } from '../graphql/shopClient';
import LoginDialog from './loginDialog.vue';
import { openDialog } from '../lib/promiseDialog';

import { useLazyAsyncState } from '../lib/useLazyAsyncState';

import { md5 } from 'js-md5';
import { ActiveCustomerAddressesQuery, CreateAddressInput, OrderDetailFragment } from '../graphql/generated-shop';
import { NotNull } from '../lib/typeHelpers';

export interface UserRegistrationParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  callsign: string;
  phoneNumber?: string;
}

export function getEmptyAddress() {
  const addr: CustomerAddress = {
    fullName: '',
    company: '',
    streetLine1: '',
    streetLine2: '',
    city: '',
    province: '',
    postalCode: '',
    countryCode: 'US',
    phoneNumber: '',
    customFields: {
      firstName: '',
      lastName: '',
    },
  };
  return addr;
}

export function getBillingAddress (billingAddress: CustomerAddress) {
  const addr: CustomerAddress = {
    fullName: billingAddress?.fullName ?? '',
    company: billingAddress?.company ?? '',
    streetLine1: billingAddress?.streetLine1 ?? '',
    streetLine2: billingAddress?.streetLine2 ?? '',
    city: billingAddress?.city ?? '',
    province: billingAddress?.province ?? '',
    postalCode: billingAddress?.postalCode ?? '',
    countryCode: billingAddress?.countryCode ?? 'US',
    phoneNumber: billingAddress?.phoneNumber ?? '',
    customFields: {
      firstName: billingAddress?.customFields?.firstName ?? '',
      lastName: billingAddress?.customFields?.lastName ?? '',
    },
  };
  return addr;
}

const validEmailHistory: Record<string, boolean> = {};
export async function isValidEmail(email: string) {
  email = email.trim().toLowerCase();
  if (email in validEmailHistory) {
    return validEmailHistory[email];
  }
  const result = await shopSdk.IsValidEmail({ email: email.trim().toLowerCase() });
  const info = result.isValidEmail;
  if (info.__typename === 'ValidEmail') {
    validEmailHistory[email] = info.valid;
    return info.valid;
  } else {
    validEmailHistory[email] = false;
    throw new Error(`${info.__typename}: ${info.message}`);
  }
}

export type CustomerAddress = CreateAddressInput;

function useActiveCustomer() {
  const {
    state: currentCustomer,
    execute: updateCurrentCustomer,
    isLoading: customerRefreshing
  } = useLazyAsyncState(async () => {
    console.log("Loading current customer");
    const current = await shopSdk.CurrentCustomer();
    const data = current.activeCustomer;
    if (data?.__typename === 'Customer') {
      return data;
    } else {
      return null;
    }
  }, null, {
    immediate: true,
    resetOnExecute: false,
  });

  return {
    currentCustomer,
    updateCurrentCustomer,
    customerRefreshing,
  };
}

function useActiveCustomerAddresses() {
  const {
    state: customerAddresses,
    execute: updateCustomerAddresses,
    isLoading: customerAddressesRefreshing,
  } = useLazyAsyncState(async () => {
    console.log("Loading customer addresses");
    const resp = await shopSdk.activeCustomerAddresses();

    const data = resp.activeCustomer;
    if (data?.__typename === 'Customer' && data.addresses) {
      return data.addresses;
    } else {
      return [];
    }
  }, null, {
    immediate: false,
    resetOnExecute: false,
  });
  return {
    customerAddresses,
    updateCustomerAddresses,
    customerAddressesRefreshing,
  };
}
function useActiveCustomerOrders() {
  const {
    state: customerOrders,
    execute: updateCustomerOrders,
    isLoading: customerOrdersRefreshing,
  } = useLazyAsyncState(async () => {
    console.log("Loading customer orders");
    const resp = await shopSdk.activeCustomerOrders();

    const data = resp.activeCustomer;
    if (data?.__typename === 'Customer' && data.orders) {
      return data.orders.items;
    } else {
      return [];
    }
  }, null, {
    immediate: false,
    resetOnExecute: false,
  });
  return {
    customerOrders,
    updateCustomerOrders,
    customerOrdersRefreshing,
  };
}

export const useAccountStore = defineStore('account', () => {
  const lazyLoaded = {
    ...useActiveCustomer(),
    ...useActiveCustomerAddresses(),
    ...useActiveCustomerOrders(),
  };
  const {
    currentCustomer,
    updateCurrentCustomer
  } = lazyLoaded;

  const isLoggedIn = computed(() => {
    return !!currentCustomer.value;
  });

  const customerName = computed(() => {
    if (currentCustomer.value) {
      return currentCustomer.value.customFields?.callsign ||
        `${currentCustomer.value.firstName} ${currentCustomer.value.lastName}`;
    } else {
      return "Guest";
    }
  });

  const theCustomerAddresses = computed(() => {
    if (currentCustomer.value) {
      console.log("Returning addresses", currentCustomer.value.addresses);
      return currentCustomer.value.addresses;
    } else {
      return [];
    }
  });

  async function logout() {
    await shopSdk.logout();
    await updateCurrentCustomer();
  }
  async function showLogin() {
    await openDialog(LoginDialog);
  }

  async function tryLogin(email: string, password: string, rememberMe: boolean) {
    const result = await shopSdk.login({
      email, password, rememberMe: rememberMe,
    });

    const data = result.login;
    if (data.__typename === 'CurrentUser') {
      // Successful login
      await updateCurrentCustomer();
      return true;
    } else {
      return {
        type: data.__typename,
        message: data.message,
        code: data.errorCode,
      };
    }
  }

  async function resetPassword(token: string, password: string) {
    const result = await shopSdk.resetPassword({
      token, password,
    });

    const data = result.resetPassword;
    if (data.__typename === 'CurrentUser') {
      return true;
    } else {
      throw new Error(`${data.message}`);
    }
  }
  
  async function requestPasswordReset(emailAddress: string) {
    const result = await shopSdk.requestPasswordReset({
      emailAddress,
    });
    const data = result.requestPasswordReset;
    if (data?.__typename === 'Success') {
      return true;
    } else {
      const errorMessage = data?.message || "Unknown error. Please try again later or conatct shop owner.";
      throw new Error(errorMessage);
    }
  }

  async function tryRegister(params: UserRegistrationParams) {
    try {
      const result = await shopSdk.registerCustomerAccount({
        input: {
          emailAddress: params.email,
          firstName: params.firstname,
          lastName: params.lastname,
          password: params.password,
          ...(params.callsign && { customFields: { callsign: params.callsign } }),
        }
      });

      const data = result.registerCustomerAccount;
      switch(data.__typename) {
        case 'MissingPasswordError':
        case 'NativeAuthStrategyError':
        case 'PasswordValidationError':
          throw new Error(`${data.__typename}: ${data.errorCode} - ${data.message}`);
        case 'Success':
          return data.success;
      }
    } catch (err) {
      console.error("Error registering:", err);
    }
  }

  const email = computed(() => {
    if (currentCustomer.value) {
      return currentCustomer.value.emailAddress;
    } else {
      return "";
    }
  });

  return {
    fullname: computed(() => {
      if (currentCustomer.value) {
        return `${currentCustomer.value.firstName} ${currentCustomer.value.lastName}`;
      } else {
        return "Guest";
      }
    }),
    email,
    avatarUrl: computed(() => {
      if (email.value) {
        return `https://www.gravatar.com/avatar/${md5(email.value)}?s=100`;
      } else {
        return "";
      }
    }),

    customerName,
    isLoggedIn,

    tryLogin,
    logout,
    showLogin,
    tryRegister,
    theCustomerAddresses,
    resetPassword,
    requestPasswordReset,

    // Lazy-loaded remote data
    ...lazyLoaded,
  };
});
