<template>
    <p>{{ location }}</p>
</template>

<script>
export default {
    name: 'drive-point',

    props: {
        point: Object
    },

    computed: {
        isUkraine() {
            return this.point.country === 'Україна';
        },

        location() {
            return this.isUkraine ? this.point.city : this.point.country;
        }
    }
};
</script>
