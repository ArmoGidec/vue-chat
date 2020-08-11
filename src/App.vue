<template>
    <div id="app">
        <div class="container">
            <Chat />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'App',
    methods: {
        ...mapActions(['getChat', 'getUser', 'getUsers'])
    },
    created() {
        this.getChat();
        this.getUser();
        this.getUsers();
    },
    components: {
        Chat: () => import('./components/Chat.vue')
    }
};
</script>

<style lang="scss" scoped>
#app {
    min-height: 100vh;
    background-color: #E5E5E5;

    display: flex;
    align-items: center;
}

.container {
    margin: 0 auto;
    padding: 0 15px;
    max-width: 1200px;
    width: 100%;
}
</style>
