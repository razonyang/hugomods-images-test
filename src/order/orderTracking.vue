<template>
    <div class="col col-12 spacer"></div>
  
    <div
      :class="`${
          [
              'col',
              'col-12',
              'col-lg-12',
              'd-flex',
              'flex-column',
              'align-items-center',
            ]
      }`"
      v-if="!errorMsg || errorMsg.length==0"
    >

      <div class="mt-5 align-items-center">
        <h4 class="text-center">Order State: {{ trackingInfo?.state }}</h4>
      </div>

      <div class="mt-5 align-items-center">
        <h4 class="text-center">Order Placed At: {{ 
          new Date(trackingInfo?.orderPlaced).toLocaleString()
        }}</h4>
      </div>

      <div class="mt-5 align-items-center" v-if="trackingInfo?.trackingCodes?.length!=0">
        <h4 class="text-center">
          Tracking Codes:
          {{ trackingInfo?.trackingCodes?.map((code) => code).join(", ") }}
        </h4>
      </div>
  
    </div>

    <div
        class="alert alert-danger mt-4 d-flex justify-content-between justify-content-between"
        v-if="errorMsg"
      >
        <div class="mx-auto">
          <i class="fa-duotone fa-land-mine-on fa-xl pe-2"></i>{{ errorMsg }}
        </div>
      </div>
  
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import { OrderTrackingInfo } from "../graphql/generated-shop";
  import { useOrderStore } from './orderStore';
  
  const errorMsg = ref("");

  const $orderStore = useOrderStore();

  const trackingInfo = ref({} as OrderTrackingInfo);

  onMounted(async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderCode = urlParams.get('code');
    if(orderCode) {
      const theTrackingInfo = await $orderStore.getOrderTrackingInfo(orderCode);
      if(theTrackingInfo?.__typename == "OrderTrackingInfo") {
        trackingInfo.value = theTrackingInfo;
      }else{
        errorMsg.value = "No order found with the given code";
      }
    }else{
      errorMsg.value = "No order code found in the URL";
    }
  });
  
  </script>
  
  <style lang="scss" scoped>
  .trackingInfo{
    font-size: '20px';
  }
  </style>
  