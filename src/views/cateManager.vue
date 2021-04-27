<template>
  <div class="cateManager">
    <!-- 头部 -->
    <hmHeader title="栏目管理">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #right> </template>
    </hmHeader>
    <div class="delCate">
      <h3>点击删除频道：</h3>
      <div class="list">
        <span
          v-for="value in cateList"
          :key="value.id"
          @click="removeCateList(value)"
          >{{ value.name }}</span
        >
      </div>
    </div>
    <div class="addCate">
      <h3>点击添加频道：</h3>
      <div class="list">
        <span
          v-for="item in unAddCateList"
          :key="item.id"
          @click="addCateList(item)"
          >{{ item.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import hmHeader from "../components/hm_header";
import { getCateList } from "../apis/category";

export default {
  components: {
    hmHeader,
  },
  data() {
    return {
      // 已添加栏目
      cateList: [],
      // 未添加栏目
      unAddCateList: [],
    };
  },
  async mounted() {
    // 先读取本地数据
    this.cateList = JSON.parse(
      localStorage.getItem("heimatoutiao_removeCate") || "[]"
    );
    // 判断有没有本地存储
    if (this.cateList.length == 0) {
      let res = await getCateList();
      // console.log(res);
      this.cateList = res.data.data;
      // // 判断是否有登录
      if (localStorage.getItem("heimatoutiao_loginToken")) {
        this.cateList.splice(0, 2);
      } else {
        this.cateList.splice(0, 1);
      }
    }
    // 先读取本地数据
    this.unAddCateList = JSON.parse(
      localStorage.getItem("heimatoutiao_addCate") || "[]"
    );
  },

  methods: {
    // 点击删除
    async removeCateList(value) {
      // console.log(value);
      // 将点击删除的栏目添加到 unAddCateList
      this.unAddCateList.push(value);
      // 移除当前点击的栏目 -- 移到下面
      this.cateList = this.cateList.filter((v) => {
        // console.log(v);
        return v.id != value.id;
      });

      // 将两个数组存储到本地存储,本地存储只能存储字符串
      localStorage.setItem(
        "heimatoutiao_removeCate",
        JSON.stringify(this.cateList)
      );
      localStorage.setItem(
        "heimatoutiao_addCate",
        JSON.stringify(this.unAddCateList)
      );
    },
    // 点击添加
    async addCateList(value) {
      // console.log(value);
      // 将点击添加的栏目添加到 cateList
      this.cateList.push(value);
      // 移除当前点击的栏目 -- 移到上面
      this.unAddCateList = this.unAddCateList.filter((v) => {
        // console.log(v);
        return v.id != value.id;
      });

      // 将两个数组存储到本地存储,本地存储只能存储字符串
      localStorage.setItem(
        "heimatoutiao_removeCate",
        JSON.stringify(this.cateList)
      );
      localStorage.setItem(
        "heimatoutiao_addCate",
        JSON.stringify(this.unAddCateList)
      );
    },
  },
};
</script>

<style lang="less" scoped>
.cateManager {
  .delCate,
  .addCate {
    h3 {
      font-weight: 700;
      font-size: 20px;
      margin: 20px 0;
    }
    .list {
      display: flex;
      // flex: 1;
      flex-wrap: wrap;
      justify-content: space-evenly;
      span {
        margin: 10px 5px;
        width: 20%;
        border: 1px solid rgb(22, 21, 21);
        padding: 10px 10px;
        border-radius: 07px;
        text-align: center;
      }
    }
  }
}
</style>