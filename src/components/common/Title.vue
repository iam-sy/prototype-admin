<template>
    <div class="section-title">{{ tit }}</div>
</template>

<script>
export default {
    props: {
        tit: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped lang="scss">
.section-title {
    font-size: 40px;
    color: $color1;
    font-weight: 500;
}
</style>
