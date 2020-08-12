<template>
    <div
        class="textarea"
        ref="wrapper"
        :style="{ 'padding-top': paddingTop + 'px' }"
        @click="changeFocus"
    >
        <div
            class="textarea__input"
            contenteditable="true"
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
            this.$emit('input', this.$refs.inputControl.innerText);
            this.calcPadding();
        },
        changeFocus() {
            this.$refs.inputControl.focus();
        },
        calcPadding() {
            const wrapperHeight = +(this.$refs.wrapper || {}).offsetHeight || 0;
            const inputControlHeight =
                +(this.$refs.inputControl || {}).offsetHeight || 0;

            this.paddingTop = Math.max(
                wrapperHeight / 2 - inputControlHeight / 2,
                0
            );
        }
    },
    mounted() {
        this.$refs.inputControl.innerText = this.value;
        this.calcPadding();
    }
};
</script>

<style lang="scss" scoped>
.textarea {
    height: 100%;
    overflow-y: auto;
    cursor: pointer;

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
