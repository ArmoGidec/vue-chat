<template>
    <div class="chat-list">
        <div class="chat-list__title">
            Сообщения
            <span class="chat-list__counter">{{ chats.length || '' }}</span>
        </div>
        <Loader v-if="loading" size="100" style="margin:0 auto;" />
        <ul class="chat-list__list" v-else>
            <li class="chat-list__item" v-for="chat in chats" :key="chat.id">
                <router-link
                    :to="{ name: 'dialog', params: { dialogId: chat.id } }"
                    class="chat-list__link"
                >
                    <ChatItem :item="chat" />
                </router-link>
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
    data: () => ({
        loading: true
    }),
    created() {
        const unwatch = this.$watch('chats', () => {
            this.loading = false;
            unwatch();
        });
    },
    components: {
        ChatItem: () => import('./ChatItem.vue'),
        Loader: () => import('../Loader.vue')
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
        color: #656b77;
    }

    &__counter {
        margin-left: 10px;
        color: #d2d8de;
    }

    &__list {
        list-style: none;
        margin: 0;
        padding: 0;
        flex: 1;
        overflow-y: auto;
    }

    &__title,
    &__item {
        border-bottom: 2px solid #e9edf2;
    }

    &__link {
        display: block;
        text-decoration: none;
        padding: 22px 20px 11px 21px;
        border-left: 2px solid transparent;

        &.router-link-active {
            background-color: #fff;
            border-left-color: #398bff;
        }
    }
}
</style>
