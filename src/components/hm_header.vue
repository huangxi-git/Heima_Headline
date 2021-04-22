<template>
  <div class="header">
    <div class="left">
      <slot name="left">左</slot>
    </div>
    <div class="center">{{ title }}</div>
    <div class="right">
      <slot name="right">右</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "myheader",
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}
</style>