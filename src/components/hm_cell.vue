<template>
  <div class="hmcell">
    <div class="left">{{ title }}</div>
    <div class="right">
      <span>{{ desc }}</span>
      <van-icon name="arrow" class="jiantou" />
    </div>
  </div>
</template>

<script>
export default {
  // 接收父组件数据
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.hmcell {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  border-bottom: 1px solid rgb(194, 192, 192);
  .right {
    font-size: 14px;
    color: #888;
    .jiantou {
      vertical-align: middle;
    }
  }
}
</style>