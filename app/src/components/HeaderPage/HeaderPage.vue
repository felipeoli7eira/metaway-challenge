<template>
    <header class="">
        <h1 class="text-lg font-semibold">{{ props.title }}</h1>
        <p class="font-extralight text-base">{{ props.description }}</p>
    </header>
</template>

<script lang="ts" setup>
    type ComponentPropsType = {
        title: string
        description: string
    }

    const props = defineProps<ComponentPropsType>()
</script>
