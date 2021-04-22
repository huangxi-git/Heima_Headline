<template>
  <!-- 和父组件的 v-model 双向绑定 -->
  <input
    type="text"
    class="hminput"
    @input="handlerInput"
    :[pn]="{ success: flag, error: !flag }"
    @blur="handlerBlur"
  />
</template>

<script>
export default {
  props: {
    rules: {
      // 定义数据校验规则
      // 正则表达式
      type: RegExp,
    },
    msg: {
      type: String,
      default: "输入错误",
    },
  },
  data() {
    return {
      flag: "",
      pn: "",
    };
  },
  // 事件处理函数
  methods: {
    // input 事件 -- 输入框一变化就触发的事件
    handlerInput(e) {
      // 拿到输入框的值
      let value = e.target.value;
      // 校验用户输入是否合法
      // 判断是否传递了规则
      if (this.rules) {
        this.pn = "class";
        // 进行用户数据的校验
        if (this.rules.test(value)) {
          // 校验合法
          this.flag = true;
        } else {
          // 校验不合法
          this.flag = false;
          this.$toast.fail(this.msg);
        }
      }
      // 子传父
      this.$emit("input", value);
    },

    // 失焦后处的函数
    handlerBlur(e) {
      // 拿到输入框的值
      let value = e.target.value;
      // 判断是否传递了规则
      if (this.rules) {
        // 进行用户数据校验 -- 校验不通过
        if (!this.rules.test(value)) {
          this.$toast.fail(this.msg);
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.hminput {
  width: 318/360 * 100vw;
  height: 60px;
  outline: none;
  border: none;
  border-bottom: 3px solid #ccc;
  font-size: 20px;
  line-height: 60px;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>