<template>
    <div class="chat">
        <nav class="chat__sidebar">
            <ChatList :chats="chat" />
        </nav>
        <main class="chat__dialog">
        </main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Chat',
    computed: {
        ...mapGetters(['chat'])
    },
    components: {
        ChatList: () => import('./ChatList.vue')
    }
};
</script>

<style lang="scss" scoped>
.chat {
    background-color: #f3f6f8;
    max-width: 980px;
    max-height: 100vh;
    height: 720px;

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
