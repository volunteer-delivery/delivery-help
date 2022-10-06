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
        drives: {
            type: Array,
            required: true
        }
    },

    computed: {
        isEmpty() {
            return !this.drives.length
        }
    }
};
</script>
