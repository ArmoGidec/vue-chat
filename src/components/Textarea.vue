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
        <div
            class="textarea__placeholder"
            :placeholder="placeholder"
            v-show="!_value"
        ></div>
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
            this._value = this.$refs.inputControl.innerText;
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
    computed: {
        _value: {
            get() {
                return this.value;
            },
            set(val) {
                this.calcPadding()
                this.$emit('change', val);
            }
        },
    },
    mounted() {
        this.$refs.inputControl.innerText = this.value;
        this._value = this.value;
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
        &::before {
            content: attr(placeholder);
        }
    }
}
</style>
