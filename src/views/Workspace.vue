<template>
<div>
  <h1>ws</h1>

  <sheet-carousel :sheet-data="tilletData"></sheet-carousel>

  
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import SheetCarousel from '@/components/SheetCarousel.vue';
import log from 'loglevel';
import {mapGetters} from 'vuex';
import mc from '@/mutation-constants';
import axios from 'axios';
import {LysanderComponent} from '@/mixins';
import {TilletDatum} from '@/interfaces';

export default LysanderComponent.extend({
    components: {SheetCarousel},
    data() {
        return {
            items: [
                {content: "fry"},
                {content: "bender"},
                {content: "leela"}
            ],
            tilletData: [] as TilletDatum[]
        };
    },
    created() {
        this.gateway.getUnprocessedRows().then(result => {
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
    },
    computed: {
    }
});
</script>

<style lang="less">
</style>
