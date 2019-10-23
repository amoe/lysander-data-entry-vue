import { Module } from 'vuex';
import { RootState } from '@/interfaces';
import mc from '@/mutation-constants';
import log from 'loglevel';

interface LysanderState {
    counter: number;
};

export const lysander: Module<LysanderState, RootState> = {
    state: {
        counter: 0
    },
    mutations: {
        [mc.ADD_TO_COUNTER]: (state) => {
            state.counter++;
        }
    },
    actions: {
    },
    getters: {
        counter(state, getters) {
            return state.counter;
        }
    }
};

