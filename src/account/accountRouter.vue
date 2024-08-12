<template>
  <div class="row">
    <!-- Loads the component returned by the router -->
    <component :is="$router.curPage" :routeContext="$router.curCtx">
    </component>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CartRouter',
    inheritAttrs: false,
    customOptions: {}
  }
</script>
<script lang="ts" setup>

import { useRouter } from './accountRouter';

const $router = useRouter();

</script>

<style lang="scss" scoped>
</style>