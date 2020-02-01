<template>
  <el-card class="put" v-loading="loading" style=";">
    <el-form label-width="70px" :model="formtitle" style="margin-top:30px;">
      <el-form-item label="创建名称">
        <el-input v-model="formtitle.name"></el-input>
      </el-form-item>
      <el-form-item label="名称简介">
        <el-upload
          class="upload-demo"
          action="http://localhost:3030/upload/"
          :on-success="handleAvatarSuccess"
          :limit="1"
          :file-list="fileList"
          :on-remove="handleremove"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click=" change()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class Elmmenu extends Vue {
  @Prop() private path!: string;
  @Prop() private formtitle!: any;
  loading = false;
  fileList: any = [];
  @Emit("put")
  change() {}
  async submitForm() {
    this.loading = true;
    const res = await this.$http.put(
      `/${this.path}/${this.formtitle._id}`,
      this.formtitle
    );
    if (res.status === 200) {
      this.$message({
        showClose: true,
        message: "修改成功",
        type: "success"
      });
      this.change();
    } else {
      this.$message({
        showClose: true,
        message: "修改失败,请重新提交",
        type: "error"
      });
    }
    this.loading = false;
  }
  handleAvatarSuccess(val: any) {
    this.formtitle.context = val;
  }
  async handleremove(val:any){
   await this.$http.post(`/remove/${this.path.slice(5)}/${this.formtitle._id}`)
  }
  updated() {
    if (this.fileList.length == 0) {
      this.fileList = [this.formtitle.context];
    }
  }
}
</script>
<style scoped>
.put {
  width: 500px;
  margin: auto;
  padding: 20px;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2001;
}
</style>