<template>
    <div class="flex">
        <nav class="sticky top-0 h-full w-64 border-r border-r-slate-200 py-5 px-2 flex flex-col shrink-0 max-h-[100vh]">
            <slot name="bar" />
        </nav>

        <div class="grow basis-0 min-w-[0]">
            <slot />
        </div>
    </div>
</template>
