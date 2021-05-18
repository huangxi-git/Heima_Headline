<template>
  <div class="search">
    <!-- 头部搜索框 -->
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model="userKey"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <div @click="onSearch">搜索</div>
    </div>
    <!-- 历史记录 -->
    <div class="historyList">
      <h2>历史记录</h2>
      <p
        @click="searchByHistory(value)"
        v-for="value in historyList"
        :key="value"
      >
        {{ value }}
      </p>
    </div>
    <!-- 搜索结果 -->
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link
        :to="{ path: `/postDetail/${value.id}` }"
        v-for="value in searchList"
        :key="value.id"
      >
        {{ value.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { searchPost } from "../apis/post";

export default {
  data() {
    return {
      // 输入框
      userKey: "",
      //   搜索结果
      searchList: [],
      //   历史记录
      historyList: [],
    };
  },
  mounted() {
    //   如果有本地存储就获取数据，没有就进行初始化
    this.historyList =
      JSON.parse(localStorage.getItem("searchHistoryList")) || [];
    // console.log(this.historyList);
  },
  methods: {
    //   点击搜索按钮
    async onSearch() {
      // 发送请求
      let res = await searchPost(this.userKey);
      //   console.log(res);
      this.searchList = res.data.data;
      //   console.log(this.searchList);

      //   历史记录
      let index = this.historyList.indexOf(this.userKey);
      //   判断数组是否有该关键字
      if (index !== -1) {
        //   有就先删除该关键字
        this.historyList.splice(index, 1);
      }

      //   没有就存储到本地
      this.historyList.unshift(this.userKey);
      localStorage.setItem(
        "searchHistoryList",
        JSON.stringify(this.historyList)
      );
    },
    // 点击搜索记录
    searchByHistory(value) {
      // 赋值给输入框
      this.userKey = value;
      this.onSearch();
    },
  },
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
  }
}
</style>