import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {

  // state
  const count = ref<number>(0)

  // getters
  const doubleCount = computed(() => count.value * 2)

  // actions
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  // return
  return {
    count,
    doubleCount,
    increment,
    decrement
  }
});
