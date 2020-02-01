<template>
  <div class="home" v-loading.fullscreen.lock="loading" element-loading-text="登录中...">
    <div class="Vuelogo">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div class="Vuelogo2">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <el-card class="box-card">
      <h1 style="  margin-bottom: 30px;">登录界面</h1>
      <el-form>
        <el-form-item label="账号名">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item class="flex jc-end">
          <el-button @click="add">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Home extends Vue {
  formLabelAlign = {
    username: "",
    password: ""
  };
  loading = false;
  async add() {
    this.loading = true;
    if (
      this.formLabelAlign.username === "" ||
      this.formLabelAlign.password === ""
    ) {
      this.$message({
        message: "请输入账号和密码！！！",
        type: "warning"
      });
    } else {
      const res = await this.$http.post("/user", this.formLabelAlign);
      if (res.status === 200) {
        this.$message({
          message: res.data.message,
          type: res.data.type
        });
        if (res.data.token) {
          localStorage.token = res.data.token;
          this.$router.push("/index");
        }
      }
    }
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
</script>
<style scoped>
.Vuelogo {
  position: fixed;
  z-index: -1;
  transform: translate(-50%, -50%);
}
.Vuelogo2 {
  position: fixed;
  z-index: -1;
  right: 0;
  transform: translate(50%, -50%);
}
.box-card {
  opacity: 0.99;
  margin: auto;
  max-width: 600px;
  margin-top: 20vh;
  height: 400px;
}
</style>
