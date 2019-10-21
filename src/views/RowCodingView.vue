<template>
<div>
  <h1>RowCodingView</h1>

  
  <workspace v-if="selectedIndex !== null"
             :parent-list="persons" :dialog-visible="dialogVisible"
             :selected-index="selectedIndex"
             sublist-property="aliases"
             v-on:closed="onDialogClosed"></workspace>
  
  <button v-on:click="clearGraph">Clear graph</button>
  
  <div>
    <span>Flight date</span>
    <el-date-picker v-model="value1" type="date" placeholder="Pick a day">
    </el-date-picker>
  </div>
  
  <h2>Codenames</h2>
  
  <p>This refers to the codename of the specific mission.</p>
  
  <div class="codenames">
    <ul>
      <li v-for="codename in codenames">
        <el-input v-model="codename.content"></el-input>
      </li>
    </ul>
  </div>
  <el-button type="primary" icon="el-icon-plus" v-on:click="addCodename">Codename</el-button>
  
  
  <h2>Persons</h2>
  <div class="persons">
    <el-table :data="persons">
      <el-table-column prop="name" label="Name"/>
      
      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button size="mini"
                     v-on:click="popAliases(scope.$index)">Assign Aliases</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    <el-button v-on:click="addPerson">Add</el-button>
  </div>
  


  <h2>Locations</h2>
  <div class="locations">
    <ul>
      <li v-for="location in locations">
        <input  v-model="location.content">
      </li>
    </ul>
  </div>

  <el-button type="primary" icon="el-icon-plus" v-on:click="addLocation">Location</el-button>

  <h2>Extra Events</h2>
  <div class="extra-events">
    <ul>
      <li v-for="event in extraEvents">
        <el-input v-model="event.content"></el-input>
      </li>
    </ul>
  </div>
  <el-button type="primary" icon="el-icon-plus" v-on:click="addExtraEvent">Extra Event</el-button>


  <el-button v-on:click="submit">Submit</el-button>
</div>
</template>
<script lang="ts">
    import Vue from 'vue';
import {Neo4jGateway} from '@/neo4j-gateway';
import {NEO4J_HOSTNAME, NEO4J_USERNAME, NEO4J_PASSWORD} from '@/configuration';
import {
    INTERFACES_FILE_VERSION, Role, AggregatedForm, Location, ExtraEvent,
    OperationCodename, Person
} from '@/interfaces';
import {  StatementResult } from 'neo4j-driver/types/v1/index';
import {toNeo4jParameters} from '@/transform';
import Workspace from '@/views/Workspace.vue';
import uuidv4 from 'uuid/v4';

const getGraph = (d: any) => d.results[0].data[0].graph;

const REAL_ID_GENERATOR = () => uuidv4();


export default Vue.extend({
    components: {Workspace},
    data() {
        return {
            dialogVisible: false,
            tableData: [
                {name: 'fry', age: 29}
            ],
            value1: new Date("1940-01-01"),
            locations: [] as Location[],
            persons: [] as Person[],
            codenames: [] as OperationCodename[],
            extraEvents: [] as ExtraEvent[],
            graph: null as any,
            gateway: new Neo4jGateway(
                NEO4J_HOSTNAME, NEO4J_USERNAME, NEO4J_PASSWORD
            ),
            // not really valid
            selectedIndex: null as number | null
        };
    },
    created() {
        console.log("RowCodingView: using interfaces version %o", INTERFACES_FILE_VERSION);
        this.gateway.initialize();
    },
    methods: {
        popAliases(index: number) {
            console.log("picked index %o", index);
            this.dialogVisible = true;
            this.selectedIndex = index;
        },
        addLocation() {
            this.locations.push({
                content: ""
            });
        },
        addPerson() {
            this.persons.push({
                name: "",
                role: null,
                aliases: [{name: 'fry'}]
            });
        },
        addCodename() {
            this.codenames.push({
                content: ""
            });
        },
        addExtraEvent() {
            this.extraEvents.push({
                content: ""
            });
        },
        gatherFormData(): AggregatedForm {
            return {
                date: this.value1,
                codenames: this.codenames,
                persons: this.persons,
                locations: this.locations,
                extraEvents: this.extraEvents
            }
        },
        report(result: StatementResult) {
            const n = result.summary.counters.nodesCreated();
            const r = result.summary.counters.relationshipsCreated();
            
            this.$notify.info({title:'foo', message: `created ${n} nodes, ${r} relationships`});
        },
        submit() {
            this.gateway.submitModel(toNeo4jParameters(this.gatherFormData(), REAL_ID_GENERATOR)).then(result => {
                result.forEach(this.report);
            }).catch(error => {
                this.$notify.error({title: 'bar', message: error.message});
            });
        },
        clearGraph() {
            this.gateway.clearGraph().then(result => {
                this.$notify.info({title:'foo', message: `clear succeeded`});
            }).catch(error => {
                this.$notify.error({title: 'bar', message: error.message});
            });
        },
        onDialogClosed() {
            // necessary
            this.dialogVisible = false;
        }
    },
    computed: {
        availableRoles() {
            return Object.keys(Role).map((k: any) => {
                return {
                    value: Role[k],
                    label: k
                }
            });
        }
    }
});
</script>
<style lang="less">
div.locations {
    background-color: #F2F6FC;
    padding: 1em;
}

div.locations li {
    list-style-type: none;
}
</style>
