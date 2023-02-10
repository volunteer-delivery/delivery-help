<template>
    <div class="h-full pl-64">
        <nav class="fixed left-0 top-0 h-full w-64 border-r border-r-slate-200 py-5 px-2">
            <slot name="bar" />
        </nav>

        <slot />
    </div>
</template>

<script lang="ts" setup>

</script>
