<template>
  <div class="index">
    <!-- 顶部栏 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" @click="jump" />
      </div>
    </div>
    <!-- tab标签页
    1.数量超过5个，标签项才能左右滚动--滑动
    2.sticky：实现吸顶效果
    3.swipeable：滑动内容，实现标签项的切换 
    4.active：默认显示的页 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="value.name" v-for="value in cateList" :key="value.id">
        <!-- 上拉刷新 -->
        <van-list
          v-model="value.loading"
          :finished="value.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :offset="5"
          :immediate-check="false"
        >
          <!-- 下拉刷新 -->
          <van-pull-refresh
            v-model="value.isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
          >
            <!-- 内容 -->
            <!-- 使用子组件并传值 -->
            <hmPostBlock
              v-for="item in value.postlist"
              :key="item.id"
              :post="item"
            ></hmPostBlock>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 引入 栏目 请求
import { getCateList } from "../apis/category";
import { getPostList } from "../apis/post";
// 引入组件
import hmPostBlock from "../components/hm_postBlock";

export default {
  components: {
    hmPostBlock,
  },
  data() {
    return {
      //
      active: localStorage.getItem("heimatoutiao_loginToken") ? 1 : 0,
      // 栏目
      cateList: [],
      // postlist: [],
    };
  },
  async mounted() {
    // 点击伪元素 ‘ + ’
    document.querySelector(".van-sticky").onclick = (e) => {
      // console.log(e.target.className);
      // 判断是否点击 .van-sticky
      if (e.target.className == "van-sticky") {
        // console.log(true);
        // 跳转页面
        this.$router.push({ path: "/cateManager" }).catch((err) => {
          // console.log(err);
          // console.log(9999999);
        });
      }
    };

    // 首页加载完后，先读取本地的栏目数据
    this.cateList = JSON.parse(
      localStorage.getItem("heimatoutiao_removeCate") || "[]"
    );

    if (this.cateList.length == 0) {
      // 获取栏目
      let res = await getCateList();
      // console.log(res.data);
      this.cateList = res.data.data;
      this.$toast("栏目渲染成功");
    }
    // 本地有存储栏目，需要手动添加 关注、头条
    else {
      // 判断是否登录
      if (localStorage.getItem("heimatoutiao_loginToken")) {
        this.cateList.unshift(
          { id: 0, name: "关注", is_top: 1 },
          { id: 999, name: "头条", is_top: 1 }
        );
      } else {
        this.cateList.unshift({ id: 999, name: "头条", is_top: 1 });
      }
    }

    // 数据改造 -- 重点 -- 为每个栏目加 postlist、pageIndex、pageSize
    this.cateList = this.cateList.map((v) => {
      // console.log(v);
      return {
        ...v,
        postlist: [],
        pageIndex: 1, // 当前栏目的当前页码
        pageSize: 25, // 当前栏目每页显示的数量
        loading: false, // 当前组件的上拉加载状态
        finished: false, // 当前组件的数据是否全部加载完毕的标记
        isLoading: false, // 当前组件下拉刷新
      };
    });

    // 获取栏目被激活的数据 -- 页面加载
    this.getPost();
    // console.log(this.cateList);
  },
  // 监听
  watch: {
    // active 变化就监听
    async active() {
      // 索引
      // console.log(this.active);
      // this.getPost();

      // 数据改造
      if (this.cateList[this.active].postlist.length == 0) {
        this.getPost();
      }
    },
  },
  methods: {
    // 点击个人中心
    jump() {
      // 本地拿到 id
      let bendiId = localStorage.getItem("heimatoutiao_loginId");
      // 判断是有 id
      if (bendiId) {
        this.$router.push({ path: `/personal/${bendiId}` });
      } else {
        // this.$router.push({ path: `/login` });
        window.location.href = "#/login?redirect_url=" + window.location.href;
      }
    },
    // 封装函数
    async getPost() {
      // 每个栏目对应的id
      let id = this.cateList[this.active].id;
      // console.log(id);

      // let res = await getPostList(this.cateList[this.active].id);
      // // console.log(res);
      // this.postlist = res.data.data;

      let current = (
        await getPostList({
          // 传参 -- 对象形式
          category: this.cateList[this.active].id,
          pageSize: this.cateList[this.active].pageSize,
          pageIndex: this.cateList[this.active].pageIndex,
        })
      ).data.data;
      // console.log(current);

      // 数据改造 -- 将数据存储在当前栏目对象的 postlist 数组中
      this.cateList[this.active].postlist.push(...current);

      // 本次请求完成后，将 loading 重置为 false ，以便下次上拉
      this.cateList[this.active].loading = false;

      // 判断数据是否已全部加载完毕：我要求6条数据，结果返回的数量小于6，说明真没有数据了
      if (current.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }

      // 本次请求完成后，将 isloading 重置为 false ，以便下次下拉刷新
      this.cateList[this.active].isLoading = false;
    },

    // 上拉加载下一页数据
    onLoad() {
      // 加载下一页数据，就是将当前栏目的页码 +1 ，然后重新发送请求
      this.cateList[this.active].pageIndex++;
      // setTimeout(() => {
      this.getPost();
      // }, 1000);
    },

    // 下拉刷新
    onRefresh() {
      // 下拉刷新后要做什么
      // 页码回到  1
      this.cateList[this.active].pageIndex = 1;
      // 清空数据
      this.cateList[this.active].postlist.length = 0;
      // 将之前可能重置为true的finished状态重置为false
      this.cateList[this.active].finished = false;
      // 重新获取数据;
      // setTimeout(() => {
      this.getPost();
      // }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    background-color: #f00;
    .logo {
      color: #fff;
      .iconnew {
        font-size: 50px;
      }
    }
    .search {
      flex: 1;
      height: 33px;
      margin-top: 5px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.486);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin: 0px 10px;
    }
    .user {
      color: #fff;
      font-size: 20px;
    }
  }
}
/deep/ .van-sticky {
  padding-right: 44px;
  background-color: rgb(241, 240, 240);
  &::before {
    content: "+";
    position: absolute;
    width: 44px;
    height: 44px;
    line-height: 38px;
    top: 0;
    right: 0;
    font-size: 30px;
    text-align: center;
  }
}
</style>