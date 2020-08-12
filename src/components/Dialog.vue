<template>
    <div class="dialog">
        <Loader size="100" style="margin: auto" v-if="!dialog" />
        <template v-else>
            <div class="dialog__messages"></div>
            <form @submit.prevent="sendMsg" class="dialog__form">
                <div class="dialog__input-wrapper">
                    <Textarea
                        class="dialog__input"
                        placeholder="Введите текст..."
                        v-model="form.text"
                    ></Textarea>
                </div>
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
        },
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
        Textarea:() => import('./Textarea.vue')
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
    &__input-wrapper {
        flex: 1;
    }

    &__input-wrapper {
        padding-left: 33px;
    }

    &__btn, &__input {
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
