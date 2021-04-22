<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>

      <!-- :data='user.username'：父传子：数据影响元素 -->
      <!-- @getvalue='getv'：子传父：元素影响数据 -->
      <!-- <hm_input :data="user.username" @getvalue="getv"></hm_input> -->
      <!-- v-model:双向数据绑定：数据影响元素 + 元素影响数据
        1.为子组件的value属性赋值
        2.监听子组件所发出的input事件 -->
      <!-- 为子组件赋值优先赋值给子组件的props属性，如果没有props属性，那么就会添加到组件的根元素 -->
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
// 引入 请求
import { userLogin } from "../../apis/user";

export default {
  data() {
    return {
      // 用户输入框
      user: {
        username: "19123456789",
        password: "zxcvbnm",
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
      // 用户手机号验证
      let usern = /^1[35789]\d{9}$|^admin$/.test(this.user.username);
      // 密码验证
      let pwd = /^.{3,16}$/.test(this.user.password);
      // 判断用户输入是否正确
      if (usern && pwd) {
        // 记得传参
        userLogin(this.user)
          .then((res) => {
            // console.log(res);
            // 保存token到本地
            localStorage.setItem(
              "heimatoutiao_loginToken",
              res.data.data.token
            );
            this.$toast.success("登录成功！");
            // 登录成功后跳转页面
            this.$router.push({ path: `/personal/${res.data.data.user.id}` });
          })
          .catch((err) => {
            // console.log(err);
            this.$toast.fail("登录失败！");
          });
      } else {
        // console.log("输入格式校验失败！");
        this.$toast({
          message: "手机号或密码输入不合法！",
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