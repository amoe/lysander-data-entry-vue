<template>
<div>
  <h1>ws</h1>
  
  
  <el-table :data="tilletData" cell-class-name="tillet-cell">
    <el-table-column prop="record_id" label="Record ID"/>
    <el-table-column prop="date" label="Date"/>


    <el-table-column label="Landing zone">
      <template slot-scope="scope">
        <el-table :data="wrapPlainStrings(scope.row.landing_zone)" :show-header="false"
                  cell-class-name="tillet-cell">
          <el-table-column prop="content"/>
        </el-table>
      </template>
    </el-table-column>

    <el-table-column label="References">
      <template slot-scope="scope">
        <el-table :data="wrapPlainStrings(scope.row.references)" :show-header="false"
                  cell-class-name="tillet-cell">
          <el-table-column prop="content"/>
        </el-table>
      </template>
    </el-table-column>

    <el-table-column label="Passengers out">
      <template slot-scope="scope">
        <el-table :data="wrapPlainStrings(scope.row.passengers_out)" :show-header="false"
                  cell-class-name="tillet-cell">
          <el-table-column prop="content"/>
        </el-table>
      </template>
    </el-table-column>

    <el-table-column label="Operation">
      <template slot-scope="scope">
        <el-table :data="wrapPlainStrings(scope.row.operation)" :show-header="false"
                  cell-class-name="tillet-cell">
          <el-table-column prop="content"/>
        </el-table>
      </template>
    </el-table-column>

    <el-table-column label="Squadron">
      <template slot-scope="scope">
        <el-table :data="wrapPlainStrings(scope.row.squadron)" :show-header="false"
                  cell-class-name="tillet-cell">
          <el-table-column prop="content"/>
        </el-table>
      </template>
    </el-table-column>
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
            this.tilletData = r.data.slice(0, 5);
        }).catch(e => {
            console.log("error is %o", e);
        });
    },
    methods: {
        wrapPlainStrings(aliases: string[]): object {
            return aliases.map(function(x) {
                return {content: x};
            });
        }
    },
    computed: {
    }
});
</script>

<style lang="less">
.tillet-cell {
    font-family: Arial, sans-serif;
    font-size: 8pt;
}
</style>
