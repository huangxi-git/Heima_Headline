<template>
  <div class="myStar">
    <!-- 头部 -->
    <hmHeader title="个人编辑">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon
          name="wap-home"
          class="wap-home"
          @click="$router.push({ path: '/index' })"
        />
      </template>
    </hmHeader>
    <!-- 列表 -->

    <van-swipe-cell v-for="value in starList" :key="value.id">
      <hmPostBlock :post="value"></hmPostBlock>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="dele"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
// 引入 头部 组件
import hmHeader from "../../components/hm_header";
import hmPostBlock from "../../components/hm_postBlock";
import { getUserStar } from "../../apis/user";

export default {
  methods: {
    dele() {
      console.log(558888);
    },
  },
  components: {
    hmHeader,
    hmPostBlock,
  },
  data() {
    return {
      // 保存已收藏文章
      starList: [],
    };
  },

  async mounted() {
    // 发送请求渲染列表
    let res = await getUserStar();
    // console.log(res);
    this.starList = res.data.data;
    // console.log(this.starList);
  },
};
</script>

<style>
</style>