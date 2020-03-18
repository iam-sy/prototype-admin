<template>
    <div class="tag-input">
        <div class="tag-input__input">
            <input
                autocomplete="off"
                @keydown.prevent.13.188="addTag"
                type="text"
                name="inp__tags"
                id="inp__tags"
                title="태그 입력"
                placeholder="태그를 입력하세요 쉼표(,) 혹은 엔터키를 누르시면 추가됩니다."
            />
        </div>
        <div class="tag-input__tag" v-if="tags.length > 0">
            <button
                @click="delTag(index)"
                type="button"
                v-for="(tag, index) in tags"
                :key="index"
            >
                <span>{{ tag }}</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['tags'],
    methods: {
        addTag(evt) {
            const val = evt.target.value;
            // [todo] 대소문자 구분 않하게 처리
            if (this.tags.indexOf(val) === -1 && val.replace(/ /g, '') !== '') {
                this.tags.push(val);
            }
            evt.target.value = '';
        },
        delTag(idx) {
            this.tags.splice(idx, 1);
        },
    },
};
</script>

<style scoped lang="scss">
.tag-input {
    padding: 20px 0;
    &__input {
        input {
            @include input($fz: 16px);
        }
    }
    &__tag {
        display: table;
        font-size: 0;
        button {
            @include tagButton();
        }
    }
}
</style>
