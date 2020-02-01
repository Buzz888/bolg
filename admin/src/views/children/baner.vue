<template>
  <el-upload
    class="upload-demo"
    :action="$store.state.env==='development' ? $store.state.bannerUrl : '/baner'"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    list-type="picture"
    :on-success="handleAvatarSuccess"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过500kb</div>
  </el-upload>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      fileList: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/baner");
      this.fileList = res.data;
    },
    handleRemove(file, fileList) {
      this.$http.delete(`/baner/${file._id}`);
    },
    handlePreview(file) {
      window.console.log(file);
    },
    async handleAvatarSuccess(file, filelist) {
      await this.$http.post("/baner", { url: file.url, name: filelist.name });
      this.formLabelAlign.context = file;
      this.fetch();
    }
  }
};
</script>