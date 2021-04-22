<template>
  <div
    class="btn"
    @click="handlerClick"
    :class="{
      success: type == 'success',
      danger: type == 'danger',
      primary: type == 'primary',
    }"
  >
    <!-- 使用匿名插槽方便用户自定义内容 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  // 事件处理函数
  methods: {
    // 点击登录按钮
    handlerClick(e) {
      // console.log(33333);
      // 当用户单击按钮的时候是子组件进行响应的，那么我们需要告诉父组件需要进行单击响应处理：子传父
      // 父组件监听子组件所发出事件的时候，优先以子组件发出的事件为准
      // 传给父组件
      this.$emit("click", e);
    },
  },
  // 接收父组件传的值
  props: {
    // 按钮样式
    type: {
      // 数据类型
      type: String,
      // 必传
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  width: 318 * 100vw/360;
  height: 50px;
  background-color: rgb(124, 124, 123);
  color: rgb(0, 0, 0);
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}
.success {
  background-color: rgb(27, 155, 112);
  color: aliceblue;
}
.danger {
  background-color: rgb(170, 30, 100);
  color: aliceblue;
}
.primary {
  background-color: rgb(34, 60, 146);
  color: aliceblue;
}
</style>