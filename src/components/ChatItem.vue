<template>
    <div class="chat-item">
        <div class="chat-item__title">
            {{ item.subject }} <span class="chat-item__created-mark">{{ item.created | toDateString }}</span>
        </div>
        <p class="chat-item__message">
            {{ item.part | truncate(100) }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'ChatItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style lang="scss" scoped>
.chat-item {
    &__title {
        display: flex;
        justify-content: space-between;
        color: #35383D;
        font-weight: 500;
    }

    &__created-mark {
        color: #B7C0C8;
        font-size: 10px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    &__message {
        margin-top: 1px;
        font-size: 13px;
        color: #7D8790;
    }
}
</style>
