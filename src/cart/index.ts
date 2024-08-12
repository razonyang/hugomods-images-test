
// import { getActiveOrder, addItemToOrder } from '../graphql/shopClient';

// This file must be included at the end of the page, preferably defered
const vueAppRoot = document.getElementById('vueRoot');
if (!vueAppRoot) {
  // asynchronously load the shopping cart stuff
  import('./loadSidecart').then(({ mountVueComponents }) => {
    mountVueComponents();
  });
}
