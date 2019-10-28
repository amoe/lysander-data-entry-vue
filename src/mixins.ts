import Vue from 'vue';
import singletons from '@/singletons';

// Components that use the mixin have to be typed as
// VueConstructor<Vue & InstanceType<typeof LysanderComponent>>

export const LysanderComponent = Vue.extend({
    data() {
        return {
            gateway: singletons.gateway
        }
    },
    // The gateway will only initialize once anyway.
    created() {
        console.log("The mixin hook was called");
        this.gateway.initialize();
    }
});
