<template>
<div>
  <h1>ws</h1>
  
  <el-dialog title="Help"
             :visible.sync="dialogVisible"
             width="30%">
    
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
    
    
    <span slot="footer" class="dialog-footer">
      <el-button v-on:click="$emit('closed')">OK</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        parentList: {
            type: Array as () => object[]
        },
        dialogVisible: {
            type: Boolean
        },
        selectedIndex: {
            type: Number
        },
        sublistProperty: {
            type: String
        }
    },
    data() {
        return {
        };
    },
    methods: {
        handleDelete(index: number) {
            this.tableData.splice(index, 1);
        },
        addRow() {
            this.tableData.push({name: "", age: 0});
        }
    },
    computed: {
        tableData(this: any): object[] {
            console.log(this.parentList);
            return this.parentList[this.selectedIndex][this.sublistProperty];
        }
    }
});
</script>
