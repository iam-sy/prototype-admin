<template>
    <div class="paging">
        <button
            type="button"
            class="paging__button paging__button--prev"
            @click.prevent="prevChangeGroup"
            :disabled="startPage === 1"
        >
            <span>이전</span>
        </button>
        <button
            type="button"
            class="paging__button"
            v-for="page in pages"
            :key="page.index"
            :class="[
                'paging__button',
                currentPage === page.number ? 'is-active' : '',
            ]"
            @click.prevent="changePage(page.number)"
        >
            <span>{{ page.number }}</span>
        </button>
        <button
            type="button"
            class="paging__button paging__button--next"
            @click.prevent="nextChangeGroup"
            :disabled="currentPage === totalPage || totalPage <= endPage"
        >
            <span>다음</span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        perPage: Number,
        totalPage: Number,
        currentPage: Number,
        startPage: Number,
        endPage: Number,
    },
    methods: {
        changePage(n) {
            this.$emit('paging', n);
        },
        nextChangeGroup() {
            this.$emit('groupChange', 'next');
        },
        prevChangeGroup() {
            this.$emit('groupChange', 'prev');
        },
    },
    computed: {
        pages() {
            let items = {};
            for (let i = 0; i < this.perPage; i++) {
                let page = {};
                page.index = i;
                page.number = this.startPage + i;
                items[i] = page;
                if (page.number >= this.totalPage) break;
            }
            console.dir(items);
            return items;
        },
    },
};
</script>

<style scoped lang="scss">
.paging {
    padding-top: 30px;
    display: table;
    width: 100%;
    font-size: 0;
    text-align: center;
    button {
        position: relative;
        height: 28px;
        vertical-align: top;
        display: inline-block;
        background: #fff;
        border: 1px solid $color4;

        &:focus {
            z-index: 1;
        }

        &.is-active {
            color: $color8;
        }
        span {
            display: block;
        }

        &:not(:first-child) {
            margin-left: -1px;
        }
    }
    &__button {
        span {
            padding: 5px;
        }
        &--prev,
        &--next {
            overflow: hidden;
            span {
                width: 10px;
                height: 10px;
                padding: 0;
                border: {
                    width: 2px 2px 0 0;
                    style: solid;
                    color: $color7;
                }
                font-size: 0;
                line-height: 0;
            }
        }
        &--prev {
            span {
                margin-left: 4px;
                transform: rotate(-135deg);
            }
        }
        &--next {
            span {
                margin-right: 4px;
                transform: rotate(45deg);
            }
        }
    }
}
</style>
