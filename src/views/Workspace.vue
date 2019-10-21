<template>
<div>
  <h1>ws</h1>

  <el-table :data="tableData">
    <el-table-column label="Name">
      <template slot-scope="scope">
        <el-input v-model="scope.row.name"/>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template slot-scope="scope">
        <el-button size="mini"
                   type="danger"
                   v-on:click="handleDelete(scope.$index)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-button type="primary" v-on:click="addRow">Add</el-button>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            dialogVisible: false,
            tableData: [
                {name: 'fry', age: 29}
            ]
        };
    },
    methods: {
        pop() {
            this.dialogVisible = true;
        },
        handleDelete(index: number) {
            this.tableData.splice(index, 1);
        },
        addRow() {
            this.tableData.push({name: "", age: 0});
        }
    }
});
</script>
