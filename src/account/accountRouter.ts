
import { Component, ref } from 'vue';
import { defineStore } from 'pinia';
import page from 'page';

page.base(`/account`);

const routes = {
  'main': ['/', import('./accountMain.vue')] as const,
  'reset': ['/reset', import('./reset.vue')] as const,
  // 'verify': ['/verify', import('./verify.vue')] as const,
  'register': ['/register', import('./register.vue')] as const,
  'request-reset': ['/request-reset', import('./resetRequest.vue')] as const,
} satisfies Record<string, [string, Component | Promise<PageModule>]>;
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
  page('*', routeTo('*', '*', routes.main[1]));

  // Set up the page router options
  page.start({
    dispatch: true,
    // hashbang: true,
  });

  return {
    curPage,
    curCtx,
    navTo,
  };
});

export { useRouter };
