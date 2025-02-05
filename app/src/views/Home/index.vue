<template>
    <div class="h-screen w-screen flex items-center justify-center gap-2">
        <router-link :to="{ name: 'signin' }" class="">
            <ImageLogo size="lg" />
        </router-link>
    </div>
</template>

<script lang="ts" setup>
    import ImageLogo from './../../components/ImageLogo/index.vue'
</script>
