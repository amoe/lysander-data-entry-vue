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

export default Vue.extend({
    components: {SheetCarousel},
    data() {
        return {
            items: [
                {content: "fry"},
                {content: "bender"},
                {content: "leela"}
            ],
            tilletData: []
        };
    },
    created() {
        // Next step is to deserialize it from the neo4j nodes rather than to 
        // read it from the json.
        axios.get("/sensitive/tillet_converted.json").then(r => {
            this.tilletData = r.data.slice(0, 5);
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
</style>
