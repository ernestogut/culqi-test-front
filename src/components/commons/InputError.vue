<template>
    <span class="text-red-600">
        {{ props.error }}
    </span>
</template>
<script setup lang="ts">

type Props = {
    error: string;
};

const props = defineProps<Props>();


</script>