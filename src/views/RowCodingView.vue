<template>
<div>
  <h1>RowCodingView</h1>

    <el-date-picker :value="formData.date" @input="updateDate" type="date" placeholder="Pick a day">
    </el-date-picker>
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
    methods: {
        ...mapMutations({
            updateDate: mc.UPDATE_DATE
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
