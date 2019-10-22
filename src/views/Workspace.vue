<template>
<div>
  <h1>ws</h1>

    <el-select filterable remote v-model="value9"
               :remote-method="remoteMethod">
      <el-option v-for="item in options4"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"/>
    </el-select>

    <p>The model value is {{value9}}</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import {LysanderComponent} from '@/mixins';
import {FuzzySearchStatement} from '@/canned-statements';

export default LysanderComponent.extend({
    data() {
        return {
            value9: null as any,
            options4: [] as any[]
        }
    },
    methods: {
        remoteMethod(query: string) {
            console.log("remote method called with argument %o", query);
            
            // so what will be necessary here, just to unlock a search spec

            // basically it needs many things
            
            // it needs to be parameterized by:
            // * a node type
            // * a text content property name
            //
            // that means that we need to reintroduce the canned statement type


            // so figure out some way to parameterize it in advance.
            // template literal?
            const result = this.gateway.search(new FuzzySearchStatement()).then(r => {
                console.log(r);
            });
            
            this.options4 = [{'label': "Foo", 'value': 'foo'}];
        },
    }
});
</script>

<style lang="less">
</style>
