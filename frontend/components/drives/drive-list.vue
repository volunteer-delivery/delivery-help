<template>
    <v-row justify="center" align="center">
        <v-col class="pa-0 pa-sm-3 pt-sm-7" cols="12" sm="8" md="4">
            <Drive
                class="mb-sm-4"
                v-for="drive of drives"
                :key="drive.id"
                :drive="drive"
            />
            <empty v-if="!drives.length"/>
        </v-col>
    </v-row>
</template>

<script>
import Drive from './drive';
import Empty from './empty';

export default {
    name: 'drive-list',

    components: {
        Empty,
        Drive
    },

    props: {
        drives: Array
    }
};
</script>
