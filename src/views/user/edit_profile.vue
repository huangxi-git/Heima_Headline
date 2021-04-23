<template>
  <div class="edit_profile">
    <div class="top">
      <hmHeader title="个人编辑">
        <template #left>
          <van-icon name="arrow-left" @click="$router.go(-1)" />
        </template>
        <template #right>
          <van-icon
            name="wap-home"
            class="wap-home"
            @click="$router.push({ path: '/index' })"
          />
        </template>
      </hmHeader>
      <!-- 头像 -->
      <div class="center">
        <img :src="userinfo.head_img" alt="" class="portrait" />
        <van-uploader :after-read="afterRead" />
      </div>
    </div>
    <div class="buttom">
      <!-- 昵称 -->
      <hmCell
        title="昵称"
        :desc="userinfo.nickname"
        @click.native="showNicknameDialog"
      ></hmCell>
      <van-dialog
        v-model="nickshow"
        title="修改昵称"
        show-cancel-button
        @confirm="editNickname"
      >
        <van-field v-model="nickname" label="昵称" placeholder="请输入用户名" />
      </van-dialog>
      <!-- 密码 -->
      <hmCell
        title="密码"
        desc="*******"
        @click.native="showPasswordDialog"
      ></hmCell>
      <van-dialog
        v-model="passshow"
        title="修改密码"
        show-cancel-button
        @confirm="editPassword"
        :beforeClose="beforeClose"
      >
        <van-field
          v-model="originPass"
          label="原密码"
          placeholder="请输入原密码"
        />
        <van-field
          v-model="newPass"
          label="新密码"
          placeholder="请输入新密码"
        />
      </van-dialog>
      <!-- 性别 -->
      <hmCell
        title="性别"
        :desc="userinfo.gender == 1 ? '男' : '女'"
        @click.native="gendershow = !gendershow"
      ></hmCell>
      <van-action-sheet
        v-model="gendershow"
        :actions="actions"
        @select="onSelect"
        :close-on-click-action="true"
      />
    </div>
  </div>
</template>

<script>
// 引入子组件
import hmHeader from "../../components/hm_header";
import hmCell from "../../components/hm_cell";
import { fileUpload } from "../../apis/fileUpload";
import { updateUserInfo, getUserDetail } from "../../apis/user";
import axios from "../../utils/request";

export default {
  data() {
    return {
      userinfo: {},
      // 昵称
      nickshow: false,
      nickname: "",
      // 密码
      passshow: false,
      originPass: "",
      newPass: "",
      // 性别
      gendershow: false,
      actions: [{ name: "男" }, { name: "女" }],
    };
  },
  // 钩子函数 -- 渲染页面
  mounted() {
    // console.log(this.userinfo);
    getUserDetail(this.$route.params.id)
      .then((res) => {
        console.log("钩子函数：", res);
        this.userinfo = res.data.data;
        // 渲染头像
        this.userinfo.head_img =
          axios.defaults.baseURL + res.data.data.head_img;
        // this.nickname = res.data.data.nickname;
        // 渲染昵称;
        this.userinfo.nickname = res.data.data.nickname;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // 事件处理函数
  methods: {
    // 上传头像
    afterRead(file) {
      // console.log(file);
      let formdata = new FormData();
      formdata.append("file", file.file);
      fileUpload(formdata)
        .then((res) => {
          // console.log(res);
          if (res.data.message == "文件上传成功") {
            this.userinfo.head_img = axios.defaults.baseURL + res.data.data.url;
            // 文件上传成功后 -- 修改数据
            updateUserInfo(this.$route.params.id, {
              head_img: res.data.data.url,
            })
              .then((res) => {
                // console.log(res);
                this.$toast.success("头像修改成功！");
              })
              .catch((err) => {
                console.log(err);
                this.$toast.fail("头像修改失败！");
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改昵称
    showNicknameDialog() {
      this.nickshow = !this.nickshow;
      // console.log(5599);
      this.nickname = this.userinfo.nickname;
    },
    // 点击确认按钮
    editNickname() {
      updateUserInfo(this.$route.params.id, { nickname: this.nickname })
        .then((res) => {
          console.log(res);
          this.userinfo.nickname = res.data.data.nickname;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 修改密码
    showPasswordDialog() {
      this.passshow = !this.passshow;
      this.originPass = "";
      this.newPass = "";
    },
    async editPassword() {
      // 判断用户原密码是否正确
      if (this.originPass == this.userinfo.password) {
        // 判断原密码和新密码不能一样
        if (this.originPass == this.newPass) {
          return this.$toast("新密码不能和原密码一样！");
        }
        // 判断新密码是否符合规则
        if (/^.{3,16}$/.test(this.newPass)) {
          let res = await updateUserInfo(this.$route.params.id, {
            password: this.newPass,
          });
          // 虽然这里不需要更新页面中的显示，但是之前怕判断原密码是否正确是通过 userinfo 进行的
          // 所以在密码修改成功之后，为下次密码匹配，我们将 userinfo 中的数据进行更新
          this.userinfo.password = this.newPass;
          // console.log(res);
          this.$toast.success(res.data.message);
        } else {
          this.$toast.fail("请输入3~16位密码！");
        }
      } else {
        this.$toast.fail("原密码不正确！");
      }
    },
    // 编辑密码时，阻止模态框关闭
    beforeClose(action, done) {
      // console.log(action);
      // 点击确定按钮
      if (action == "confirm") {
        // 原密码不正确、校验规则不正确
        if (
          this.originPass !== this.userinfo.password ||
          !/^.{3,16}$/.test(this.newPass) ||
          this.originPass == this.newPass
        ) {
          // 阻止关闭
          done(false);
        } else {
          // 允许关闭
          done();
        }
      }
      // 点击取消按钮
      else {
        done();
      }
    },

    // 修改性别
    async onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.$toast(item.name);
      // 拿到选中的值
      // console.log(item.name == "男" ? "1" : "0");
      let genderNumber = item.name == "男" ? "1" : "0";
      let res = await updateUserInfo(this.$route.params.id, {
        gender: genderNumber,
      });
      // console.log(res);
      this.userinfo.gender = genderNumber;
    },
  },

  // 注册子组件
  components: {
    hmHeader,
    hmCell,
  },
};
</script>

<style lang="less" scoped>
.edit_profile {
  .wap-home {
    font-size: 22px;
  }
  .center {
    display: flex;
    justify-content: center;
    position: relative;
    .portrait {
      width: 129px;
      height: 87px;
      margin: 20px;
    }
    // 深度作用选择器,让父组件影响子组件
    /deep/ .van-uploader {
      position: absolute;
      top: 19px;
      left: 137px;
    }
    /deep/ .van-uploader__upload {
      width: 129px;
      height: 87px;
      opacity: 0.1;
    }
  }
}
</style>