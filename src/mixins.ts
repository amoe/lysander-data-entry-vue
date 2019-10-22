import Vue from 'vue';
import { Neo4jGateway } from '@/neo4j-gateway';
import { NEO4J_HOSTNAME, NEO4J_USERNAME, NEO4J_PASSWORD } from '@/configuration';


// This is based on an idea from 'mmitchellgarcia', basically it's a hack to
// work around the deficient typescript support in the Vue mixin API.

export const LysanderComponent = Vue.extend({
    data() {
        return {
            gateway: new Neo4jGateway(
                NEO4J_HOSTNAME, NEO4J_USERNAME, NEO4J_PASSWORD
            )
        }
    },
    created() {
        console.log("The mixin hook was called");
        this.gateway.initialize();
    }
});
