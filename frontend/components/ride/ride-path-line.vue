<template>
    <div class="h-8 relative path-line">
        <div class="path-line-arrow" />
    </div>
</template>

<style scoped>
.path-line::before,
.path-line::after {
    @apply content-[''] absolute block left-2 h-3 border-l-2 border-blue-800;
}

.path-line::before {
    @apply -top-0.5;
}

.path-line::after {
    @apply -bottom-0.5;
}

.path-line-arrow {
    @apply border-t-blue-800 absolute block left-1;
    top: calc(50% - 3px);
    border: 5px solid transparent;
    border-top-color: #3F51B5;
}
</style>
