
import { Component, ref } from 'vue';
import { defineStore } from 'pinia';
import page from 'page';

page.base(`/cart`);

const routes = {
  'cart': ['/', import('../cartPage.vue')] as const,
  'contact': ['/contact', import('./cartContact.vue')] as const,
  'shipping': ['/shipping', import('./cartShipping.vue')] as const,
  'payment': ['/payment', import('./cartPayment.vue')] as const,
  'review': ['/review', import('./cartReview.vue')] as const,
  'confirmation': ['/confirmation', import('./cartConfirmation.vue')] as const,
  'tracking': ['/tracking', import('./cartTracking.vue')] as const,
} satisfies Record<string, [string, Component | Promise<PageModule>]>;
export const pageNames = Object.keys(routes) as (keyof typeof routes)[];
export type pageNames = keyof typeof routes;

interface PageModule {
  default: Component;
}

function isPromise<T>(obj: any): obj is Promise<T> {
  return obj && typeof obj.then === 'function';
}

/**
 * Vue-router is a bit overkill for this, so we're just using page.js;
 * this store is just to keep track of the current page and provide
 * a navTo function to navigate to a page.
 */

const useRouter = defineStore('router', () => {
  const curPage = ref<Component | string>('div');
  const curCtx = ref<PageJS.Context | null>(null);

  function navTo(path: keyof typeof routes) {
    console.log("Navigating to", path, routes[path]);
    page(routes[path][0]);
  }

  const routeTo = (route: string, path: string, component: Component | Promise<PageModule>) => async (ctx: PageJS.Context) => {
    console.warn("Navigating to", route, path, component);
    curPage.value = isPromise(component) ? ((await component).default) : component;
    curCtx.value = ctx;
  }
  for (const [route, [path, component]] of Object.entries(routes)) {
    page(path, routeTo(route, path, component));
  }
  page('*', routeTo('*', '*', routes.contact[1]));

  // Set up the page router options
  page.start({
    hashbang: true,
  });

  return {
    curPage,
    curCtx,
    navTo,
  };
});

export { useRouter };
