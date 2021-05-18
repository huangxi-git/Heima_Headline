<template>
  <div class="personal">
    <!-- 头部 -->
    <hmHeader title="个人中心">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #right> </template>
    </hmHeader>
    <!-- 主要内容 -->
    <router-link :to="'/edit_profile/' + id">
      <div class="profile">
        <img :src="userInfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="
                (userInfo.gender = 1 ? 'iconxingbienan' : 'iconxingbienv')
              "
            ></span
            >{{ userInfo.nickname }}
          </div>
          <div class="time">{{ hm_time }}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <hm_cell
      desc="关注的用户"
      title="我的关注"
      @click.native="$router.push({ path: '/myfollow' })"
    ></hm_cell>
    <hm_cell desc="跟帖/回复" title="我的跟帖"></hm_cell>
    <hm_cell
      desc="文章/视频"
      title="我的收藏"
      @click.native="$router.push({ path: '/myStar' })"
    ></hm_cell>
    <hm_cell desc="" title="设置"></hm_cell>
    <hm_button type="danger" style="margin: 20px auto" @click="exitLogin"
      >退出</hm_button
    >
  </div>
</template>

<script>
// 引入子组件
import hm_cell from "../../components/hm_cell";
import hm_button from "../../components/heima_button";
// 引入 请求
import { getUserDetail } from "../../apis/user";
// 引入 axios
import axios from "../../utils/request";
import hmHeader from "../../components/hm_header";

export default {
  // 事件处理函数
  methods: {
    // 点击退出登录
    exitLogin() {
      this.$toast("你将退出登录");
      // 移除token
      localStorage.removeItem("heimatoutiao_loginToken");
      // 跳转页面
      this.$router.push({ path: "/index" });
    },
  },
  // 注册组件
  components: {
    hm_cell,
    hm_button,
    hmHeader,
  },
  // 钩子函数
  mounted() {
    this.id = this.$route.params.id;
    // 通过 id 获取用户数据
    // console.log(this.$route.params.id);
    getUserDetail(this.$route.params.id)
      .then((res) => {
        // console.log(res);
        if (res.data.message == "获取成功") {
          // 赋值
          this.userInfo = res.data.data;
          // 判断是否有头像
          if (this.userInfo.head_img == "") {
            // console.log("没有头像");
            // 默认头像
            this.userInfo.head_img =
              axios.defaults.baseURL + "/uploads/image/IMG1615568799137.jpeg";
          } else {
            // console.log("有头像");
            this.userInfo.head_img =
              axios.defaults.baseURL + this.userInfo.head_img;
          }
          // 添加时间
          let date = new Date();
          let y = date.getFullYear();
          let m = date.getMonth();
          let d = date.getDate();
          // console.log(y, m, d);
          this.hm_time = `${y}-${m}-${d}`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      userInfo: {},
      // 时间
      hm_time: "",
      id: "",
    };
  },
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>