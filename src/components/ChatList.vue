<template>
    <div class="chat-list">
        <div class="chat-list__title">
            Сообщения <span class="chat-list__counter">{{ chats.length || '' }}</span>
        </div>
        <ul class="chat-list__list">
            <li class="chat-list__item" v-for="chat in chats" :key="chat.id">
                <ChatItem :item="chat" />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ChatList',
    props: {
        chats: {
            type: Array,
            default: () => []
        }
    },
    components: {
        ChatItem: () => import('./ChatItem.vue')
    }
};
</script>

<style lang="scss" scoped>
.chat-list {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__title {
        padding: 24px 20px;
        color: #656B77;
    }

    &__counter {
        margin-left: 10px;
        color: #D2D8DE;
    }

    &__list {
        list-style: none;
        margin: 0;
        padding: 0;
        flex: 1;
        overflow-y: auto;
    }

    &__item {
        padding: 22px 20px 11px 23px;
    }

    &__title,
    &__item {
        border-bottom: 2px solid #e9edf2;
    }
}
</style>
