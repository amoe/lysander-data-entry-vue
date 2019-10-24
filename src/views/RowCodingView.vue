<template>
<div>
  <h1>RowCodingView</h1>

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
<!--    <el-button v-on:click="addPerson">Add</el-button>  -->
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {createNamespacedHelpers} from 'vuex';
import {LysanderState} from '@/interfaces';
import mc from '@/mutation-constants';
import ListDialog from '@/components/ListDialog.vue';


const { mapState, mapMutations } = createNamespacedHelpers('lysander');

export default Vue.extend({
    components: {ListDialog},
    created() {
        console.log(this.formData);
    },
    data() {
        return {
            dialogVisible: false,
            selectedIndex: null as number | null
        };
    },
    methods: {
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
        ...mapMutations({
            updateDate: mc.UPDATE_DATE,
            updateCodename: mc.UPDATE_CODENAME,
            addCodename: mc.ADD_CODENAME,
            updateLocation: mc.UPDATE_LOCATION,
            addLocation: mc.ADD_LOCATION,
            updateExtraEvent: mc.UPDATE_EXTRA_EVENT,
            addExtraEvent: mc.ADD_EXTRA_EVENT
        })
    },
    computed: {
        ...mapState({
            formData: (s: LysanderState) => s.formData
        })
    }
});
</script>

<style lang="less">
</style>
