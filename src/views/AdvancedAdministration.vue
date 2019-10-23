<template>
<div>
  <h1>Advanced Administration</h1>

  <el-button @click="clearGraph">Clear graph</el-button>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {LysanderComponent} from '@/mixins';


export default LysanderComponent.extend({
    methods: {
        clearGraph() {
            this.gateway.clearGraph().then(result => {
                this.$notify.info({title:'foo', message: `clear succeeded`});
            }).catch(error => {
                this.$notify.error({title: 'bar', message: error.message});
            });
        }
    }
});
</script>

<style lang="less">
</style>
