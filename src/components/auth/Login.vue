<template>
    <div class="login">
        <h2>
            <span v-if="isLogin">로그인</span>
            <span v-else>회원가입</span>
        </h2>
        <div class="login__local">
            <ValidationObserver ref="form">
                <form @submit.prevent="onSubmit">
                    <div class="login__id">
                        <ValidationProvider
                            rules="required|email"
                            v-slot="{ errors, failedRules }"
                            tag="div"
                            mode="eager"
                        >
                            <label for="login__id">Email</label>
                            <input
                                v-model="id"
                                ref="id"
                                type="text"
                                id="login__id"
                                name="login__id"
                                placeholder="이메일을 입력하세요"
                                autocomplete="off"
                            />
                            <p class="is-error" v-if="failedRules.email">
                                Email 주소에 @를 포함시켜 주세요.
                            </p>
                            <p class="is-error" v-if="failedRules.required">
                                Email을 입력하세요.
                            </p>
                        </ValidationProvider>
                    </div>
                    <div class="login__pw">
                        <ValidationProvider
                            rules="required|password"
                            v-slot="{ errors, failedRules }"
                            tag="div"
                            mode="eager"
                        >
                            <label for="login__pw">Password</label>
                            <input
                                v-model="pw"
                                ref="pw"
                                type="password"
                                id="login__pw"
                                name="login__pw"
                                placeholder="비밀번호를 입력하세요"
                                autocomplete="off"
                            />
                            <p class="is-error" v-if="failedRules.password">
                                {{ errors[0] }}
                            </p>
                            <p class="is-error" v-if="failedRules.required">
                                Password를 입력해주세요
                            </p>
                        </ValidationProvider>
                    </div>
                    <div class="login__name" v-if="!isLogin">
                        <ValidationProvider
                            rules="required|minmax:3,8"
                            v-slot="{ errors, failedRules }"
                            tag="div"
                            mode="eager"
                        >
                            <label for="login__name">Nickname</label>
                            <input
                                v-model="name"
                                ref="name"
                                type="text"
                                id="login__name"
                                name="login__name"
                                placeholder="별칭을 입력하세요"
                                autocomplete="off"
                            />
                            <p class="is-error" v-if="failedRules.minmax">
                                Nickname은 최소3자에서 최대8자로 입력하세요
                            </p>
                            <p class="is-error" v-if="failedRules.required">
                                Nickname을 입력해주세요
                            </p>
                        </ValidationProvider>
                    </div>
                    <button type="submit" class="login__cta login__cta--login">
                        <span v-if="isLogin">로그인</span>
                        <span v-else>회원가입</span>
                    </button>
                </form>
            </ValidationObserver>
        </div>
        <!--<div class="login__socal">
            <button type="button" class="login__cta login__cta&#45;&#45;google">
                <span>구글로그인</span>
            </button>
        </div>-->
    </div>
</template>

<script>
export default {
    data() {
        return {
            mode: 'login',
            id: '',
            pw: '',
            name: '',
            error: {
                id: [],
            },
        };
    },
    watch: {
        id(val) {},
        pw(val) {},
    },
    computed: {
        isLogin() {
            return this.mode === 'login';
        },
    },
    methods: {
        resetForm() {
            this.id = '';
            this.pw = '';
            if (!this.isLogin) {
                this.name = '';
            }
        },
        onSubmit() {
            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                }
                console.log('success');
                this.resetForm();
            });
        },
        changMode() {
            if (this.mode === 'login') {
                this.mode = 'register';
            } else if (this.mode === 'register') {
                this.mode = 'login';
            }
            this.resetForm();

            this.$nextTick(() => {
                this.$refs.form.reset();
            });
        },
    },
};
</script>

<style scoped lang="scss">
.login {
    padding: 24px;
    max-width: 350px;
    margin: 0 auto;
    border: 1px solid #ececec;
    border-radius: 3px;
    background-color: #fff;

    h2 {
        font-size: 20px;
        display: block;
        color: #111;
        text-align: center;
        border-bottom: 1px solid #efefef;
        padding-bottom: 20px;
    }

    label {
        display: block;
        text-align: left;
        font-size: 14px;
        color: #3d3d3d;
        margin-bottom: 10px;
        font-weight: 500;
    }
    input {
        padding: 0 10px;
        width: 100%;
        height: 34px;
        border: 1px solid #e4e4e4;
        border-radius: 2px;
        font-size: 14px;
        &::placeholder {
            color: #999;
            font-size: 12px;
            letter-spacing: -1;
            font-weight: 700;
        }
    }
    &__cta {
        width: 100%;
        display: block;
        text-align: center;
        padding: 12px 0;
        font-weight: 700;
        font-size: 14px;

        &--login {
            border: none;
            color: #ffffff;
            background-color: #12b886;
        }
        &--google {
            color: #3d3d3d;
            border: 1px solid #ececec;
            background-color: #f9f9f9;
        }
    }
    &__local {
        padding-top: 20px;
    }
    &__utils {
        text-align: center;
        padding-top: 10px;
    }
    &__textcta {
        height: 14px;
        display: inline-block;
        background: none;
        border: none;
        font-size: 12px;
        padding: 0 5px;
        text-decoration: underline;
    }
    &__socal {
        padding-top: 20px;
        border-top: 1px dashed #ececec;
    }
    &__id,
    &__pw,
    &__name {
        padding-bottom: 15px;
    }
    .is-error {
        line-height: 1.5;
        padding-top: 8px;
        font-size: 12px;
        color: #da3620;
    }
}
</style>
