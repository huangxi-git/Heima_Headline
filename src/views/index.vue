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
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- tab标签页
    1.数量超过5个，标签项才能左右滚动--滑动
    2.sticky：实现吸顶效果
    3.swipeable：滑动内容，实现标签项的切换 
    4.active：默认显示的页 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="value.name" v-for="value in cateList" :key="value.id">
        <!-- 使用子组件并传值 -->
        <hmPostBlock
          v-for="item in value.postlist"
          :key="item.id"
          :post="item"
        ></hmPostBlock
      ></van-tab>
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
    // 获取栏目
    let res = await getCateList();
    // console.log(res.data);
    this.cateList = res.data.data;
    this.$toast("栏目渲染成功");
    // 获取栏目被激活的数据 -- 页面加载
    this.getPost();

    // 数据改造 -- 重点
    this.cateList = this.cateList.map((v) => {
      return { ...v, postlist: [] };
    });
    // console.log(this.cateList);
  },
  // 监听
  watch: {
    // active 变化就监听
    async active() {
      // 索引
      // console.log(this.active);

      // 数据改造
      if (this.cateList[this.active].postlist.length == 0) {
        this.getPost();
      }
    },
  },
  methods: {
    // 封装函数
    async getPost() {
      // 每个栏目对应的id
      let id = this.cateList[this.active].id;
      // console.log(id);

      // 数据改造 -- 将数据存储在当前栏目对象的postlist数组中
      this.cateList[this.active].postlist = (await getPostList(id)).data.data;
      // console.log(this.postlist);
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
</style>