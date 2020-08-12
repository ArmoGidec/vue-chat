import Vue from 'vue';
import Vuex from 'vuex';
import api from '../utils/api.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        users: [],
        user: null,
        chat: [],
        dialog: null
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
        },
        SET_DIALOG(state, payload) {
            state.dialog = payload;
        },
        ADD_MESSAGE(state, { dialogId, message }) {
            if ((state.dialog && state.dialog.id) === dialogId) {
                state.dialog.parts = state.dialog.parts.concat(message);
            }
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
        },
        async getDialog({ commit }, dialogId) {
            const dialog = (await api.get(`/chat/${dialogId}`)).data;
            commit('SET_DIALOG', dialog);
        },
        removeDialog({ commit }) {
            commit('SET_DIALOG', null);
        },
        async sendMessage({ commit }, { dialogId, message, author }) {
            const result = (await api.post(`/chat/${dialogId}`, {
                message,
                author
            })).data

            commit('ADD_MESSAGE', { dialogId, message: result });
            
            return result;
        }
    },
    getters: {
        users: ({ users }) => users,
        user: ({ user }) => user,
        chat: ({ chat }) => chat,
        dialog: ({ dialog }) => dialog,
    }
});

export default store;
