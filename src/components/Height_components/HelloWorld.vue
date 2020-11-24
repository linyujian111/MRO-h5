<!--
 * @Description: Description
 * @Author: xwq
 * @Date: 2020-03-27 14:07:37
 -->
 <template>
  <div class="page">
    <p>Hello world</p>
    <p>测试组件</p>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    init() {
      this.$toast("Hello World");
    }
  }
};
</script>
