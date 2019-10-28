<template>
<div>
  <h1>ws</h1>

  <sheet-carousel :source-rows="sourceRows"></sheet-carousel>

  <el-button type="primary" icon="el-icon-check"
             @click="a2">Mark as processed</el-button>
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

interface TheseVuexBindings {
    a1: any;    // action hack
}

type ThisComponent = VueConstructor<Vue & InstanceType<typeof LysanderComponent> & TheseVuexBindings>;

export default (Vue as ThisComponent).extend({
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

        this.a1();
        console.log(this.sourceRows);
    },
    methods: {
        ...mapActions({
            // Why do this?  Only because we are REQUIRED to explicitly type
            // the action in order to avoid errors, so we may as well avoid
            // hardcoding long names everywhere.
            a1: ac.GET_UNPROCESSED_ROWS,
            a2: ac.MARK_AS_PROCESSED
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
