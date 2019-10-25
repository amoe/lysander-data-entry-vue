<template>
<tr>
  <td>{{record.record_id}}</td>
  <td>{{record.date}}</td>
  <td>{{record.landing_zone}}</td>
  <td>{{record.references}}</td>
  <td>{{record.passengers_out}}</td>
  <td>{{record.operation}}</td>
  <td>
    <sub-row :content="record.squadron"></sub-row>
  </td>
</tr>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {TilletDatum} from '@/interfaces';
import SubRow from '@/components/SubRow.vue';

export default Vue.extend({
    components: {SubRow},
    props: {
        record: {
            type: Object as () => TilletDatum
        }
    },
    created() {
        console.log(this.record);
    }

});
</script>

<style lang="less">
</style>
