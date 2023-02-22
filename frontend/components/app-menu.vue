<template>
    <div>
        <slot
            name="activator"
            :activatorRef="addActivatorRef"
            :open="dropdown.open"
            :close="dropdown.close"
        />

        <Transition name="dropdown" :duration="{ enter: 200, leave: 150 }">
            <div
                class="m-0 p-0 pt-2 bg-white shadow rounded z-[100] min-w-[150px]"
                :style="dropdown.styles"
                ref="dropdownRef"
                v-if="dropdown.isDisplaying"
                @click="dropdown.close"
            >
                <slot />

                <AppButton
                    class="text-left w-full border-t border-t-gray-100"
                    look="link"
                    size="lg"
                    @click="dropdown.close"
                >
                    Закрити
                </AppButton>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import type { MaybeElementRefValue, ElementRefValue } from '~/composables/use-element-ref';

const activatorRef = ref<MaybeElementRefValue>(null);
const activatorEl = useElementRef(activatorRef);
const addActivatorRef = (ref: MaybeElementRefValue): void => void (activatorRef.value = ref);

const dropdownRef = ref<ElementRefValue>(null);

const dropdown = useDropdown(activatorEl, dropdownRef, {
    fullSize: false,
});
</script>
