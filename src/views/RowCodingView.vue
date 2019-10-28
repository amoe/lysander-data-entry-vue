<template>
<div>
  <h1>RowCodingView</h1>

  <sheet-carousel :source-rows="sourceRows"></sheet-carousel>

  <el-button type="primary" icon="el-icon-check"
             @click="a2">Mark as processed</el-button>

  <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>


  <list-dialog v-if="selectedIndex !== null"
               :parent-list="formData.persons" :dialog-visible="dialogVisible"
               :selected-index="selectedIndex"
               sublist-property="aliases"
               v-on:closed="onDialogClosed"></list-dialog>

  
  <h2>Date</h2>
  <el-date-picker :value="formData.date" @input="updateDate" type="date"
                  placeholder="Pick a day">
  </el-date-picker>
  
  <h2>Codenames</h2>
  
  <div>
    <ul>
      <li v-for="(codename, index) in formData.codenames">
        <el-input @input="onCodenameInput($event, index)"
                  :value="codename.content"></el-input>
      </li>
    </ul>
  </div>
  <el-button type="primary" icon="el-icon-plus" 
             v-on:click="addCodename">Codename</el-button>

  <h2>Locations</h2>

  <div>
    <ul>
      <li v-for="(location, index) in formData.locations">
        <el-input @input="onLocationInput($event, index)"
                  :value="location.content"></el-input>
      </li>
    </ul>
  </div>
  <el-button type="primary" icon="el-icon-plus" 
             v-on:click="addLocation">Location</el-button>

  <h2>Extra Events</h2>

  <div>
    <ul>
      <li v-for="(extraEvent, index) in formData.extraEvents">
        <el-input @input="onExtraEventInput($event, index)"
                  :value="extraEvent.content"></el-input>
      </li>
    </ul>
  </div>
  <el-button type="primary" icon="el-icon-plus" 
             v-on:click="addExtraEvent">Extra Event</el-button>


  <h2>Persons</h2>
  <div>
    <el-table :data="formData.persons">
      <el-table-column prop="name" label="Name"/>
      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="popAliases(scope.$index)">Assign Aliases</el-button>
        </template>
      </el-table-column>
    </el-table>
   <el-button v-on:click="addPerson">Add</el-button>
  </div>

  <el-button v-on:click="submit">Submit</el-button>
</div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from 'vue';
import {createNamespacedHelpers} from 'vuex';
import {LysanderState} from '@/interfaces';
import {LysanderComponent} from '@/mixins';
import mc from '@/mutation-constants';
import ac from '@/action-constants';
import ListDialog from '@/components/ListDialog.vue';
import SheetCarousel from '@/components/SheetCarousel.vue';
import { StatementResult } from 'neo4j-driver/types/v1/index';
import {toNeo4jParameters} from '@/transform';
import { REAL_ID_GENERATOR } from '@/id-generators';

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('lysander');

// Hacks for action bindings
interface TheseVuexBindings {
    a1: any;
    a2: any;
}

type ThisComponent = VueConstructor<Vue & InstanceType<typeof LysanderComponent> & TheseVuexBindings>;


export default (Vue as ThisComponent).extend({
    mixins: [LysanderComponent],
    components: {ListDialog, SheetCarousel},
    created() {
        console.log(this.formData);
        this.a1();
    },
    data() {
        return {
            dialogVisible: false,
            selectedIndex: null as number | null,
            activeName: 'first'    // for tabs
        };
    },
    methods: {
        handleClick() {
            console.log("a  tab was clicked");
        },
        // Wrap up the payload
        onExtraEventInput(newExtraEvent: string, index: number) {
            this.updateExtraEvent({newExtraEvent, index});
        },

        onCodenameInput(newCodename: string, index: number) {
            this.updateCodename({newCodename, index});
        },
        onLocationInput(newLocation: string, index: number) {
            this.updateLocation({newLocation, index});
        },
        popAliases(index: number) {
            console.log("picked index %o", index);
            this.dialogVisible = true;
            this.selectedIndex = index;
        },
        onDialogClosed() {
            // necessary as child can't mutate state.
            this.dialogVisible = false;
        },
        report(result: StatementResult) {
            const n = result.summary.counters.nodesCreated();
            const r = result.summary.counters.relationshipsCreated();
            
            this.$notify.info({title:'foo', message: `created ${n} nodes, ${r} relationships`});
        },
        submit() {
            this.gateway.submitModel(
                toNeo4jParameters(this.formData, REAL_ID_GENERATOR)
            ).then(result => {
                result.forEach(this.report);
            }).catch(error => {
                this.$notify.error({title: 'bar', message: error.message});
            });
        },
        ...mapMutations({
            updateDate: mc.UPDATE_DATE,
            updateCodename: mc.UPDATE_CODENAME,
            addCodename: mc.ADD_CODENAME,
            updateLocation: mc.UPDATE_LOCATION,
            addLocation: mc.ADD_LOCATION,
            updateExtraEvent: mc.UPDATE_EXTRA_EVENT,
            addExtraEvent: mc.ADD_EXTRA_EVENT,
            addPerson: mc.ADD_PERSON
        }),
        ...mapActions({
            // Why do this?  Only because we are REQUIRED to explicitly type
            // the action in order to avoid errors, so we may as well avoid
            // hardcoding long names everywhere.
            a1: ac.GET_UNPROCESSED_ROWS,
            a2: ac.MARK_AS_PROCESSED
        })
    },
    computed: {
        ...mapState({
            formData: (s: LysanderState) => s.formData,
            sourceRows: (s: LysanderState) => s.sourceRows
        })
    }
});
</script>

<style lang="less">
</style>
