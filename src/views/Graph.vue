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

var config = {
    container_id: "viz",
    server_url: "bolt://localhost:7687",
    server_user: "neo4j",
    server_password: "password",
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
    initial_cypher: "MATCH (n)-[r:INTERACTS]->(m) RETURN *"
};


export default Vue.extend({
    data() {
        return {
            query: "MATCH (n)-[r:HAS]->(m) RETURN *" as string,
            viz: null as any
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.viz = new Neovis(config);
            this.viz.render();   // initial render call is needed for some unknown reason
        });
    },
    methods: {
        draw() {
            console.log("i wanna draw");

            this.viz.renderWithCypher(this.query);
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
