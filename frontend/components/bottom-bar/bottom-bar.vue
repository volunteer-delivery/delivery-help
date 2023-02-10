<template>
    <div class="h-full pb-14">
        <slot />

        <nav class="bg-white flex justify-center fixed bottom-0 left-0 w-full shadow-[0_2px_4px_-1px_rgb(0,0,0,0.2),0_4px_5px_0_rgb(0,0,0,0.14),0_1px_10px_0_rgb(0,0,0,0.12)]">
            <slot name="bar" />
        </nav>
    </div>
</template>
