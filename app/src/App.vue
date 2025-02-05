<script setup lang="ts">
  import { Toaster } from "@steveyuowo/vue-hot-toast";
  import { RouterView } from "vue-router";
</script>

<template>
  <div id="#app-component-root">
    <Toaster />
    <RouterView />
  </div>
</template>
