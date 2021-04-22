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
      <div class="center">
        <img :src="userinfo.head_img" alt="" class="portrait" />
        <van-uploader :after-read="afterRead" />
      </div>
    </div>
    <div class="buttom">
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
      <hmCell title="密码" desc="*******"></hmCell>
      <hmCell title="性别" desc="男"></hmCell>
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
      nickshow: false,
      nickname: "",
    };
  },
  // 钩子函数 -- 渲染页面
  mounted() {
    getUserDetail(this.$route.params.id)
      .then((res) => {
        // console.log(res);
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
      width: 100px;
      height: 100px;
      margin: 20px;
    }
    /deep/ .van-uploader {
      position: absolute;
      top: 19px;
      left: 137px;
    }
    /deep/ .van-uploader__upload {
      width: 100px;
      height: 100px;
      opacity: 0.1;
    }
  }
}
</style>