<template>
<div>
  <h1>ws</h1>
  
  <el-table :data="tilletData" :span-method="mySpanMethod">
    <el-table-column prop="record_id" label="Record ID"/>
    <el-table-column prop="date" label="Date"/>
  </el-table>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import {TilletDatum} from '@/interfaces';

export default Vue.extend({
    data() {
        return {
            tilletData: null as TilletDatum | null
        };
    },
    created() {
        axios.get("/sensitive/tillet_converted.json").then(r => {
            this.tilletData = r.data;
        }).catch(e => {
            console.log("error is %o", e);
        });
    },
    methods: {
        mySpanMethod(foo: any) {
            console.log("span method was called");
        }
    },
    computed: {
    }
});
</script>
