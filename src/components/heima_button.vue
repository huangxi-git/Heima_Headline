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
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    // 点击登录按钮
    handlerClick(e) {
      // console.log(33333);
      // 传给父组件
      this.$emit("click", e);
    },
  },
  props: {
    type: {
      type: String,
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