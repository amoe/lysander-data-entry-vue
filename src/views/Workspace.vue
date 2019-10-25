<template>
<div>
  <h1>ws</h1>

  <sheet-carousel :sheet-data="tilletData"></sheet-carousel>

  <el-button type="primary" icon="el-icon-check"
             @click="markAsProcessed">Mark as processed</el-button>
  
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import SheetCarousel from '@/components/SheetCarousel.vue';
import log from 'loglevel';
import mc from '@/mutation-constants';
import axios from 'axios';
import {LysanderComponent} from '@/mixins';
import {TilletDatum} from '@/interfaces';
import {createNamespacedHelpers} from 'vuex';


const { mapState, mapMutations, mapActions } = createNamespacedHelpers('lysander');

export default LysanderComponent.extend({
    components: {SheetCarousel},
    data() {
        return {
            items: [
                {content: "fry"},
                {content: "bender"},
                {content: "leela"}
            ],
            tilletData: [] as TilletDatum[],
            sourceName: "TILLET"
        };
    },
    created() {
        console.log(this.getUnprocessedRows);

        this.gateway.getUnprocessedRows(this.sourceName).then(result => {
            this.$notify.info({title: "win", message: "success"});
            this.tilletData = result.records.map(rec => {
                return JSON.parse(rec.get('json'));
            });
        }).catch(e => {
            console.log(e);
            this.$notify.error({title: "foo", message: "fail"});
        });

    },
    methods: {
        markAsProcessed() {
            console.log("doing nothing");
        },
        ...mapActions(
            {
                getUnprocessedRows: 'getUnprocessedRows'
            }
        )
    },
    computed: {
    }
});
</script>

<style lang="less">
</style>
