<template>
  <div>
    <h1>Sources</h1>

    <h2>Source name</h2>
    <el-input v-model="sourceName"></el-input>

    <p v-if="tilletData !== null">Loaded {{tilletData.length}} records.</p>

    <el-button @click="loadSource">Insert source rows</el-button>
    <el-button @click="a1">Mark all source rows as unprocessed</el-button>
  </div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from 'vue';
import axios from 'axios';
import {LysanderComponent} from '@/mixins';
import {createNamespacedHelpers} from 'vuex';
import ac from '@/action-constants';


const { mapState, mapMutations, mapActions } = createNamespacedHelpers('lysander');
interface TheseVuexBindings {
    a1: any;    // action hack
}
type ThisComponent = VueConstructor<Vue & InstanceType<typeof LysanderComponent> & TheseVuexBindings>;


export default (Vue as ThisComponent).extend({
    mixins: [LysanderComponent],
    data() {
        return {
            tilletData: null as any,
            sourceName: "TILLET" as string,
        };
    },
    created() {
        console.log("The subclass hook was called");
        axios.get("/sensitive/tillet_converted.json").then(r => {
            this.tilletData = r.data;
        }).catch(e => {
            console.log("error is %o", e);
        });
    },
    methods: {
        loadSource() {
            console.log("load source");
            console.log(this.gateway);

            this.gateway.createSourceWithRows(this.sourceName, this.tilletData).then(r => {
                this.$notify.info({title: "foo", message: "success"});
            }).catch(e => {
                console.log(e);
                console.log("fail");
            });
        }, ...mapActions({
            a1: ac.SET_ALL_UNPROCESSED
        })
    }
});
</script>

<style lang="less">
</style>
