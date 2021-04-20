<template>
  <div class="container">
    <div class="close"><span class="iconfont iconicon-test"></span></div>
    <div class="logo"><span class="iconfont iconnew"></span></div>
    <div class="inputs">
      <hm_input
        placeholder="请输入账号"
        :rules="/^1[35789]\d{9}$/"
        v-model.trim="user.username"
        msg="请输入11位手机号码"
      ></hm_input>
      <hm_input
        placeholder="请输入昵称"
        v-model.trim="user.nickname"
      ></hm_input>
      <hm_input
        placeholder="请输入密码"
        :rules="/^.{3,16}$/"
        v-model.trim="user.password"
        msg="请输入3~16位的密码"
      ></hm_input>
    </div>
    <p class="tips">
      有账号？
      <a href="#/login" class="">去登录</a>
    </p>
    <hm_button type="success" @click="register">注册</hm_button>
  </div>
</template>

<script>
// 引入子组件
import hm_input from "../../components/hm_input";
import hm_button from "../../components/heima_button";
// 引入请求
import { userRegister } from "../../apis/user";

export default {
  data() {
    return {
      user: {
        username: "19123456789",
        password: "zxcvbnm",
        nickname: "axi",
      },
    };
  },
  // 注册组件
  components: {
    hm_input,
    hm_button,
  },
  methods: {
    register() {
      // 判断用户输入是否合法
      // 用户手机号验证
      let usern = /^1[35789]\d{9}$|^admin$/.test(this.user.username);
      // 密码验证
      let pwd = /^.{3,16}$/.test(this.user.password);
      // 用户输入校验
      if (usern && pwd && this.user.nickname.length > 0) {
        // console.log(this.user);
        userRegister(this.user)
          .then((res) => {
            // console.log(res);
            if (res.data.statusCode == 400) {
              // 用户名已存在
              this.$toast(res.data.message);
              return;
            } else {
              // 注册成功后跳转页面;
              this.$router.push({ path: "/login" });
            }
          })
          // 飘红错误
          .catch((err) => {
            this.$toast(err);
          });
      } else {
        this.$toast({
          message: "手机号或密码或昵称输入不合法!",
          position: "center",
          duration: 1000,
        });
      }
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