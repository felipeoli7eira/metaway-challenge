<template>
    <div class="join flex justify-center">
        <button type="button" @click="prevPage" :disabled="props.hasPreviousPage === false" class="join-item btn">
            <i class="pi pi-arrow-circle-left"></i>
        </button>

        <button class="join-item btn">
            <span>Página {{ currentPageNumber }}</span>
        </button>

        <button type="button" @click="nextPage" :disabled="!props.hasNextPage" class="join-item btn">
            <i class="pi pi-arrow-circle-right"></i>
        </button>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from "vue";

    const props = defineProps({
        hasNextPage: {
            type: Boolean,
            required: true
        },
        hasPreviousPage: {
            type: Boolean,
            required: true
        },
        currentPageNumber: {
            type: Number,
            required: true
        },
    })

    const currentPageNumber = ref<number>(props?.currentPageNumber ?? 1);

    const nextPage = () => {
        currentPageNumber.value += 1;
    };

    const prevPage = () => {
        if (currentPageNumber.value > 1) {
            currentPageNumber.value -= 1;
        }
    };

    const emit = defineEmits(['pageChanged']);

    watch(currentPageNumber, (newPage) => {
        emit('pageChanged', newPage);
    });
</script>
