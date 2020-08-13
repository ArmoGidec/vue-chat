<template>
    <form @submit="submit" class="message-form" ref="messageForm">
        <MessageTextarea
            class="message-form__input"
            :class="{ invalid: formInvalid }"
            placeholder="Введите текст..."
            :value="value"
            @input="input"
            :disabled="disabled"
            @area-submit="submit"
        ></MessageTextarea>
        <button class="message-form__btn" type="submit" :disabled="disabled">
            <img src="/icons/vector.png" alt="send" v-if="!disabled" />
            <template v-else>
                <slot name="loader"></slot>
            </template>
        </button>
    </form>
</template>

<script>
export default {
    name: 'MessageForm',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        valid: {
            type: Boolean,
            default: true
        },
        value: {
            type: String,
            default: ''
        }
    },
    data: () => ({
        touched: false
    }),
    computed: {
        formInvalid() {
            return !this.valid && this.touched;
        }
    },
    methods: {
        input(value) {
            this.touched = true;
            this.$emit('input', value)
        },
        submit(e) {
            this.touched = true;
            if (!this.formInvalid) {
                this.touched = false;
            }
            this.$emit('submit', e);
        }
    },
    components: {
        MessageTextarea: () => import('./MessageTextarea.vue')
    },
}
</script>

<style lang="scss" scoped>
.message-form {
    &__btn,
    &__input {
        outline: 0;
    }

    &__input {
        flex: 1;
        padding-left: 33px;
        border: 1px solid transparent;

        &.invalid {
            border-color: red;
        }
    }


    &__btn {
        border: none;
        width: 80px;
        height: 80px;
        background-color: #398bff;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;

        &[disabled] {
            background-color: lighten($color: #398bff, $amount: 20%);
        }
    }
}
</style>