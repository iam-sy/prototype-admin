<template>
    <div class="search">
        <input
            ref="search"
            type="text"
            :value="value"
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
export default {
    props: {
        id: {
            type: String,
            default: 'search',
        },
        value: {
            type: String,
        },
        placeholder: {
            type: String,
            default: 'search',
        },
        title: {
            type: String,
            default: 'search',
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
};
</script>

<style scoped lang="scss">
.search {
    display: inline-block;
    position: relative;
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
