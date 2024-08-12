
import { UseAsyncStateOptions, useAsyncState } from '@vueuse/core';
import { computed } from 'vue';

const uninitialized = Symbol('uninitialized');
export function useLazyAsyncState<Data, Shallow extends boolean = true>(
  promise: () => Promise<Data>,
  initialState: Data,
  options?: UseAsyncStateOptions<Shallow, Data>, name?: string)
{
  const opts = {
    immediate: false, // The whole thing is a waste of time if we do it immediately =]
    ...options,
  };
  const ret = useAsyncState(promise, uninitialized as any, opts);

  return {
    ...ret,
    state: computed(() => {
      if (ret.state.value === uninitialized) {
        if (!ret.isLoading.value) {
          // if (name) {
          //   console.warn(`Lazy state ${name} is uninitialized, executing refresh`);
          // }
          ret.execute();
          // ret.execute().then(() => {
          //   if (name) {
          //     console.warn(`Lazy state ${name} should be initialized, refresh complete`);
          //   }
          // });
        }
        //  else {
        //   if (name) {
        //     console.warn(`Lazy state ${name} is uninitialized but loading`);
        //   }
        // }
        return initialState;
      }
      // if (name) {
      //   console.warn(`Lazy state ${name} is initialized`);
      // }
      return ret.state.value;
    }),
  };
}
