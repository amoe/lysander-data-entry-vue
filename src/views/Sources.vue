<template>
  <div>
    <h1>Sources</h1>

    <h2>Source name</h2>
    <el-input v-model="sourceName"></el-input>

    <p v-if="tilletData !== null">Loaded {{tilletData.length}} records.</p>

    <el-button @click="loadSource">Insert source rows</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import {LysanderComponent} from '@/mixins';

export default LysanderComponent.extend({
    data() {
        return {
            tilletData: null as any,
            sourceName: "" as string,
        };
    },
    created() {
        console.log("The subclass hook was called");
        axios.get("/sensitive/tillet_converted.json").then(r => {
            this.tilletData = r.data;
        }).catch(e => {
            console.log("error is %o", e);
        });
    },
    methods: {
        loadSource() {
            console.log("load source");
            console.log(this.gateway);

            this.gateway.createSourceWithRows(this.sourceName, this.tilletData).then(r => {
                this.$notify.info({title: "foo", message: "success"});
            }).catch(e => {
                console.log("fail");
            });
        },
    }
});
</script>

<style lang="less">
</style>
