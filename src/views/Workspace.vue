<template>
<div>
  <h1>ws</h1>

  <textarea cols="80" rows="8">{{stuff}}</textarea>


</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
    data() {
        return {
            stuff: null as any
        };
    },
    created() {
        axios.get("/sensitive/tillet_converted.json").then(r => {
            console.log("response is %o", r);
            this.stuff = r.data;
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
