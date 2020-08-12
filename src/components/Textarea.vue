<template>
    <div
        class="textarea"
        ref="wrapper"
        :style="{ 'padding-top': paddingTop + 'px' }"
        @click="changeFocus"
    >
        <div
            class="textarea__input"
            :contenteditable="!$attrs.disabled"
            @input="input"
            ref="inputControl"
        ></div>
        <div class="textarea__placeholder" v-show="!value">
            {{ placeholder }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Textarea',
    props: {
        placeholder: {
            type: [String, Number],
            default: ''
        },
        value: {
            type: [String, Number],
            default: ''
        }
    },
    data: () => ({
        paddingTop: 0
    }),
    methods: {
        input() {
            const text = this.$refs.inputControl.innerText;
            this.$emit('input', text.replace(/^\n$/, ''));
            this.calcPadding();
        },
        changeFocus() {
            if (!this.$attrs.disabled) {
                this.$refs.inputControl.focus();
            }
        },
        calcPadding() {
            const wrapperHeight = +(this.$refs.wrapper || {}).offsetHeight || 0;
            const inputControlHeight =
                +(this.$refs.inputControl || {}).offsetHeight || 0;

            this.paddingTop = Math.max(
                wrapperHeight / 2 - inputControlHeight / 2,
                0
            );
        },
        setText(text = '') {
            this.$refs.inputControl.innerText = text;
            this.calcPadding();
        }
    },
    watch: {
        value() {
            if (this.$refs.inputControl.innerText !== this.value) {
                this.$refs.inputControl.innerText = this.value;
            }
        }
    },
    mounted() {
        this.setText(this.value);
    }
};
</script>

<style lang="scss" scoped>
.textarea {
    height: 100%;
    overflow-y: auto;
    cursor: pointer;

    &[disabled] {
        background-color: #d6d6d6;
        cursor: not-allowed;
    }

    &,
    &__input {
        z-index: 10;
        position: relative;
    }

    &__input {
        width: 100%;
        border: none;
        outline: 0;

        &::before {
            position: absolute;
            height: 100%;
            width: 100%;
        }
    }

    &__placeholder {
        position: absolute;
        z-index: -1;
        top: 50%;
        transform: translateY(-50%);
        color: #7d8790;
    }
}
</style>
