<template>
    <div class="messages" ref="messagesContainer">
        <ul class="messages__list">
            <li
                class="messages__item"
                :class="message.side"
                v-for="message in messages"
                :key="message.id"
            >
                <div class="message">
                    <div
                        class="message__text"
                        v-html="linebreaks(message.text)"
                    ></div>
                    <div class="message__author">
                        {{ message.author.name }}
                    </div>
                    <div class="message__date">
                        {{ message.created | toDateTimeString }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MessageList',
    props: {
        parts: {
            type: Array,
            default: () => []
        },
        users: {
            type: Array,
            default: () => []
        },
        user: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        messages() {
            return this.parts.map(part => {
                const isUser = this.user.id === part.author;
                const author = isUser
                    ? this.user
                    : this.users.find(({ id }) => id === part.author);

                return {
                    ...part,
                    author,
                    side: isUser ? 'messages__item--right' : ''
                };
            });
        }
    },
    methods: {
        linebreaks: text => text.replace(/(\n)+/g, '<br />'),
        scrollToBottom() {
            let messagesContainer = this.$refs.messagesContainer;
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    },
    mounted() {
        this.scrollToBottom();
    },
    updated() {
        this.scrollToBottom();
    },
};
</script>

<style lang="scss" scoped>
.messages {
    display: flex;
    padding: 16px 16px 44px 39px;

    &__list {
        list-style: none;
        margin: auto 0 0;
        padding: 0;
        width: 100%;
    }

    &__item {
        margin-top: 20px;

        &--right {
            text-align: right;
        }
    }
}

.message {
    &__text {
        padding: 21px 21.5px 16px;
        max-width: 380px;
        border-radius: 8px 8px 8px 0px;
        background: #f6f7f9;
        color: #474e54;
        text-align: left;
    }

    &__author,
    &__date {
        display: inline-block;
        font-weight: 500;
    }

    &__date {
        margin-left: 12px;
        color: #b7c0c8;
        font-size: 10px;
    }

    .messages__item--right & {
        &__text {
            margin-left: auto;
            background: #e9f5f4;
            color: #475453;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 8px;
        }
    }
}
</style>
