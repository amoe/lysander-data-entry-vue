import mc from '@/mutation-constants';
import { ActionTree } from 'vuex';
import { LysanderState, RootState, SourceRow } from '@/interfaces';
import { Record } from 'neo4j-driver/types/v1/index';
import ac from '@/action-constants';
import singletons from '@/singletons';

function recordToSourceRow(record: Record): SourceRow {
    return {
        id: record.get('id'),
        datum: JSON.parse(record.get('json'))
    };
}

const actions: ActionTree<LysanderState, RootState> = {
    [ac.GET_UNPROCESSED_ROWS]: (store, sourceName: string) => {
        console.log("inside the action for unprocessed rows");

        singletons.gateway.getUnprocessedRows(sourceName).then(result => {
            console.log("success");
            store.commit(mc.SET_SOURCE_ROWS, result.records.map(recordToSourceRow));
        }).catch(e => {
            console.log("fail");
        });

        store.commit(mc.SET_SOURCE_ROWS, []);
    },
    [ac.MARK_AS_PROCESSED]: (store, payload) => {
        const index = store.state.sourceRowListIndex;
        const thisRowId = store.state.sourceRows[index].id;

        singletons.gateway.markAsProcessed(thisRowId).then(result => {
            console.log("success");
            // maybe reissue the action
            //            store.dispatch(ac.GET_UNPROCESSED_ROWS, 
        }).catch(e => {
            console.log("failure");
        });
    }
};

export default actions;

