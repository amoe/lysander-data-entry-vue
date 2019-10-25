<template>
<div>
  <h1>ws</h1>

  <div v-if="tilletData">
    <table class="tillet-table">
      <tr>
        <th>Record ID</th>
        <th>Date</th>
        <th>Landing Zone</th>
        <th>References</th>
        <th>Passengers Out</th>
        <th>Operation</th>
        <th>Squadron</th>
      </tr>
      <tillet-row :record="tilletData[0]"></tillet-row>
    </table>
  </div>
  
  <!-- <el-carousel trigger="click" height="150px"> -->
  <!--   <el-carousel-item v-for="record in tilletData" :key="record_id"> -->
  <!--     <table> -->
  <!--       <tr> -->
  <!--         <td>{{record.date}}</td> -->
  <!--         <td>{{record.landing_zone}}</td> -->
  <!--       </tr> -->
  <!--     </table> -->
  <!--   </el-carousel-item> -->
  <!-- </el-carousel> -->
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchSelect from '@/components/SearchSelect.vue';
import log from 'loglevel';
import {mapGetters} from 'vuex';
import mc from '@/mutation-constants';
import axios from 'axios';
import TilletRow from '@/components/TilletRow.vue';

export default Vue.extend({
    components: {TilletRow},
    data() {
        return {
            items: [
                {content: "fry"},
                {content: "bender"},
                {content: "leela"}
            ],
            tilletData: null
        };
    },
    created() {
        axios.get("/sensitive/tillet_converted.json").then(r => {
            this.tilletData = r.data.slice(0, 5);
            console.log("set data", this.tilletData[0]);
        }).catch(e => {
            console.log("error is %o", e);
        });
    },
    methods: {
    },
    computed: {
    }
});
</script>

<style lang="less">
table.tillet-table  td,th {
    border-bottom: 1px solid #ebeef5;
    padding: 12px 0 12px 0;
}
</style>
