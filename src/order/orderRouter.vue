<template>
  <div class="row">
    <!-- Loads the component returned by the router -->
    <component :is="$router.curPage" :routeContext="$router.curCtx">
    </component>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'OrderRouter',
    inheritAttrs: false,
    customOptions: {}
  }
</script>
<script lang="ts" setup>

import { useRouter } from './orderRouter';

const $router = useRouter();

</script>

<style lang="scss" scoped>
</style>