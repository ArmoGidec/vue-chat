<template>
    <div class="dialog">
        <Loader size="100" style="margin: auto" v-if="!dialog" />
        <template v-else>
            <div class="dialog__messages">
                <MessageList
                    :parts="dialog.parts"
                    :users="users"
                    :user="user"
                />
            </div>
            <form @submit.prevent="sendMsg" class="dialog__form">
                <Textarea
                    class="dialog__input"
                    placeholder="Введите текст..."
                    v-model="form.text"
                    :valid="form.valid"
                    :disabled="sending"
                ></Textarea>
                <button class="dialog__btn" type="submit" :disabled="sending">
                    <img src="/icons/vector.png" alt="send" v-if="!sending" />
                    <Loader v-else size="50" color="white" />
                </button>
            </form>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'Dialog',
    data: () => ({
        form: {
            text: '',
            valid: true
        },
        sending: false
    }),
    computed: {
        ...mapGetters(['dialog', 'user', 'users'])
    },
    methods: {
        ...mapActions(['getDialog', 'removeDialog', 'sendMessage']),
        async sendMsg() {
            const form = { ...this.form };
            if (form.text === '') {
                form.valid = false;
                return;
            }
            this.sending = true;
            this.form.text = '';

            const dialogId = this.$route.params.dialogId;
            await this.sendMessage({
                dialogId,
                message: form.text,
                author: this.user.id
            });
            this.sending = false;
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getDialog(to.params.dialogId);
        });
    },
    beforeRouteUpdate(to, from, next) {
        this.removeDialog();
        this.form.text = '';
        this.getDialog(to.params.dialogId);
        next();
    },
    components: {
        Loader: () => import('./Loader.vue'),
        MessageList: () => import('./MessageList.vue'),
        Textarea: () => import('./Textarea.vue')
    }
};
</script>

<style lang="scss" scoped>
.dialog {
    &,
    &__form {
        display: flex;
    }

    flex-direction: column;
    height: 100%;

    &__form {
        border-top: 1px solid #e9edf2;
        max-height: 80px;
    }

    &__messages,
    &__input {
        flex: 1;
    }

    &__input {
        padding-left: 33px;
    }

    &__btn,
    &__input {
        border: none;
        outline: 0;
    }

    &__btn {
        width: 80px;
        height: 80px;
        background-color: #398bff;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;

        &[disabled] {
            background-color: lighten($color: #398bff, $amount: 20%);
        }
    }
}
</style>
