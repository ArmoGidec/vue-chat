<template>
    <div id="app">
        <div class="container">
            <div class="chat">
                <nav class="chat__sidebar">
                    <ChatList :chats="chat" />
                </nav>
                <main class="chat__dialog">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'App',
    computed: {
        ...mapGetters(['chat'])
    },
    methods: {
        ...mapActions(['getChat', 'getUser', 'getUsers'])
    },
    created() {
        this.getChat();
        this.getUser();
        this.getUsers();
    },
    components: {
        ChatList: () => import('./components/Chat/ChatList.vue')
    }
};
</script>

<style lang="scss" scoped>
#app {
    min-height: 100vh;
    background-color: #e5e5e5;

    display: flex;
    align-items: center;
}

.container {
    margin: 0 auto;
    padding: 0 15px;
    max-width: 1200px;
    width: 100%;
}

.chat {
    background-color: #f3f6f8;
    max-width: 980px;
    max-height: 100vh;
    height: 720px;

    margin: 0 auto;
    display: flex;

    &__sidebar {
        flex: 1;
        max-width: 300px;
    }

    &__dialog {
        flex: 1;
        max-width: 680px;
        background-color: #fff;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    }
}
</style>
