import mc from '@/mutation-constants';
import { ActionTree } from 'vuex';
import { LysanderState, RootState } from '@/interfaces';
import ac from '@/action-constants';

const actions: ActionTree<LysanderState, RootState> = {
    [ac.GET_UNPROCESSED_ROWS]: (store) => {
        console.log("inside the action for unprocessed rows");
        store.commit(mc.SET_SOURCE_ROWS, []);
    }
};

export default actions;

