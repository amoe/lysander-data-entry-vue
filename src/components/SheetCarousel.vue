<template>
  <div v-if="sheetData">
    <el-carousel height="600px" trigger="click" :autoplay="false" arrow="always" :loop="false">
      <el-carousel-item v-for="record in sheetData" :key="record.record_id">
        <table class="tillet-table">
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Date</th>
              <th>Landing Zone</th>
              <th>References</th>
              <th>Passengers Out</th>
              <th>Operation</th>
              <th>Squadron</th>
            </tr>
          </thead>
          <tillet-row :record="record"></tillet-row>
        </table>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TilletRow from '@/components/TilletRow.vue';

export default Vue.extend({
    components: {TilletRow},
    props: {
        sheetData: {
            type: Array as () => any[]
        }
    }
});
</script>

<style lang="less">
table.tillet-table {
    table-layout: fixed;
    font-size: medium;
}

table.tillet-table  td,th {
    border-bottom: 1px solid #ebeef5;
    padding: 12px 0 12px 0;
    width: 10%;
}

table.tillet-table thead {
    font-family: serif;
    font-size: 14px;
    font-weight: 700;
    color: #909399
}
</style>



