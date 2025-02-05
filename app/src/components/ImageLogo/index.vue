<template>
    <img :class="props.size" src="/vue.svg" alt="Company Brand" />
</template>

<script setup lang="ts">
    type ComponentProps = {
        size: 'sm' | 'md' | 'lg'
    }

    const props = defineProps<ComponentProps>()
</script>

<style scoped>
    img.sm {
        width: 24px;
    }
    img.md {
        width: 48px;
    }

    img.lg {
        width: 96px;
}
</style>
