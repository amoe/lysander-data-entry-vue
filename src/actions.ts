import mc from '@/mutation-constants';
import { ActionTree } from 'vuex';
import { LysanderState, RootState } from '@/interfaces';

const actions: ActionTree<LysanderState, RootState> = {
    getUnprocessedRows(store) {
        store.commit(mc.SET_SOURCE_ROWS, []);
    }
};

export default actions;

