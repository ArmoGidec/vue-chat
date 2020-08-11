<template>
    <div class="dialog">
        <Loader size="100" style="margin: auto" v-if="!dialog" />
        <template v-else>
            <div class="dialog__messages"></div>
            <form @submit.prevent="sendMsg" class="dialog__form">
                <textarea class="dialog__input">
                    Введите текст
                </textarea>
                <button class="dialog__btn" type="submit" :disabled="sending">
                    <img src="icons/vector.svg" alt="" v-if="!sending" />
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
            text: ''
        },
        sending: false
    }),
    computed: {
        ...mapGetters(['dialog'])
    },
    methods: {
        ...mapActions(['getDialog', 'removeDialog']),
        async sendMsg() {
            this.sending = true;
            await this.getDialog(this.$route.params.dialogId);
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
        Loader: () => import('./Loader.vue')
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
    }

    &__messages,
    &__input {
        flex: 1;
    }

    &__input {
        padding: 13px 33px;
        border: none;
        resize: none;

        &::placeholder {
            color: #7d8790;
        }
    }

    &__btn {
        width: 80px;
        height: 80px;
        background-color: #398bff;
        border: none;
        outline: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        &[disabled] {
            background-color: lighten($color: #398bff, $amount: 20%);
        }
    }
}
</style>
