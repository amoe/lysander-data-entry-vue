import mc from '@/mutation-constants';
import { ActionTree } from 'vuex';
import { LysanderState, RootState } from '@/interfaces';
import ac from '@/action-constants';
import singletons from '@/singletons';

const actions: ActionTree<LysanderState, RootState> = {
    [ac.GET_UNPROCESSED_ROWS]: (store, sourceName: string) => {
        console.log("inside the action for unprocessed rows");

        singletons.gateway.getUnprocessedRows(sourceName).then(result => {
            console.log("success");
            store.commit(mc.SET_SOURCE_ROWS, result.records.map(rec => {
                return JSON.parse(rec.get('json'));
            }));
        }).catch(e => {
            console.log("fail");
        });

        store.commit(mc.SET_SOURCE_ROWS, []);
    }
};

export default actions;

