<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handleBack = () => {
    router.back();
}
</script>
<template>
    <div @click="handleBack">
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped></style>