<template functional>
    <div class="chat-item">
        <div class="chat-item__title">
            {{ props.item.subject }}
            <span class="chat-item__created-mark">{{
                props.item.created | toDateString
            }}</span>
        </div>
        <p class="chat-item__message">
            {{ props.item.part | truncate(100) }}
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
        color: #35383d;
        font-weight: 500;
    }

    &__created-mark {
        color: #b7c0c8;
        font-size: 10px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    &__message {
        margin-top: 1px;
        font-size: 13px;
        color: #7d8790;
    }
}
</style>
