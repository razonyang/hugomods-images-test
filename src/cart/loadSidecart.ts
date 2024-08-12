
import { initializeVue, mountComponent } from './mountVue';

let sideCartLoaded = false;
let cartButtonLoaded = false;

// Lazy-load shopping cart basics and mount them to the page
export async function mountVueComponents() {
  initializeVue();

  const cartPanelEl = document.getElementById('cart-panel');
  const promises: Promise<any>[] = [];
  if (cartPanelEl && !sideCartLoaded) {
    sideCartLoaded = true;
    promises.push((async () => {
      const CartPanelComponent = await import('./cartPanel.vue');
      mountComponent(cartPanelEl, CartPanelComponent.default, {});
    })());
  }
  const cartButtonEl = document.getElementById('cart-button');
  if (cartButtonEl && !cartButtonLoaded) {
    cartButtonLoaded = true;
    promises.push((async () => {
      const CartButtonComponent = await import('./cartButton.vue');
      mountComponent(cartButtonEl, CartButtonComponent.default, {});
    })());
  }
  
  await Promise.all(promises);

  // Enable add to cart buttons
  enableAddToCart();
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let listenerAdded = false;
export function enableAddToCart() {
  if (listenerAdded) return;
  listenerAdded = true;
  document.addEventListener('click', async (e) => {
    const $target = e.target as HTMLElement;
    if (!$target) return;
    if ($target.classList.contains('buy-button') || $target.classList.contains('btn-buy-button')) {
      e.preventDefault();
      const cartStore = await import('./cartStore');
      const variantId = $target.dataset.itemId;
      if (!variantId || $target.dataset.saving === "1") return;
      const oldText = $target.innerText;
      $target.classList.add('disabled');
      $target.dataset.saving = "1";
      try {
        $target.innerText = "Adding...";
        await cartStore.useCartStore().addToCart(variantId, 1);
        $target.innerText = "Added!";
        await delay(1000);
      } catch (err) {
        console.warn("Error adding to cart:", err);
      } finally {
        $target.dataset.saving = "0";
        $target.classList.remove('disabled');
        $target.innerText = oldText;
      }
    }
  });
}