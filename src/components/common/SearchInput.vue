<template>
    <div class="search">
        <form action="?">
            <fieldset>
                <legend class="screen-out">검색</legend>
                <label for="search">search</label>
                <input type="text" id="search" autocomplete="off" />
                <button type="submit">
                    <span class="screen-out">검색</span>
                </button>
            </fieldset>
        </form>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.search {
    position: relative;
    label {
        font-family: 'Noto Sans KR';
        font-weight: 500;
        color: $color1;
        margin-right: 10px;
    }
    input {
        width: 114px;
        height: 30px;
        border: none;
        background-color: $color4;
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
