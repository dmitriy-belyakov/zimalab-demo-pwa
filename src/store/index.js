/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import router from '@/router';

import firebase from 'firebase/app'
// import { firestorage } from '@/firebase/firestorage'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
Vue.use(Vuex)

const config = {
    apiKey: "AIzaSyBYoVZqtnVu2qlS7TzfM7kgY2rO96YZVy0",
    authDomain: "zimalab-workers.firebaseapp.com",
    databaseURL: "https://zimalab-workers.firebaseio.com",
    projectId: "zimalab-workers",
    storageBucket: "zimalab-workers.appspot.com",
    messagingSenderId: "481715674443"
};
firebase.initializeApp(config)

const storageRef = firebase.storage().ref()

export default new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false,
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
        },

        toggleSounds (state) {
            state.soundsOn = !state.soundsOn
        },

        toggleDarkMode (state) {
            state.darkMode = !state.darkMode
        },

        setUser (state, payload) {
            state.user = payload;
        },

        setIsAuthenticated (state, payload) {
            state.isAuthenticated = payload;
        }
    },
    actions: {
        userLogin({ commit }, { email, password }) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    // router.push('/');
                });
        },

        userSignOut({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/login');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    // router.push('/');
                });
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        },

        fileLinks (state) {
            return state.fileList
        },

        firebaseDB (state) {
            return firebase.firestore()
        }
    },
    plugins: [createPersistedState()]
})