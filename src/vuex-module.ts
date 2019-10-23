import { Module } from 'vuex';
import mc from '@/mutation-constants';
import log from 'loglevel';

import {
    RootState, AggregatedForm, LysanderState
} from '@/interfaces';



export const lysander: Module<LysanderState, RootState> = {
    namespaced: true,
    state: {
        counter: 0,
        formData: {
            date: new Date('1940-01-01'),
            codenames: [],
            persons: [],
            locations: [],
            extraEvents: []
        }
    },
    mutations: {
        [mc.ADD_TO_COUNTER]: (state) => {
            state.counter++;
        },
        [mc.UPDATE_DATE]: (state, newDate) => {
            state.formData.date = newDate;
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

