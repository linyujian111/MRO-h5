<!--
 * @Description: $listeners  $attrr测试
 * @Author: xwq
 * @Date: 2019-09-07 10:46:50
 * @LastEditTime: 2019-09-07 17:37:53
 -->
<template>
    <div class="page">
        <div>test组件的$attrs数据:{{$attrs}}</div>
        <checkComponentb :info="$attrs" v-on="$listeners" />
    </div>
</template>
<script>
import checkComponentb from "./b";
export default {
    components: {
        checkComponentb
    },
    props: ["c"],
    data() {
        return {};
    },
    inheritAttrs: false,
    created() {},
    mounted() {},
    methods: {}
};
</script>
<style lang="less" scoped>
.page {
    margin-top: 50px;
}
</style>