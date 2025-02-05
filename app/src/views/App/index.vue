<template>
  <div id="app-index" class="h-screen w-screen flex max-h-screen max-w-full overflow-x-hidden">
    <AppMenu />
    <div class="w-full p-5 dark:bg-daisyblack overflow-y-auto">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
    import { RouterView } from "vue-router";
    import AppMenu from "./../../components/AppMenu/index.vue";
</script>
