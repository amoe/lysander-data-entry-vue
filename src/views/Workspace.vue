<template>
<div>
<h1>ws</h1>

<search-select node-label="Person" node-property="name">
</search-select>

</div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchSelect from '@/components/SearchSelect.vue';
import log from 'loglevel';

export default Vue.extend({
    components: {SearchSelect}
});
</script>

<style lang="less">
</style>
