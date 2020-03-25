import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
const Plugin = {
    install(Vue, options = {}) {
        Vue.component('ValidationProvider', ValidationProvider);
        Vue.component('ValidationObserver', ValidationObserver);
        extend('email', email);
        extend('required', {
            ...required,
            message: '필수 입력 항목입니다.',
        });
        extend('password', {
            message: field =>
                `Password는 숫자와 특수기호(@$!%*#)를 포함한 8자 이상으로 입력하세요.`,
            validate: value => {
                return /^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$@$!%*#]).*$/.test(
                    value,
                );
            },
        });
        extend('minmax', {
            validate(value, { min, max }) {
                return value.length >= min && value.length <= max;
            },
            params: ['min', 'max'],
        });
    },
};

export default Plugin;
