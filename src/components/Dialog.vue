<template>
    <div class="dialog">
        <Loader size="100" style="margin: auto" v-if="!dialog" />
        <template v-else>
            <MessageList
                :parts="dialog.parts"
                :users="users"
                :user="user"
                class="dialog__messages"
            />
            <MessageForm
                class="dialog__form"
                :valid="valid"
                :disabled="sending"
                v-model="form.text"
                @submit.prevent="sendMsg"
            >
                <template v-slot:loader>
                    <Loader size="50" color="white" />
                </template>
            </MessageForm>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import MessageForm from './Message/MessageForm';
import MessageList from './Message/MessageList';

export default {
    name: 'Dialog',
    data: () => ({
        form: {
            text: ''
        },
        sending: false,
    }),
    computed: {
        ...mapGetters(['dialog', 'user', 'users']),
        valid() {
            return this.form.text !== '';
        }
    },
    methods: {
        ...mapActions(['getDialog', 'removeDialog', 'sendMessage']),
        async sendMsg() {
            if (!this.valid) {
                return;
            }

            const form = { ...this.form };
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
        MessageForm,
        MessageList
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
        height: 80px;
    }

    &__messages {
        height: calc(100% - 80px);
        overflow-y: auto;
    }
}
</style>
