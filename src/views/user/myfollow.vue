<template>
  <div class="list">
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
    <div class="box" v-for="value in followList" :key="value.id">
      <img :src="value.head_img" alt="" />
      <div class="center">
        <p>{{ value.nickname }}</p>
        <span></span>
      </div>
      <span @click="cancelFollow(value.id, value)">取消关注</span>
    </div>
  </div>
</template>

<script>
// 引入 头部 组件
import hmHeader from "../../components/hm_header";
import { getUserFollow, unFollowUser } from "../../apis/user";
import axios from "../../utils/request";

export default {
  data() {
    return {
      // 关注的用户
      followList: [],
    };
  },
  components: {
    hmHeader,
  },
  async mounted() {
    // 发送请求
    let res = await getUserFollow();
    // 图片路径拼接
    this.followList = res.data.data.map((v) => {
      v.head_img = axios.defaults.baseURL + v.head_img;
      return v;
    });
    // console.log(this.followList);
  },
  methods: {
    // 点击取消关注
    async cancelFollow(id, index) {
      // console.log(id, index);
      // 发送请求
      let res = await unFollowUser(id);
      // console.log(res);
      this.$toast(res.data.message);
      // 在关注用户列表中移除
      this.followList.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>