<template>
  <div class="comment">
    <!-- 头部 -->
    <hmHeader title="精彩评论">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #right> </template>
    </hmHeader>
    <!-- 评论列表 -->
    <div class="item" v-for="value in commentList" :key="value.id">
      <div class="head">
        <img :src="axios.defaults.baseURL + value.user.head_img" alt />
        <div>
          <p>{{ value.user.nickname }}</p>
          <!-- <span>时间</span> -->
        </div>
        <span @click="replayComment(value)">回复</span>
      </div>
      <!-- 二级评论 -->
      <hmCommentItem
        v-if="value.parent"
        :parentItem="value.parent"
      ></hmCommentItem>
      <!-- 评论内容 -->
      <div class="text">{{ value.content }}</div>
    </div>
    <!-- 底部块 -->
    <hmComFooter
      :post="article"
      @refresh="refresh"
      :commentObj="temp"
      @cancel="temp = null"
    ></hmComFooter>
  </div>
</template>

<script>
// 组件
import hmHeader from "../components/hm_header";
import hmCommentItem from "../components/commentItem";
import hmComFooter from "../components/hm_commentFooter";
// 请求
import { getPostComment, getPostDetail } from "../apis/post";
// 引入地址
import axios from "../utils/request";

export default {
  components: {
    hmHeader,
    hmCommentItem,
    hmComFooter,
  },
  async mounted() {
    this.init();
  },
  data() {
    return {
      // 保存评论
      commentList: [],
      // 注册
      axios,
      article: {},
      // 保存评论对象 -- 传给子组件
      temp: {},
    };
  },

  methods: {
    // 点击取消按钮 -- 去掉评论对象
    // cancel() {
    //   this.temp = null;
    // },
    // 点击回复按钮
    replayComment(value) {
      // 评论对象
      // console.log(value);
      this.temp = value;
    },
    // 封装函数
    async init() {
      // console.log(this.$route.params.id);
      // 发送请求
      let res = await getPostComment(this.$route.params.id);
      // console.log(res);
      this.commentList = res.data.data;
      // console.log(this.commentList);

      // 获取文章详情数据
      this.article = (await getPostDetail(this.$route.params.id)).data.data;
      // console.log(this.article);
    },
    refresh() {
      this.init();
      // 让列表回到顶部
      window.scrollTo(0, 0);
    },
  },
};
</script>


<style lang="less" scoped>
.comment {
  .item {
    border: 1px solid #999;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>