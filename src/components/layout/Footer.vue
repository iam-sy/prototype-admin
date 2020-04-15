<template>
    <div class="footer">
        <div class="footer__content">
            <div class="footer__info">
                <div class="footer__logo">
                    <img src="@/assets/logo.svg" alt="" />
                </div>
                <p class="footer__copy">© 2020 · moon</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.footer {
    z-index: -1;
    user-select: none;
    width: 100%;
    text-align: right;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-position-x: right;
    background-position-y: top;
    background-repeat: no-repeat;
    position: relative;
    opacity: 0.5;

    &__content {
        vertical-align: bottom;
        display: block;
        max-width: 1740px;
        padding: 20px 0;
        margin: 0 auto;
        @include breakpoint($point: tablet) {
            max-width: none;
            display: table;
            width: 100%;
            text-align: center;
            padding: 20px 30px;
        }
    }
    &__info {
        display: inline-block;
        text-align: center;
    }
    &__logo {
        display: inline-block;
        text-align: center;
    }
    &__copy {
        text-align: center;
        padding-top: 10px;
        font-family: 'Noto Sans KR';
    }
}
</style>
