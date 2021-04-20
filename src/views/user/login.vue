<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>

      <!-- 给 子组件的 input 赋值 -->
      <hm_input
        v-model="user.username"
        placeholder="请输入账号"
        :rules="/^1[35789]\d{9}$/"
        msg="请输入11位手机号码"
      ></hm_input>
      <hm_input
        v-model="user.password"
        placeholder="请输入密码"
        :rules="/^.{3,16}$/"
        msg="请输入3~16位的密码"
      ></hm_input>
      <!-- <hm_input :data="user.username" @getvalue="getv"></hm_input> -->

      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <!-- 接收子组件 --><!-- 给子组件传值 -->
      <hm_button @click="login" type="success">登录</hm_button>
    </div>
  </div>
</template>

<script>
// 引入 组件
// 封装的按钮
import hm_button from "../../components/heima_button";
// 封装的输入框
import hm_input from "../../components/hm_input";

export default {
  data() {
    return {
      // 用户输入框
      user: {
        username: "",
        password: "",
      },
    };
  },
  // 注册组件
  components: {
    hm_button,
    hm_input,
  },
  // 事件处理函数
  methods: {
    // 登录按钮 -- 子组件传 e 过来
    login(e) {
      // console.log(44444, e);
      // console.log(this.user);
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