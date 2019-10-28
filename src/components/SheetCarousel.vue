<template>
  <div v-if="sourceRows">
    <el-carousel @change="onChange" height="600px" trigger="click"
                 :autoplay="false" arrow="always" :loop="false"
                 :initialIndex="sourceRowListIndex">
      <el-carousel-item v-for="row in sourceRows" :key="row.id">
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
          <tillet-row :record="row.datum"></tillet-row>
        </table>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TilletRow from '@/components/TilletRow.vue';
import {createNamespacedHelpers} from 'vuex';
import mc from '@/mutation-constants';
import {LysanderState, SourceRow} from '@/interfaces';

const { mapState, mapMutations } = createNamespacedHelpers('lysander');

export default Vue.extend({
    components: {TilletRow},
    props: {
        sourceRows: {
            type: Array as () => SourceRow[]
        }
    },
    methods: {
        ...mapMutations({
            onChange: mc.SET_ACTIVE_INDEX_OF_SOURCE_ROW_LIST
        })
    },
    computed: {
        ...mapState({sourceRowListIndex: (s: LysanderState) => s.sourceRowListIndex})
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



