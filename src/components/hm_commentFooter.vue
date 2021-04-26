<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @click="isFocus = !isFocus" />
      <span
        class="comment"
        @click="$router.push({ path: `/comment/${post.id}` })"
      >
        <i class="iconfont iconpinglun-"></i>
        <em>{{ post.comment_length }}</em>
      </span>
      <!-- 收藏 -->
      <i
        class="iconfont iconshoucang"
        @click="starThisPost"
        :class="{ active: post.has_star }"
      ></i>
      <!-- 分享 -->
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" v-model.trim="content"></textarea>
      <div>
        <span @click="sendComment">发 送</span>
        <span @click="cancelReplay">取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { starPost, publishComment } from "../apis/post";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    commentObj: {
      type: Object,
      default: null,
    },
  },
  // 监听
  watch: {
    // 有数据传过来 -- 监听变化
    commentObj() {
      if (this.commentObj) {
        this.isFocus = true;
      }
    },
  },
  data() {
    return {
      isFocus: false,
      // 输入框内容
      content: "",
    };
  },
  mounted() {
    // console.log(this.post);
  },
  methods: {
    // 点击取消按钮
    cancelReplay() {
      // console.log(99999);
      // 关闭输入框
      this.isFocus = !this.isFocus;
      // 清空输入框
      this.content = "";
      // 子传父
      this.$emit("cancel");
    },
    // 收藏
    async starThisPost() {
      // console.log(this.post);
      // 发送请求
      let res = await starPost(this.post.id);
      // console.log(res);
      this.$toast(res.data.message);
      this.post.has_star = !this.post.has_star;
    },

    // 发表文章
    async sendComment() {
      if (this.content.length == 0) {
        this.$toast.fail("请输入评论内容");
        return;
      }
      // 请求要传的参数
      let data = {
        content: this.content,
      };
      // 判断是否传入了评论对象
      if (this.commentObj) {
        data.parent_id = this.commentObj.id;
      }
      // 发送请求
      let res = await publishComment(this.post.id, data);
      // console.log(res);
      // 清空输入框
      this.content = "";
      // 关闭输入框
      this.isFocus = false;
      // 给提示
      this.$toast(res.data.message);
      // 页面内容的刷新-子组件要告诉父组件进行列表数据的刷新
      this.$emit("refresh");
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  border-bottom: crimson 1px solid;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  background-color: #fff;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.active {
  color: red;
}
</style>