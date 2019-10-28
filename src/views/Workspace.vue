<template>
<div>
  <h1>ws</h1>

  <sheet-carousel :sheet-data="sourceRows"></sheet-carousel>

  <el-button type="primary" icon="el-icon-check"
             @click="markAsProcessed">Mark as processed</el-button>
  
</div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from 'vue';
import SheetCarousel from '@/components/SheetCarousel.vue';
import log from 'loglevel';
import mc from '@/mutation-constants';
import ac from '@/action-constants';
import axios from 'axios';
import {LysanderComponent} from '@/mixins';
import {TilletDatum, LysanderState} from '@/interfaces';
import {createNamespacedHelpers} from 'vuex';


const { mapState, mapMutations, mapActions } = createNamespacedHelpers('lysander');

interface VuexBindings {
    a1: any;    // action hack
}

type ThisFoo = VueConstructor<Vue & InstanceType<typeof LysanderComponent> & VuexBindings>;

export default (Vue as ThisFoo).extend({
    components: {SheetCarousel},
    mixins: [LysanderComponent],
    data() {
        return {
            items: [
                {content: "fry"},
                {content: "bender"},
                {content: "leela"}
            ],
            sourceName: "TILLET"
        };
    },
    created() {
        console.log(this.gateway);
        console.log(this.a1);

        this.a1(this.sourceName);
        console.log(this.sourceRows);
    },
    methods: {
        markAsProcessed() {
            console.log("doing nothing");
        },
        ...mapActions({
            // Why do this?  Only because we are REQUIRED to explicitly type
            // the action in order to avoid errors, so we may as well avoid
            // hardcoding long names everywhere.
            a1: ac.GET_UNPROCESSED_ROWS
        })
    },
    computed: {
        ...mapState({
            sourceRows: (s: LysanderState) => s.sourceRows
        })
    }
});
</script>

<style lang="less">
</style>
