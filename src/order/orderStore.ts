import { defineStore } from 'pinia';

import { shopSdk } from '../graphql/shopClient';

export const useOrderStore = defineStore('order', () => {

  async function getOrderTrackingInfo(orderCode: string) {
    try {
      const result = await shopSdk.orderTrackingInfo({ orderCode });
      return result.orderTrackingInfo;
    }catch (e) {
      throw new Error('Failed to get order tracking info. Contact store admin.');
    }
  }

  return {
    getOrderTrackingInfo,
  }

});