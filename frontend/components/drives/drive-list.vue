<template>
    <v-row justify="center" align="center">
        <v-col class="pa-0 pa-sm-3 pt-sm-7" cols="12" sm="8" md="6">
            <empty v-if="isEmpty"/>

            <template v-else>
                <Drive
                    class="mb-sm-4"
                    v-for="drive of drives"
                    :key="drive.id"
                    :drive="drive"
                />
            </template>
        </v-col>
    </v-row>
</template>

<script setup>
import Drive from './drive';
import Empty from './empty';

const props = defineProps({
    drives: {
        type: Array,
        required: true
    }
});

const isEmpty = computed(() => !props.drives.length);
</script>
