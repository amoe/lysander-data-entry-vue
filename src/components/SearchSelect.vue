<template>
<div>
  <el-select filterable remote v-model="selectedValue"
             :remote-method="remoteMethod">
    <el-option v-for="item in availableOptions"
               :key="item.value"
               :label="item.label"
               :value="item.value"/>
  </el-select>
  
  <p>The model value is {{selectedValue}}</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import {LysanderComponent} from '@/mixins';
import {FuzzySearchStatement} from '@/canned-statements';
import {StatementResult, Record} from 'neo4j-driver/types/v1/index'

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
            selectedValue: null as any,
            availableOptions: [] as any[]
        }
    },
    methods: {
        remoteMethod(query: string) {
            console.log("remote method called with argument %o", query);
            const statement = new FuzzySearchStatement(this.nodeLabel, this.nodeProperty, query);
            
            //
            const result = this.gateway.search(statement).then((sr: StatementResult) => {
                const records = sr.records;
                const newOptions = records.map(r => {
                    // These properties are declared in the cypher statement
                    // using AS.
                    return {
                        label: r.get('text'), 
                        value: r.get('id')
                    };
                });

                this.availableOptions = newOptions;
            });
        },
    }
});
</script>

<style lang="less">
</style>
