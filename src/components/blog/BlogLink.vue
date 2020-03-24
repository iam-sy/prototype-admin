<template>
    <div class="linkpost">
        <dl>
            <dt>이전글</dt>
            <dd>
                <router-link
                    v-if="prev"
                    :to="{
                        name: 'blogview',
                        params: { key: prev._id, id: prev._id },
                    }"
                >
                    <span>{{ prev.title }}</span>
                </router-link>
                <span v-else>이전글이 없습니다.</span>
            </dd>
        </dl>
        <dl>
            <dt>다음글</dt>
            <dd>
                <router-link
                    v-if="next"
                    :to="{
                        name: 'blogview',
                        params: { key: next._id, id: next._id },
                    }"
                >
                    <span>{{ next.title }}</span>
                </router-link>
                <span v-else>다음글이 없습니다.</span>
            </dd>
        </dl>
    </div>
</template>

<script>
/*<button
    type="button"
    v-if="next"
    @click.prevent="linkPost(next._id)"
            >
            <span>{{ next.title }}</span>
    </button>*/
export default {
    name: 'linkpost',
    props: ['next', 'prev'],
    methods: {
        linkPost(val) {
            this.$emit('update', val);
        },
    },
};
</script>

<style scoped lang="scss">
.linkpost {
    position: fixed;
    dl {
        &:not(:first-child) {
            padding-top: 30px;
        }
        dt,
        dd {
        }
        dt {
            font-weight: 500;
            color: $color1;
        }
        dd {
            color: $color6;
            padding-top: 10px;
        }
        button {
            background: transparent;
            border: none;
            padding: 0;
        }
    }
}
</style>
