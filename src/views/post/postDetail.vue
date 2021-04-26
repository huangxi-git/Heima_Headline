<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="followUserById" :class="{ active: post.has_follow }">{{
        post.has_follow == false ? "关注" : "已关注"
      }}</span>
    </div>
    <div class="detail">
      <div class="title">{{ post.title }}</div>
      <div class="desc">
        <span>{{ post.user.nickname }}</span> &nbsp;&nbsp;
        <span>{{ Dates }}</span>
      </div>
      <!-- 显示文章 -->
      <div class="content" v-html="post.content" v-if="post.type == 1"></div>
      <!-- 显示视频 -->
      <!-- http://pic1.win4000.com/wallpaper/2017-11-17/5a0e7021912fc.jpg -->
      <!-- https://wallpaperm.cmcm.com/884126cf69eb8d545955dbd8c6c04d8e.jpg -->
      <video
        :src="post.content"
        poster="http://pic1.win4000.com/wallpaper/2017-11-17/5a0e7021912fc.jpg"
        controls
        v-else
      ></video>
      <div class="opt">
        <span class="like" :class="{ likeClass: post.has_like }">
          <van-icon name="good-job-o" @click="like" />{{
            post.has_like ? post.like_length : "点赞"
          }}
        </span>
        <span class="chat"> <van-icon name="chat" class="w" />微信 </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 底部 -->
    <!-- 传文章 id  -->
    <hmCommentFooter :post="post"></hmCommentFooter>
  </div>
</template>

<script>
// 引入 请求
import { getPostDetail, likePost } from "../../apis/post";
// 引入请求
import { followUser, unFollowUser } from "../../apis/user";
// 引入组件
import hmCommentFooter from "../../components/hm_commentFooter";

export default {
  components: {
    hmCommentFooter,
  },
  data() {
    return {
      // 保存文章数据的对象
      post: {
        user: {},
      },
      // 时间
      Dates: "",
    };
  },
  methods: {
    // 关注和取消关注
    async followUserById() {
      // console.log(6666);
      // 拿到 作者 id
      let userId = this.post.user.id;
      let res;
      // 判断是否已经关注 -- 已关注
      if (this.post.has_follow == true) {
        res = await unFollowUser(userId);
      } else {
        // 未关注
        res = await followUser(userId);
      }
      // console.log(res);
      // console.log(this.post);
      this.$toast(res.data.message);
      // 修改 has_follow 的值
      this.post.has_follow = !this.post.has_follow;
    },

    // 点赞
    async like() {
      // 拿到文章 id
      // 发送请求
      let res = await likePost(this.post.id);
      console.log(this.post);
      console.log(res);

      if (res.data.message == "点赞成功") {
        ++this.post.like_length;
      } else {
        --this.post.like_length;
      }
      // 修改 has_like 的值
      this.post.has_like = !this.post.has_like;
      this.$toast(res.data.message);
    },
  },
  async mounted() {
    // 当前时间
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    // console.log(`${y} - ${m} -${d}`);
    this.Dates = `${y} - ${m} -${d}`;

    // 发送请求
    // console.log(this.$route.params.id);
    let res = await getPostDetail(this.$route.params.id);
    // console.log(res);
    this.post = res.data.data;
    // console.log(this.post);
  },
};
</script>

<style lang="less" scoped>
.articaldetail {
  padding-bottom: 60px;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      background-color: transparent;
      border: 2px solid rgba(0, 0, 0, 0.425);
      color: rgba(0, 0, 0, 0.425);
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    // 深度作用选择器
    /deep/ p {
      text-indent: 2em;
    }
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    // 深度作用选择器
    /deep/ img {
      width: 100%;
    }
  }
  video {
    width: 100%;
    margin-bottom: 10px;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
  .likeClass {
    color: tomato;
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>