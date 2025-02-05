<template>
  <div id="profile">
    <div class="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-start md:items-center">
      <PageHeader title="Meu cadastro" description="Seus dados de cadastro" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from "vue";

  import PageHeader from "./../../../components/HeaderPage/HeaderPage.vue";
  // import Paginator from "./../../../components/Paginator/index.vue";
</script>
