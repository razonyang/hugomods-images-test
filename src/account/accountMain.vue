<template>
  <hr class="my-5" />
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <!-- Sidebar/Menu for Account Options -->
      <div class="list-group">
        <button
          class="list-group-item list-group-item-action"
          :class="{ active: selectedTab === 'profile' }"
          @click="selectedTab = 'profile'"
        >User Profile<i class="invisible fa-solid fa-plus"></i></button>
        <button
          class="list-group-item list-group-item-action"
          :class="{ active: selectedTab === 'orders' }"
          @click="selectedTab = 'orders'"
        >Order History</button>
        <button 
          class="list-group-item list-group-item-action" 
          :class="{ active: selectedTab === 'addresses' }"
          @click="selectedTab = 'addresses'"
        >Saved Addresses</button>
      </div>
    </div>
    <div class="col-12 col-lg-8 py-3 py-lg-0">
      <!-- Content Area for Each Account Option -->
      <div v-if="selectedTab === 'addresses'">
        <h2>Saved Addresses</h2>
        <button class="btn btn-ss-iris">
          <i class="fa-solid fa-plus pe-2"></i>
          New Address
        </button>
        <div class="list-group">
          <div v-for="(address, index) in $account.customerAddresses" :key="index" class="list-group-item">
            <h5 class="mb-1">{{ address.streetLine1 }}</h5>
            <p class="mb-1" v-if="address.streetLine2">{{ address.streetLine2 }}</p>
            <p class="mb-1">{{ address.city }}, {{ address.province }} {{ address.postalCode }}</p>
            <p class="mb-1">{{ address.country }}</p>
          </div>
        </div>
      </div>

      <div v-if="selectedTab === 'profile'">
        <h2>User Profile</h2>
        <!-- Your change password form goes here -->
      </div>

      <div v-if="selectedTab === 'orders'">
        <h2>Order History</h2>
        <div class="list-group">
          <div v-for="(order, index) in $account.customerOrders" :key="index" class="list-group-item">
            <h5 class="mb-1">Order ID: {{ order.id }}</h5>
            <p class="mb-1">Date: {{ order.orderPlacedAt }}</p>
            <p class="mb-1">Total: {{ order.totalWithTax }}</p>
            <p class="mb-1">Status: {{ order.state }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CartRouter',
    inheritAttrs: false,
    customOptions: {}
  }
</script>
<script lang="ts" setup>

import { ref } from 'vue';
import { useRouter } from './accountRouter';
import { useAccountStore } from './accountStore';

const $router = useRouter();
const $account = useAccountStore();

const selectedTab = ref<'addresses' | 'profile' | 'orders'>('profile');

</script>

<style lang="scss" scoped>
</style>