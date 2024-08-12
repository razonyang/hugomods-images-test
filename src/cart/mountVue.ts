
import { createApp, createVNode, render, type App, type Component, type VNodeProps, AppContext } from 'vue';
import DialogWrapper from '../lib/DialogWrapper.vue';
import { createPinia } from 'pinia';
import { useCartStore } from './cartStore';

// import CartPanelComponent from './cartPanel.vue';
// import CartButtonComponent from './cartButton.vue';

export function mountComponent(elem: Element, component: Component, props: VNodeProps) {
  console.log("Mounting component", component.name ?? 'unnamed component', "to", elem);
  const app = window._vApp;
  let vNode = createVNode(component, props);
  vNode.appContext = app._context;
  elem.innerHTML = '';
  render(vNode, elem);
  return vNode.component;
}

declare global {
  interface Window {
    _vApp: App & { _context: AppContext };
  }
}

export function initializeVue() {
  console.log("Initializing Vue");
  if (window._vApp) {
    console.log("Already initialized! as it should be");
    return;
  } else {
    // create fake mount point
    const $app = document.createElement('div');
    $app.id = 'app-23408512432';
    $app.style.position = 'absolute';
    $app.style.width = '0';
    $app.style.height = '0';
    document.body.appendChild($app);
    // Use the dialog wrapper as the root component 'cause why not?
    const app = createApp(DialogWrapper);
    window._vApp = app;
    app.mount(`#${$app.id}`);
    const pinia = createPinia();
    app.use(pinia);
    console.log("Pinia set up");
  }
}
