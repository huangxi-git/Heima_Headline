<template>
  <div class="commentItem">
    <!-- 组件递归 -->
    <hmCommentItm
      v-if="parentItem.parent"
      :parentItem="parentItem.parent"
      @replayChild="handlerReplay(parentItem)"
    ></hmCommentItm>
    <!-- 内容 -->
    <div class="top">
      <div class="left">
        <img :src="axios.defaults.baseURL + parentItem.user.head_img" alt />
        <span>{{ parentItem.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <!-- <span>2分钟前</span> -->
      </div>
      <span @click="handlerReplay(parentItem)">回复</span>
    </div>
    <div class="bottom">{{ parentItem.content }}</div>
  </div>
</template>

<script>
import axios from "../utils/request";

export default {
  // 组件递归 -- 必须要有 name
  name: "hmCommentItm",
  data() {
    return {
      axios,
    };
  },
  // 接收父组件数据
  props: {
    parentItem: {
      type: Object,
    },
  },
  methods: {
    // 点击回复
    handlerReplay(value) {
      // console.log(value);
      this.$emit("replayChild", value);
    },
  },
};
</script>

<style lang="less" scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  border: 1px solid #999;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>