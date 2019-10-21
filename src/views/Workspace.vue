<template>
<div>
  <h1>ws</h1>
  
  <el-dialog title="Alais"
             :visible.sync="dialogVisible"
             width="30%">
    <p>This is content this is content</p>

    <span slot="footer" class="dialog-footer">
      <el-button v-on:click="dialogVisible = false">OK</el-button>
    </span>
  </el-dialog>

  <el-button v-on:click="pop">Pop</el-button>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        pop() {
            this.dialogVisible = true;
        }
    }
});
</script>
