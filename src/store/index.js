/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        purchaseHistory: [],
        soundsOn: false,
        darkMode: false,
    },
    mutations: {
        addPurchase (state, payload) {
            state.purchaseHistory.unshift(payload)
        },
        clear (state) {
            state.purchaseHistory = []
        }
    },
    plugins: [createPersistedState()]
})