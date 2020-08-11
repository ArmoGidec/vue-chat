<template>
    <div class="lds-ring" :style="style">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    props: {
        size: {
            type: [Number, String],
            default: 32
        },
        width: {
            type: [Number, String],
            default: 4
        },
        color: {
            type: String,
            default: 'rgb(40, 115, 255)'
        }
    },
    computed: {
        style() {
            return {
                '--size': this.size + 'px',
                '--width': this.width + 'px',
                '--color': this.color
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.lds-ring {
    position: relative;
    width: var(--size);
    height: var(--size);

    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        margin: 8px;
        width: calc(100% - 16px);
        height: calc(100% - 16px);
        border: var(--width) solid var(--color);
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: var(--color) transparent transparent transparent;
    }

    @for $i from 1 through 3 {
        div:nth-child(#{$i}) {
            animation-delay: #{- (0.6 - $i * 0.15)}s;
        }
    }
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
