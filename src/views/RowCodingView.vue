<template>
<div>
  <h1>RowCodingView</h1>
  
  <h2>Date</h2>
  <el-date-picker :value="formData.date" @input="updateDate" type="date"
                  placeholder="Pick a day">
  </el-date-picker>
  
  <h2>Codenames</h2>
  
  <div class="codenames">
    <ul>
      <li v-for="(codename, index) in formData.codenames">
        <el-input @input="onCodenameInput($event, index)"
                  :value="codename.content"></el-input>
      </li>
    </ul>
  </div>
  <el-button type="primary" icon="el-icon-plus" 
             v-on:click="addCodename">Codename</el-button>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {createNamespacedHelpers} from 'vuex';
import {LysanderState} from '@/interfaces';
import mc from '@/mutation-constants';

const { mapState, mapMutations } = createNamespacedHelpers('lysander');

export default Vue.extend({
    created() {
        console.log(this.formData);
    },
    data() {
        return {
        };
    },
    methods: {
        // Wrap up the payload
        onCodenameInput(newCodename: string, index: number) {
            this.updateCodename({newCodename, index});
        },
        ...mapMutations({
            updateDate: mc.UPDATE_DATE,
            updateCodename: mc.UPDATE_CODENAME,
            addCodename: mc.ADD_CODENAME
        })
    },
    computed: {
        ...mapState({
            formData: (s: LysanderState) => s.formData
        })
    }
});
</script>

<style lang="less">
</style>
