<template>
    <div class="global-menu">
        <span class="global-menu__no-menu">
            The hardest work is to go idle.
        </span>
        <div class="global-menu__utils" v-if="ISLOGIN">
            <button type="button" @click="logout"><span>LOGOUT</span></button>
        </div>
    </div>
</template>

<script>
import * as auth from '@/store/modules/auth/type';
import { createNamespacedHelpers } from 'vuex';
const authStore = createNamespacedHelpers(`${auth.NAMESPACE}`);
export default {
    methods: {
        ...authStore.mapActions([auth.FETCH_LOGOUT]),
        logout() {
            this[auth.FETCH_LOGOUT]();
            this.$router.push({ name: 'home' });
        },
    },
    computed: {
        ...authStore.mapGetters([auth.ISLOGIN]),
    },
    created() {
        //console.log(this);
        //console.log(authStore);
    },
};
</script>

<style scoped lang="scss">
.global-menu {
    position: relative;
    &__no-menu {
        display: inline-block;
        font-family: 'Noto Sans KR';
        font-weight: 600;
        font-size: 30px;
        letter-spacing: -1px;

        @include breakpoint($point: tablet) {
            display: none;
        }
    }
    &__utils {
        position: absolute;
        top: -30px;
        right: 0;
        transition: top 0.5s ease-out;

        button {
            background: $color1;
            border: none;
            border-radius: 20px;
            span {
                color: #fff;
                display: block;
                padding: 3px 10px;
                font-size: 12px;
            }
        }

        @include breakpoint($point: tablet) {
            top: 0;
            transition: top 0.5s ease-out;
        }
    }
}
</style>
