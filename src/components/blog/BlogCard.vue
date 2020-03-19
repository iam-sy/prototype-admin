<template>
    <router-link to="#lnk">
        <div class="blog-card">
            <div class="blog-card__sumnail">
                <img src="@/assets/@sumnail-genesis.png" alt="" />
            </div>
            <div class="blog-card__title">Genesis Owners</div>
            <div class="blog-card__desc">
                나는 보통 재능이나 공부의 양으로 친구들의 성장 속 도를 따라가기
                힘들었다...
            </div>
            <div class="blog-card__date">2018.11.11</div>
            <div class="blog-card__tags">
                <ul>
                    <li>Project</li>
                    <li>Javascript</li>
                </ul>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.blog-card {
    position: relative;
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(108, 108, 108, 0.07);
    min-height: 414px;
    &__sumnail {
        position: relative;
        min-height: 182px;
        overflow: hidden;
        img {
            position: absolute;
            left: 50%;
            top: 50%;
            min-width: 100%;
            transform: translate(-50%, -50%);
        }
    }
    &__title,
    &__desc,
    &__date,
    &__tags {
        padding: 0 24px;
        font-family: 'Noto Sans KR';
    }
    &__title {
        color: $color1;
        font-size: 20px;
        font-weight: 500;
        padding-top: 26px;
    }

    &__desc {
        padding-top: 8px;
        font-size: 13px;
        line-height: 1.5;
        min-height: 46px;
        color: $color6;
    }
    &__date {
        padding-top: 10px;
        font-family: 'Roboto';
        font-size: 12px;
        color: $color7;
    }
    &__tags {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 37px;
        border-top: 1px solid #f8f8f8;
        ul {
            padding-top: 12px;
            display: table;
            font-size: 0;
            width: 100%;
            height: 100%;
        }
        li {
            display: inline-block;
            vertical-align: middle;
            padding-left: 15px;
            font-family: 'Noto Sans KR';
            font-size: 12px;
            list-style-type: none;
            color: $color3;
            background: {
                image: url('~@/assets/ico-tag.svg');
                repeat: no-repeat;
            }
            &:not(:first-child) {
                margin-left: 10px;
            }
        }
    }
}
</style>
