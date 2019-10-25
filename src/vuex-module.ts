import { Module } from 'vuex';
import mc from '@/mutation-constants';
import log from 'loglevel';
import actions from '@/actions';

import {
    RootState, AggregatedForm, LysanderState, Role
} from '@/interfaces';



export const lysander: Module<LysanderState, RootState> = {
    namespaced: true,
    state: {
        counter: 0,
        formData: {
            date: new Date('1940-01-01'),
            codenames: [{ content: "fry" }],
            persons: [
                {
                    name: "Fry",
                    role: Role.Agent,
                    aliases: [
                        { name: "Sneaky Pete" }
                    ]
                },
                {
                    name: "Leela",
                    role: Role.Pilot,
                    aliases: []
                }
            ],
            locations: [],
            extraEvents: []
        },
        sourceRowListIndex: 0,
        sourceRows: []
    },
    mutations: {
        [mc.ADD_TO_COUNTER]: (state) => {
            state.counter++;
        },
        [mc.UPDATE_DATE]: (state, newDate) => {
            state.formData.date = newDate;
        },
        [mc.UPDATE_CODENAME]: (state, { newCodename, index }) => {
            state.formData.codenames[index].content = newCodename;
        },
        [mc.ADD_CODENAME]: (state) => {
            state.formData.codenames.push({ content: "" });
        },
        [mc.UPDATE_LOCATION]: (state, { newLocation, index }) => {
            state.formData.locations[index].content = newLocation;
        },
        [mc.ADD_LOCATION]: (state) => {
            state.formData.locations.push({ content: "" });
        },
        [mc.UPDATE_EXTRA_EVENT]: (state, { newExtraEvent, index }) => {
            state.formData.extraEvents[index].content = newExtraEvent;
        },
        [mc.ADD_EXTRA_EVENT]: (state) => {
            state.formData.extraEvents.push({ content: "" });
        },
        [mc.ADD_PERSON]: (state) => {
            state.formData.persons.push({
                name: "",
                role: null,
                aliases: []
            });
        },
        [mc.SET_ACTIVE_INDEX_OF_SOURCE_ROW_LIST]: (state, newIndex) => {
            state.sourceRowListIndex = newIndex;
        },
        [mc.SET_SOURCE_ROWS]: (state, newRows) => {
            state.sourceRows = newRows;
        }
    },
    actions,
    getters: {
        counter(state, getters) {
            return state.counter;
        }
    }
};

