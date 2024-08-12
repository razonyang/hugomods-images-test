import '../common/common';
import { mountVueComponents } from '../cart/loadSidecart';
import { initializeVue, mountComponent } from '../cart/mountVue';

async function bootstrapPage() {
  try {
    const CartBase = await import('../cart/cartRouter.vue');
    // Initialize Vue, if it hasn't been already initialized
    initializeVue();

    const cartPageHost = document.getElementById('vueRoot');
    if (!cartPageHost) {
      console.warn("No page host element found, waiting and trying again");
      setTimeout(bootstrapPage, 250);
      return;
    }
    mountComponent(cartPageHost, CartBase.default, {});

    // Remove the cart panel from this page -- we don't need it
    document.getElementById('cart-panel')?.remove();
    const cartButtonEl = document.getElementById('cart-button');
    await mountVueComponents();
  } catch(err) {
    console.error("Error bootstrapping page:", err);
  }
}

bootstrapPage().catch(err => console.error("Early uncaught error bootstrapping page:", err));

// The main purpose of this file is just to bootstrap vue on the page
