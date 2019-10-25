<template>
<tr>
  <td><sub-row :content="[record.record_id]"></sub-row></td>
  <td><sub-row :content="[record.date]"></sub-row></td>
  <td><sub-row :content="record.landing_zone"></sub-row> </td>
  <td><sub-row :content="record.references"></sub-row> </td>
  <td><sub-row :content="record.passengers_out"></sub-row> </td>
  <td><sub-row :content="record.operation"></sub-row> </td>
  <td><sub-row :content="record.squadron"></sub-row> </td>
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
