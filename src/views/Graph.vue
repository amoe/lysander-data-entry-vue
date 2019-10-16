<template>
  <div>
     <h1>NeovisDemo</h1>

<div id="viz"></div>

Cypher query: <textarea rows="4" cols=50 id="cypher" v-model="query"></textarea><br>

<input type="submit" value="Submit" id="reload" v-on:click="draw">
<input type="submit" value="Stabilize" id="stabilize">


  </div>
</template>
<script lang="ts">
    import Vue from 'vue';
import Neovis from 'neovis.js';
import {NEO4J_HOSTNAME, NEO4J_USERNAME, NEO4J_PASSWORD} from '@/configuration';
import {Loading} from 'element-ui';

const ENTIRE_GRAPH_QUERY = `MATCH (n) OPTIONAL MATCH (n)-[r]->() RETURN n, r`;


function makeConfig(initialCypher: string) {
    return  {
        container_id: "viz",
        server_url: "bolt://" + NEO4J_HOSTNAME,
        server_user: NEO4J_USERNAME,
        server_password: NEO4J_PASSWORD,
        labels: {
            "Character": {
                "caption": "name",
                "size": "pagerank",
                "community": "community"
            }
        },
        relationships: {
            // "HAS": {
            //     "thickness": 0,
            //     "caption": false
            // }
        },
        initial_cypher: initialCypher
    };
}


export default Vue.extend({
    data() {
        return {
            query: ENTIRE_GRAPH_QUERY as string,
            viz: null as any
        };
    },
    created() {
        // Works fine to put this in created, not sure if it actually improved time
        // though
        this.$nextTick(() => {
            this.viz = new Neovis(makeConfig(this.query));
            this.viz.registerOnEvent('completed', (event: any) => {
                console.log("completed event fired");
                Loading.service({fullscreen: true}).close();
            });
            this.viz.render();   // initial render call is needed for some unknown reason
        });
    },
    methods: {
        draw() {
            console.log("i wanna draw");

            const loading = Loading.service({fullscreen: true});
            this.viz.renderWithCypher(this.query);
            console.log(this.viz._network);
        }
    }
});
</script>
<style lang="less">
html, body {
    font: 16pt arial;
}

#viz {
    width: 900px;
    height: 700px;
    border: 1px solid lightgray;
    font: 22pt arial;
}
</style>
