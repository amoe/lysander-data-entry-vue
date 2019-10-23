<template>
<div>
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
    props: {
        nodeLabel: {
            type: String
        },
        nodeProperty: {
            type: String
        }
    },
    data() {
        return {
            value9: null as any,
            options4: [] as any[]
        }
    },
    methods: {
        remoteMethod(query: string) {
            console.log("remote method called with argument %o", query);
            const statement = new FuzzySearchStatement(this.nodeLabel, this.nodeProperty, query);
            
            const result = this.gateway.search(statement).then(r => {
                console.log(r);
                // need to assign into the options4 now
            });
            
            this.options4 = [{'label': "Foo", 'value': 'foo'}];
        },
    }
});
</script>

<style lang="less">
</style>
