import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { boardStore } from './board.store.js';

export default new Vuex.Store({
    strict: true,
    modules: {
        boardStore,
    },
});
