<template>
  <ul>
    <li v-for="item in content">
      {{item}}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        content: {
            type: Array as () => any[]
        }
    }
});
</script>

<style lang="less">
</style>
