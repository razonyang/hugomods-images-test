import '../common/common';
import { mountVueComponents } from '../cart/loadSidecart';
import { initializeVue, mountComponent } from '../cart/mountVue';

async function bootstrapPage() {
  try {
    const BaseComponent = await import('../order/orderRouter.vue');
    // Initialize Vue, if it hasn't been already initialized
    initializeVue();

    const vueHost = document.getElementById('vueRoot');
    if (!vueHost) {
      console.warn("No page host element found, waiting and trying again");
      setTimeout(bootstrapPage, 250);
      return;
    }
    mountComponent(vueHost, BaseComponent.default, {});

    // Mount the cart stuff
    await mountVueComponents();
  } catch(err) {
    console.error("Error bootstrapping page:", err);
  }
}

bootstrapPage().catch(err => console.error("Early uncaught error bootstrapping page:", err));

// The main purpose of this file is just to bootstrap vue on the page
