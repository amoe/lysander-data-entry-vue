<template>
<div>
  <h1>ws</h1>

</div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from 'vue';
import {createNamespacedHelpers} from 'vuex';
import {LysanderComponent} from '@/mixins';
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('lysander');

interface TheseVuexBindings {
}

type ThisComponent = VueConstructor<Vue & InstanceType<typeof LysanderComponent> & TheseVuexBindings>;

export default (Vue as ThisComponent).extend({
    mixins: [LysanderComponent],
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
        ...mapActions({
        })
    },
    computed: {
        ...mapState({
        })
    }
});
</script>

<style lang="less">
</style>
