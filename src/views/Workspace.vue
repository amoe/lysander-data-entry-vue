<template>
<div>
<h1>ws</h1>

<search-select node-label="Person" node-property="name">
</search-select>


{{counter}}
<button @click="increment">increment</button>

</div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchSelect from '@/components/SearchSelect.vue';
import log from 'loglevel';
import {mapGetters} from 'vuex';
import mc from '@/mutation-constants';

export default Vue.extend({
    components: {SearchSelect},
    methods: {
        increment() {
            this.$store.commit(mc.ADD_TO_COUNTER);
        }
    },
    computed: {
        ...mapGetters(['counter'])
    }
});
</script>

<style lang="less">
</style>
