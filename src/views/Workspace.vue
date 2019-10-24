<template>
<div>
  <h1>ws</h1>

  <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchSelect from '@/components/SearchSelect.vue';
import log from 'loglevel';
import {mapGetters} from 'vuex';
import mc from '@/mutation-constants';

export default Vue.extend({
    components: {SearchSelect},
    data() {
        return {
            activeName: 'first'
        };
    },
    methods: {
    },
    computed: {
    }
});
</script>

<style lang="less">
</style>
