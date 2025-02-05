<template>
        <router-link v-if="props?.isLink ?? false" :to="props?.to ?? ''" :class="className">{{ props.label }}</router-link>

        <button v-else :type="props?.type ?? 'button'" @click="props?.onClick" :class="className" :disabled="props?.disabled === undefined ? false : props.disabled">
            <span v-if="props?.isLoading === true" class="loading loading-dots loading-md"></span>
            <span v-else>{{ props.label }}</span>
        </button>
</template>

<script lang="ts" setup>
    import { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from "vue-router"

    type ComponentProps = {
        label: string
        size?: 'sm' | 'md' | 'lg'
        isLink?: boolean
        to?: string | undefined | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
        onClick?: () => void
        className?: string
        theme?: 'white' | 'red'
        type?: 'submit' | 'reset' | 'button'
        isLoading?:boolean
        disabled?: boolean
    }

    const props = defineProps<ComponentProps>()

    const className = {
        btn: true,
        'bg-red-700 hover:bg-red-600 text-white': props.theme === undefined || props.theme === 'red',
        'bg-white text-black hover:text-black hover:bg-slate-200': props?.theme === 'white',
        [''.concat(props?.className ?? '')]: props?.className ? true : false
    }
</script>
