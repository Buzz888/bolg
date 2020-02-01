<template>
  <el-form label-width="80px" style="max-width:500px;margin-top:50px;">
    <el-form-item label="名称:">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="md:">
      <el-upload
        class="upload-demo"
        :action="$store.state.env==='development' ? $store.state.uploadUrl : '/upload'"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :on-success="handleAvatarSuccess"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传md文件，且只能为一个</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button @click="add" plain>提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Note extends Vue {
  formLabelAlign: any = {
    name: "",
    context: {}
  };
  handleAvatarSuccess(file: any) {
    this.formLabelAlign["context"] = file;
  }
  handleExceed() {}
  beforeRemove() {}
  fileList = [];
  handleRemove() {}
  async add() {
    const res = await this.$http.post("/Note", this.formLabelAlign);
    if (res.status == 200) {
      this.$message("ok");
      this.$router.push("/notelist");
      this.formLabelAlign = {
        name: "",
        context: {}
      };
    }
  }
}
</script>