<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <input
          placeholder="请输入手机号"
          class="input"
          v-model="user.username"
        />
        <input
          placeholder="密码"
          class="input"
          type="password"
          v-model="user.password"
        />
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <!-- 接收子组件 -->
      <hm_button @click="login" type="success">登录</hm_button>
    </div>
  </div>
</template>

<script>
// 引入 组件
import hm_button from "../../components/heima_button";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  // 注册组件
  components: {
    hm_button,
  },
  methods: {
    // 子组件传 e 过来
    login(e) {
      console.log(44444, e);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
.tips {
  text-align: right;
  margin-bottom: 20px;
  a {
    color: #3385ff;
  }
}
</style>