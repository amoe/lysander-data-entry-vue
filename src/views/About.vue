<template>
    <div id="cy">
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import cytoscape from 'cytoscape';
import {BIKE_GRAPH} from '@/bike-graph';
import {fromNeo4j} from '@/cytoscape-alternate-format';

const elements = [ // list of graph elements to start with
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    }
];


const style = [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
];

const layout = {
    name: 'random',
    rows: 1,
    fit: true
};


export default Vue.extend({
    mounted() {
        this.$nextTick(() => {
            var cy = cytoscape({
                container: document.getElementById('cy'),
                elements: fromNeo4j(BIKE_GRAPH),
                style: style,
                layout: layout
            });
        });
    }
});
</script>

<style lang="less">
#cy {
      width: 300px;
      height: 300px;
      display: block;
}
</style>

