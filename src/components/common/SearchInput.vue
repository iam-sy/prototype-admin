<template>
    <div class="search">
        <input
            :name="name"
            ref="search"
            type="text"
            autocomplete="off"
            :id="id"
            :placeholder="placeholder"
            :title="title"
            @keydown.enter="searchSubmit"
        />
        <button :type="buttonType" @click="searchSubmit">
            <span class="screen-out">검색</span>
        </button>
    </div>
</template>

<script>
import * as blog from '@/store/modules/blog/type';
import { createNamespacedHelpers } from 'vuex';
const blogStore = createNamespacedHelpers(`${blog.NAMESPACE}`);
export default {
    props: {
        id: {
            type: String,
            default: 'search',
        },
        placeholder: {
            type: String,
            default: 'search',
        },
        title: {
            type: String,
            default: 'search',
        },
        name: {
            type: String,
        },
        buttonType: {
            type: String,
            default: 'submit',
        },
    },
    methods: {
        searchSubmit() {
            const val = this.$refs.search.value;
            this.$emit('search', val);
            this.$refs.search.value = '';
        },
    },
    computed: {
        ...blogStore.mapState({
            value: state => state.config[this.name],
        }),
    },
};
</script>

<style scoped lang="scss">
.search {
    display: inline-block;
    position: relative;

    @include breakpoint($point: mobile-l) {
        display: block;
    }
    label {
        font-family: 'Noto Sans KR';
        font-weight: 500;
        color: $color1;
        margin-right: 10px;
    }
    input {
        width: 180px;
        height: 30px;
        background-color: #fff;
        border: 1px solid transparentize(#000, 0.8);
        border-radius: 15px;
        padding: 0 30px 0 10px;

        @include breakpoint($point: mobile-l) {
            width: 100%;
        }
    }
    button {
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        height: 30px;
        background: {
            image: url('~@/assets/ico-search.svg');
            repeat: no-repeat;
            color: transparent;
            position: 30% 50%;
        }
        border: none;
    }
}
</style>
