<template>
    <div class="page-error-404">
        <span>:)</span>
        <span>404 Not found</span>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.page-error-404 {
    text-align: center;
    padding-top: 200px;
    span {
        font-family: 'Noto Sans KR';
        display: block;
        font-size: 100px;
        color: #8087a0;
        &:not(:first-child) {
            padding-top: 80px;
        }
    }
}
</style>
