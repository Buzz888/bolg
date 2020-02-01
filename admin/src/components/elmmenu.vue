<template>
  <el-card  v-loading="loading" style="max-width:600px; margin:auto;padding:20px;">
    <el-form label-width="70px" :model="formtitle" style="margin-top:30px;">
      <el-form-item label="创建名称">
        <el-input v-model="formtitle.name"></el-input>
      </el-form-item>
      <el-form-item label="名称简介">
        <el-input v-model="formtitle.context"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Elmmenu extends Vue {
  @Prop() private path!: string;
  formtitle = {
    name: "",
    context: ""
  };
  loading = false;
  async submitForm() {
    this.loading = true
    const res = await this.$http.post(`/${this.path}`, this.formtitle);
    if (res.status === 200) {
      this.$message({
        showClose: true,
        message: "提交成功",
        type: "success"
      });
      this.$router.push({path:'/titlelist',query:{id:this.path}})
    } else {
      this.$message({
        showClose: true,
        message: "提交失败,请重新提交",
        type: "error"
      });
    }
    this.loading = false;
  }
  mounted() {}
}
</script>