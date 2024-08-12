
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

import { shopSdk } from '../graphql/shopClient';

import type {
  ActiveOrderQuery, ActiveOrderFullQuery, AddItemToOrderMutation, AdjustOrderLineMutation, Customer, CreateAddressInput, ErrorResult, UpdateOrderInput,
} from '../graphql/generated-shop';
import type { NotNull } from '../lib/typeHelpers';
import { useLazyAsyncState } from '../lib/useLazyAsyncState';
import { CustomerAddress, UserRegistrationParams } from '../account/accountStore';
import { pick } from '../lib/pick';
import { AuthorizeNetSecureData } from './checkout/authorizeNet';

export type OrderType = NotNull<ActiveOrderQuery['activeOrder']>;
export type FullOrderType = NotNull<ActiveOrderFullQuery['activeOrder']>;

// Declare a custom javascript error type EmailAddressConflictError
export class EmailAddressConflictError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'EmailAddressConflictError';

    // This line maintains proper stack trace for where our error was thrown (only available on V8)
    Error.captureStackTrace?.(this, EmailAddressConflictError);
  }
}

function useCurrentOrderDetailed() {
  const vars = useLazyAsyncState(async () => {
    const result = await shopSdk.activeOrderFull();

    return result.activeOrder;
  }, null, { resetOnExecute: false }, 'currentOrderDetailed');

  return {
    currentOrderDetailed: vars.state,
    currentOrderDetailedLoading: vars.isLoading,
    updateCurrentOrderDetailed: vars.execute,
  }
}
function useCurrentOrderSummary() {
  const vars = useLazyAsyncState(async () => {
    const result = await shopSdk.activeOrder();

    return result.activeOrder;
  }, null, { resetOnExecute: false }, 'currentOrderSummary');

  return {
    currentOrderSummary: vars.state,
    currentOrderSummaryLoading: vars.isLoading,
    updateCurrentOrderSummary: vars.execute,
  }
}

function useAvailableCountries() {
  const {
    execute: updateAvailableCountries,
    state: availableCountries,
    isLoading: availableCountriesLoading,
  } = useLazyAsyncState(async () => {
    console.warn("Loading available countries");
    const resp = await shopSdk.availableCountries();
    return resp.availableCountries;
  }, [], { resetOnExecute: false }, 'availableCountries');

  return {
    updateAvailableCountries,
    availableCountries,
    availableCountriesLoading,
  };
}

function useAllShippingRates() {
  const result = useLazyAsyncState(async () => {
    const [shipstationRates, allMethods] = await Promise.all([
      shopSdk.orderShippingRates(),
      shopSdk.eligibleShippingMethods(),
    ]);

    // Combine them into something useful

    const ssRates = shipstationRates.orderAllAvailableRates;
    const methods = allMethods.eligibleShippingMethods;

    const output = methods.flatMap((method) => {
      if (method.code === 'ship-station') {
        // All shipstation rates use this method
        return ssRates.flatMap(carrier => carrier.services.map(service => ({
          name: service.serviceName,
          methodId: method.id,
          methodCode: method.code,
          shipmentCost: service.shipmentCost,
          otherCost: service.otherCost,
          key: `${carrier.code}-${service.serviceCode}`,
          carrierCode: carrier.code as string | null,
          serviceCode: service.serviceCode as string | null,
        })));
      } else {
        return {
          name: method.name,
          methodId: method.id,
          methodCode: method.code,
          shipmentCost: method.price,
          otherCost: method.priceWithTax - method.price, // May not be what we want
          key: method.id,
          carrierCode: null,
          serviceCode: null,
        };
      }
    });

    // Sort by price, low to high
    output.sort((a, b) => (a.shipmentCost + a.otherCost) - (b.shipmentCost + b.otherCost));
    return output;
  }, null, { resetOnExecute: false }, 'allShippingRates');
  return {
    allShippingRates: result.state,
    allShippingRatesLoading: result.isLoading,
    updateAllShippingRates: result.execute,
    allShippingRatesLoaded: result.isReady,
  };
}

export const useCartStore = defineStore('cart', () => {
  const cartVisible = ref(false);

  const isLoading = ref(0);

  const orderData = ref<FullOrderType>({} as any);

  const placedOrderCode = ref<string | null>(null);

  const authorizeNetData = ref<AuthorizeNetSecureData>({} as any);

  const paymentMethodCode = ref<string | null>(null);

  // Loaded on demand, get the available countries
  const lazyLoaded = {
    ...useAvailableCountries(),
    ...useCurrentOrderDetailed(),
    ...useCurrentOrderSummary(),
    ...useAllShippingRates(),
  };
  function refreshShippingRates() {
    if (lazyLoaded.allShippingRatesLoaded || lazyLoaded.allShippingRatesLoading) {
      // This way if they haven't been loaded it won't refresh them, but it will if they have
      lazyLoaded.updateAllShippingRates();
    }
  }

  watch(lazyLoaded.currentOrderDetailed, (newVal) => {
    // Any time this updates it's "the definitive source" for our active order
    if (newVal) {
      orderData.value = structuredClone(newVal);
    }
  });
  watch(lazyLoaded.currentOrderSummary, (newVal) => {
    // Any time this updates use it to update any missing fields in our active order
    if (newVal) {
      orderData.value = {
        ...orderData.value,
        ...structuredClone(newVal),
      }
    }
  });

  const hasItemDiscount = (item: FullOrderType['lines'][0]) => !!item.discounts?.some(d => d.amount);
  const adjustedItemPrice = (item: FullOrderType['lines'][0]) => {
    // discount is (presumably) always negative
    const discount = item.discounts?.reduce((acc, cur) => acc + cur.amount, 0) || 0;
    return item.unitPrice + (discount / item.quantity);
  };
  const adjustedLinePrice = (line: FullOrderType['lines'][0]) => {
    const discount = line.discounts?.reduce((acc, cur) => acc + cur.amount, 0) || 0;
    return line.linePrice + discount;
  };

  function formatPrice(price: number) {
    const adjPrice = price / 100;
    if (isNaN(adjPrice)) return (0).toFixed(2);
    else return (price / 100).toFixed(2);
  }

  const activeOrder = computed(() => {
    return orderData.value;
  });

  const shippingCost = computed(() => {
    return formatPrice(orderData.value.shipping);
  });

  const orderTotal = computed(() => {
    const totalCost = orderData.value.lines?.reduce((acc, cur) => acc + cur.quantity * cur.unitPrice, 0) || 0;
    return formatPrice(totalCost);
  });

  const taxTotal = computed(() => {
    const orderTaxes = orderData.value.taxSummary?.reduce((acc, cur) => acc + cur.taxTotal, 0) || 0;
    return formatPrice(orderTaxes);
  });

  const customerEmail = computed(() => {
    return orderData.value.customer?.emailAddress;
  });

  const subtotal = computed(() => {
    return formatPrice(orderData.value.subTotal);
  });
  const total = computed(() => {
    return formatPrice(orderData.value.totalWithTax);
  });

  const discount = computed(() => {
    const totalDiscount = orderData.value.discounts?.reduce((acc, cur) => acc + cur.amount, 0) || 0;
    return `${formatPrice(totalDiscount)}`.replace(/^-?/, '$&\$');
  });

  const couponCodes = computed(() => {
    return orderData.value.couponCodes || [];
  });

  const customFields = computed(() => {
    return orderData.value.customFields;
  });

  const items = computed(() => {
    return orderData.value.lines || [];
  });
  const itemCount = computed(() => {
    return items.value.reduce((acc, cur) => acc + cur.quantity, 0);
  });

  const finalOrderCode = computed(() => {
    if (!placedOrderCode.value) {
      const storedCode = window.localStorage.getItem('placedOrderCode');
      if (storedCode) {
        placedOrderCode.value = storedCode;
      }
    }
    return placedOrderCode.value;
  });

  const curShippingMethod = computed(() => {
    const curMethod = orderData.value.shippingLines?.[0]?.shippingMethod;
    if (curMethod?.code === 'ship-station') {
      // Special handling
      return {
        methodId: curMethod.id,
        methodCode: 'ship-station' as const,
        carrierCode: orderData.value.customFields?.carrierCode,
        serviceCode: orderData.value.customFields?.serviceCode,
      };
    } else if (curMethod) {
      return {
        methodId: curMethod.id,
      };
    } else {
      return null;
    }
  });
  const shippingTotal = computed(() => {
    if (!orderData.value.shippingLines?.length) return null;
    const total = orderData.value.shippingLines?.reduce((acc, cur) => acc + cur.priceWithTax, 0) || 0;
    return total;
  });

  const authorizeNetSecureData = computed(() => {
    return authorizeNetData.value;
  });

  const selectedPaymentMethodCode = computed(() => {
    return paymentMethodCode.value;
  });

  function updateOrder(updates: Partial<OrderType | FullOrderType>) {
    console.log("Updating order", updates)
    for (const [key, value] of Object.entries(updates)) {
      (orderData.value as any)[key] = structuredClone(value);
    }
    refreshShippingRates(); // Update rates in case free shipping was added / removed
  }

  function updatePaymentData(updates: Partial<AuthorizeNetSecureData>, methodCode: string) {
    authorizeNetData.value = {
      ...authorizeNetData.value,
      ...updates,
    }
    paymentMethodCode.value = methodCode;
  }

  async function ensureOrderExists() {
    if (!orderData.value) {
      await refresh();
    }
    if (!orderData.value) {
      throw new Error("Could not add to order, order not loading");
    }
  }

  async function refresh(full = false) {
    try {
      isLoading.value++;
      if (full) {
        await lazyLoaded.updateCurrentOrderDetailed();
      } else {
        await lazyLoaded.updateCurrentOrderSummary();
      }
    } catch (err) {
      console.error("Could not refresh shopping cart! ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }
  async function removeFromCart(variantId: string) {
    try {
      isLoading.value++;
      await ensureOrderExists();

      const result = await shopSdk.removeOrderLine({ orderLineId: variantId });
      const info = result.removeOrderLine;
      if (!info.__typename) {
        throw new Error("Could not remove item from order, unknown error" + JSON.stringify(result));
      } else if (info.__typename !== "Order") {
        throw new Error("Could not remove item from order: " + JSON.stringify(info));
      } else {
        updateOrder(info);
      }
    } catch (err) {
      console.error("Could not remove item from order: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }
  function processOrderChange(variantId: string, result: AddItemToOrderMutation | AdjustOrderLineMutation) {
    const info = ('addItemToOrder' in result) ?
      result.addItemToOrder : result.adjustOrderLine;
    if (!info.__typename) {
      throw new Error("Could not add item to order, unknown error" + JSON.stringify(result));
    }
    switch (info.__typename) {
      case 'InsufficientStockError':
        // insufficientAvail.value[variantId] = info.quantityAvailable;
        updateOrder(info.order);
        break;
      case 'Order':
        updateOrder(info);
        break;
      case 'NegativeQuantityError':
      case 'OrderLimitError':
      case 'OrderModificationError':
        throw new Error("Could not add item to order: " + info.message);
    }
  }
  async function addToCart(variantId: string, quantity: number) {
    try {
      isLoading.value++;
      await ensureOrderExists();
      const result = await shopSdk.addItemToOrder({
        productVariantId: variantId,
        quantity,
      });

      processOrderChange(variantId, result);

      return orderData.value;
    } catch (err) {
      console.error("Could not add item to order: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }
  async function updateItemQuantities(quantities: { id: string; quantity: number }[]) {
    try {
      isLoading.value++;
      // Doing all of this asynchronously would be slightly better, but it's not worth the complexity
      // and potential for out-of-order results to mess with things
      for (const { id, quantity } of quantities) {
        if (quantity === 0) {
          await removeFromCart(id); // This automatically updates things, no need to do anything special
        } else {
          const result = await shopSdk.adjustOrderLine({ orderLineId: id, quantity });
          processOrderChange(id, result);
        }
      }
    } catch (err) {
      console.error("Could not update item quantities: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }

  async function setShippingAddress(address: CustomerAddress) {
    try {
      isLoading.value++;
      await ensureOrderExists();
      if (address.customFields?.firstName && address.customFields?.lastName) {
        address.fullName = `${address.customFields.firstName} ${address.customFields.lastName}`;
      }
      const input = address as CreateAddressInput;
      const result = await shopSdk.setOrderShippingAddress({
        input,
      });
      const info = result.setOrderShippingAddress;
      if (!info.__typename) {
        throw new Error("Could not set shipping address, unknown error" + JSON.stringify(result));
      } else if (info.__typename !== "Order") {
        throw new Error("Could not set shipping address: " + JSON.stringify(info));
      } else {
        updateOrder(info);
      }
    } catch (err) {
      console.error("Could not set shipping address: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }

  async function setBillingAddress(address: CustomerAddress) {
    try {
      isLoading.value++;
      await ensureOrderExists();
      if (address.customFields?.firstName && address.customFields?.lastName) {
        address.fullName = `${address.customFields.firstName} ${address.customFields.lastName}`;
      }
      address.customFields = {
        ...address.customFields,
        email: orderData.value.customer?.emailAddress,
      };
      const input = address as CreateAddressInput;
      const result = await shopSdk.setOrderBillingAddress({
        input,
      });
      const info = result.setOrderBillingAddress;
      if (!info.__typename) {
        throw new Error("Could not set billing address, unknown error" + JSON.stringify(result));
      } else if (info.__typename !== "Order") {
        throw new Error("Could not set billing address: " + JSON.stringify(info));
      } else {
        updateOrder(info);
      }
    } catch (err) {
      console.error("Could not set billing address: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }

  async function applyCouponCode(code: string) {
    try {
      isLoading.value++;
      await ensureOrderExists();
      const result = await shopSdk.ApplyCouponCode({
        code
      });
      const info = result.applyCouponCode;
      if (!info.__typename || info.__typename !== "Order") {
        console.error("Could not apply coupon code, error", JSON.stringify(result));
        const errorResult = result.applyCouponCode as ErrorResult;
        return {
          success: false,
          message: errorResult.message,
        }
      } else {
        updateOrder(info);
        return {
          success: true,
          message: "Coupon code applied"
        }
      }
    } catch (err) {
      console.error("Could not apply coupon code: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }

  async function removeCouponCode(code: string) {
    try {
      isLoading.value++;
      await ensureOrderExists();
      const result = await shopSdk.RemoveCouponCode({
        code
      });
      const info = result.removeCouponCode
      if (!info?.__typename || info.__typename !== "Order") {
        throw new Error("Could not remove coupon code");
      } else {
        updateOrder(info);
      }
    } catch (err) {
      console.error("Could not remove coupon code: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }

  async function setOrderCustomFields(
    customFields: UpdateOrderInput
  ) {
    try {
      isLoading.value++;
      await ensureOrderExists();
      const result = await shopSdk.SetOrderCustomField({
        input: customFields
      });
      const info = result.setOrderCustomFields;
      if (!info?.__typename || info.__typename !== "Order") {
        throw new Error("Could not set custom fields: " + info.message);
      } else {
        updateOrder(info);
      }
    } catch (err) {
      console.error("Could not set custom fields: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }

  async function transitionOrderToState(
    state: string
  ) {
    try {
      isLoading.value++;
      await ensureOrderExists();
      const result = await shopSdk.TransitionOrderToState({
        state
      });
      const info = result.transitionOrderToState;
      if (!info?.__typename || info.__typename !== "Order") {
        if (info?.toState === info?.toState) {
          // If the state is already the desired state, then we don't need to do anything
          return;
        }
        throw new Error("Could not transition order to state " + info?.message);
      } else {
        updateOrder(info);
      }
    } catch (err) {
      console.error("Could not transition order to state: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }

  async function setOrderShippingMethod(
    method: { methodId: string, methodCode: string, carrierCode?: string | null, serviceCode?: string | null, name?: string | null }
  ) {
    try {
      isLoading.value++;
      await ensureOrderExists();

      if (method.methodCode === 'ship-station') {
        await setOrderCustomFields({
          customFields: {
            carrierCode: method.carrierCode,
            serviceCode: method.serviceCode,
            serviceName: method.name,
          }
        });
      }
      const result = await shopSdk.setOrderShippingMethod({
        shippingMethodId: method.methodId,
      });
      const info = result.setOrderShippingMethod;
      if (!info?.__typename || info.__typename !== "Order") {
        throw new Error("Could not set shipping method: " + info.message);
      } else {
        updateOrder(info);
      }
    } catch (err) {
      console.error("Could not set shipping method: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }

  async function addPaymentToOrder(
    method: string,
    metadata: Record<string, any>,
  ) {
    try {
      isLoading.value++;
      await ensureOrderExists();
      const result = await shopSdk.addPaymentToOrder({
        input: {
          method,
          metadata
        }
      });
      const info = result.addPaymentToOrder;
      if (!info?.__typename || info.__typename !== "Order") {
        throw new Error("Could not add payment to order: " + info.message );
      } else {
        placedOrderCode.value = info.code;
        window.localStorage.setItem('placedOrderCode', info.code);
        orderData.value = {} as any;
      }
    } catch (err) {
      console.error("Could not add payment to order: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }

  async function setTaxCloudAuthorization(){
    try {
      isLoading.value++;
      await ensureOrderExists();
      const result = await shopSdk.SetTaxCloudAuthorization();
      const info = result.setTaxCloudAuthorization;
      updateOrder(info);
    } catch (err) {
      console.error("Could not set tax cloud authorization: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }

  async function createGuestOrderCustomer(orderCode: string){
    try {
      isLoading.value++;
      const result = await shopSdk.createGuestOrderCustomerUser({
        orderCode
      });
      const info = result.createGuestOrderCustomerUser;
      if(info?.__typename !== 'Customer'){
        throw new Error("Could not create guest order customer. Please try manual signup");
      }
      return info;
    } catch (err) {
      console.error("Could not create guest order customer: ", err);
      throw err;
    } finally {
      isLoading.value--;
    }
  }

  async function setGuestAccount(params: Omit<UserRegistrationParams, 'password'>) {
    try {
      const result = await shopSdk.setCustomerForOrder({
        input: {
          firstName: params.firstname,
          lastName: params.lastname,
          emailAddress: params.email,
          phoneNumber: params.phoneNumber,
          ...(params.callsign && {
            customFields: {
              callsign: params.callsign,
            }
          }),
        }
      });

      const info = result.setCustomerForOrder;
      if (info.__typename === 'Order') {
        updateOrder(
          pick(info, [
            'customer',
            'subTotal',
            'state',
          ])
        );
      } else if (info.__typename === 'EmailAddressConflictError') {
        throw new EmailAddressConflictError("There is already an account for this email address, please log in to continue");
      } else if (info.errorCode) {
        throw new Error(`${info.__typename || (<any>info).errorCode}: ${info.message}`);
      } else {
        throw new Error("Unknown error setting guest account: " + JSON.stringify(info));
      }
    } catch (err) {
      console.error("Error setting guest account:", err);
      throw err;
    }
  }

  refresh();

  const formattedShippingAddress = computed(() => {
    if (orderData.value.shippingAddress) {
      const addr = orderData.value.shippingAddress;
      const parts = [
        addr.streetLine1,
        addr.streetLine2,
        `, ${addr.city} ${addr.province} ${addr.postalCode}, `,
        addr.countryCode,
      ];
      return parts.filter((x) => x).join(' ');
    } else {
      return '';
    }
  });

  const formattedBillingAddress = computed(() => {
    if (orderData.value.billingAddress) {
      const addr = orderData.value.billingAddress;
      const parts = [
        addr.streetLine1,
        addr.streetLine2,
        `, ${addr.city} ${addr.province} ${addr.postalCode}, `,
        addr.countryCode,
      ];
      return parts.filter((x) => x).join(' ');
    } else {
      return '';
    }
  });

  function getShippingRates() {
    const result = useLazyAsyncState(async () => {
      const rates = await shopSdk.orderShippingRates();
      return rates.orderAllAvailableRates;
    }, null, { resetOnExecute: true }, 'shippingRates');
    return {
      shippingRates: result.state,
      shippingRatesLoading: result.isLoading,
      updateShippingRates: result.execute,
      shippingRatesLoaded: result.isReady,
    };
  }

  async function getEligibleShippingMethods() {
    const rates = await shopSdk.eligibleShippingMethods();
    return rates.eligibleShippingMethods;
  }

  async function getEligiblePaymentMethods() {
    const rates = await shopSdk.eligiblePaymentMethods();
    return rates.eligiblePaymentMethods;
  }

  async function getAuthorizeNetKeys() {
    const keys = await shopSdk.authorizeNetKeys();
    return keys.authorizeNetKeys;
  }

  return {
    showCart() {
      cartVisible.value = true;
    },
    hideCart() {
      cartVisible.value = false;
    },
    toggleCart() {
      cartVisible.value = !cartVisible.value;
    },
    cartVisible,
    isLoading,

    formatPrice,
    hasItemDiscount,
    adjustedItemPrice,
    adjustedLinePrice,

    customerEmail,
    activeOrder,
    total,
    subtotal,
    items,
    itemCount,
    discount,
    couponCodes,
    orderTotal,
    taxTotal,
    shippingCost,
    customFields,
    curShippingMethod,
    shippingTotal,
    finalOrderCode,

    formattedShippingAddress,
    formattedBillingAddress,

    refresh,
    addToCart,
    removeFromCart,
    updateItemQuantities,
    setShippingAddress,
    setBillingAddress,
    setGuestAccount,
    getShippingRates,
    applyCouponCode,
    removeCouponCode,
    setOrderCustomFields,
    getEligibleShippingMethods,
    getEligiblePaymentMethods,
    getAuthorizeNetKeys,
    setOrderShippingMethod,
    transitionOrderToState,
    addPaymentToOrder,
    updatePaymentData,
    authorizeNetSecureData,
    selectedPaymentMethodCode,
    setTaxCloudAuthorization,
    createGuestOrderCustomer,
    // Lazy-loaded fields:
    ...lazyLoaded,
  };
});