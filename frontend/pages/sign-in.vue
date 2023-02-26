<template>
    <div class="h-full p-4 flex items-center justify-center">
        <div class="h-3/4 md:h-auto w-full md:max-w-sm">
            <AppCard class="shadow-none md:shadow-md">
                <AppCardTitle>
                    ВолонтерВантаж ~ Вхід
                </AppCardTitle>

                <SignInForm />
            </AppCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'auth',
});
</script>
