<template>
    <div class="menu">
        <button
            type="button"
            :class="['menu__button', GET_SEC === 'all' ? 'is-active' : '']"
            value="all"
            @focus="secSelect"
            @click="secSelect"
        >
            <span>.all</span>
        </button>
        <button
            type="button"
            :class="['menu__button', GET_SEC === 'review' ? 'is-active' : '']"
            value="review"
            @click="secSelect"
        >
            <span>.review</span>
        </button>
        <button
            type="button"
            :class="['menu__button', GET_SEC === 'study' ? 'is-active' : '']"
            value="study"
            @click="secSelect"
        >
            <span>.study</span>
        </button>
        <div
            class="menu__line"
            aria-hidden="true"
            ref="line"
            v-show="GET_SEC"
        ></div>
    </div>
</template>

<script>
import * as blog from '@/store/modules/blog/type';

import { createNamespacedHelpers } from 'vuex';
const blogStore = createNamespacedHelpers(`${blog.NAMESPACE}`);
export default {
    porps: ['sec'],
    data() {
        return {
            selectMenu: 'all',
        };
    },
    methods: {
        lineBar($el) {
            const { offsetLeft, clientWidth } = $el;
            const $line = this.$refs.line;
            $line.style.left = `${offsetLeft}px`;
            $line.style.width = `${clientWidth}px`;
        },
        secSelect(e) {
            const $target = e.currentTarget;
            this.lineBar($target);
            this.selectMenu = $target.value;
            this.$emit('secUpdate', this.selectMenu);
        },
    },
    computed: {
        ...blogStore.mapGetters([blog.GET_SEC]),
    },

    mounted() {
        this.$nextTick(function() {
            setTimeout(() => {
                const $el = document.getElementsByClassName('is-active');
                this.lineBar($el[0]);
            }, 200);

            // 모든 화면이 렌더링된 후 실행합니다.
        });
    },
};
</script>

<style scoped lang="scss">
.menu {
    position: relative;
    display: table;
    &__button {
        display: inline-block;
        line-height: 1.5;
        background: none;
        border: none;
        padding: 0;
        span {
            font-size: 16px;
            display: block;
            padding: 0 12px;
            font-weight: 500;
            color: $color1;
            transition: color 0.5s ease-out;
        }
        &.is-active {
            span {
                color: $color8;
            }
        }
    }
    &__line {
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 0;
        height: 2px;
        background-color: $color8;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
}
</style>
