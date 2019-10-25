<template>
  <div>
    <ul v-if="content.length > 0" class="sub-row">
      <li v-for="item in content">
        {{item}}
      </li>
    </ul>
    <p v-else class="empty-case">No data</p>
  </div>
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
p.empty-case {
    font-style: italic;
    opacity: 0.70;
}


ul.sub-row li {
    list-style-type: none;
    border-bottom: 1px solid #ebeef5;
    padding: 12px;
}

ul.sub-row li:hover {
    background-color: #F5F7FA;
}


</style>
