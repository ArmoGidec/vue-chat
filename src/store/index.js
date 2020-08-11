import Vue from 'vue';
import Vuex from 'vuex';
import api from '../utils/api.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        users: [],
        user: null,
        chat: []
    },
    mutations: {
        SET_USERS(state, payload) {
            state.users = payload;
        },
        SET_USER(state, payload) {
            state.user = payload;
        },
        SET_CHAT(state, payload) {
            state.chat = payload;
        }
    },
    actions: {
        async getUsers({ commit }) {
            const users = (await api.get('/user')).data;
            commit('SET_USERS', users);
        },
        async getUser({ commit }) {
            const user = (await api.get('/user/me')).data;
            commit('SET_USER', user);
        },
        async getChat({ commit }) {
            const chat = (await api.get('/chat')).data;
            commit('SET_CHAT', chat);
        }
    },
    getters: {
        users: ({ users }) => users,
        user: ({ user }) => user,
        chat: ({ chat }) => chat
    }
});

export default store;
