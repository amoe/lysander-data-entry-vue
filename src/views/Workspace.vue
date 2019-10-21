<template>
<div>
  <h1>ws</h1>

</div>
</template>

<script lang="ts">
    import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
    data() {
        return {
        };
    },
    created() {
        axios.get("/sensitive/tillet_converted.json").then(r => {
            console.log("response is %o", r);
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
