<template>
  <el-card class="box-card" style>
    <div slot="header" class="clearfix">
      <h1>所属菜单:{{path['name']}}</h1>
      <el-dropdown style="float: right; padding: 3px 0">
        <span class="el-dropdown-link">
          切换分类
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in title" :key="item.name">
            <div @click="change(item)">{{item.name}}</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-form label-width="80px" style="margin-top:20px;">
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单分类">
        <el-select v-model="option" placeholder="请选择">
          <el-option v-for="item in value" :key="item.name" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
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
      <el-form-item label>
        <el-button @click="add" :loading="loading" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class menus extends Vue {
  title: any = [
    { name: "前端菜单", path: "menu/webtitle", url: "item/webitem" },
    { name: "数据结构与算法菜单", path: "menu/algtitle", url: "item/algitem" },
    { name: "后端菜单", path: "menu/servertitle", url: "item/serveritem" },
    { name: "设计模式菜单", path: "menu/modetitle", url: "item/modeitem" }
  ];
  path = null;
  created() {
    if (!this.path) {
      this.path = this.title[0];
    }
    this.fetchval();
    window.console.log(this.$store.state.env);
  }
  async fetchval() {
    const val = await this.$http.get(`${this.path!["path"]}`);
    this.value = val.data;
    this.loading = false;
  }
  //分类
  value = "";
  option = "";
  formLabelAlign = {
    name: "",
    objid: this.option,
    context: ""
  };
  //提交
  async add() {
    this.formLabelAlign["objid"] = this.option;
    const res = await this.$http.post(
      `${this.path!["url"]}`,
      this.formLabelAlign
    );
    if (res.status === 200) {
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      });
      this.$router.push({
        path: "/menulist",
        query: { id: this.path!["url"] }
      });
    }
  }
  //切换分类
  change(item: any) {
    this.loading = true;
    this.path = item;
    this.fetchval();
    this.formLabelAlign = {
      name: "",
      objid: this.option,
      context: ""
    };
    this.option = "";
    this.fileList = [];
  }
  //loading
  loading = true;
  //上传
  fileList = [];
  handleRemove(file: any, fileList: any) {
    window.console.log(file, fileList);
  }
  handleExceed(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 1 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    );
  }
  beforeRemove(file: any, fileList: any) {
    return this.$confirm(`确定移除 ${file.name}？`);
  }
  handleAvatarSuccess(file: any) {
    window.console.log(file);
    this.formLabelAlign.context = file;
  }
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
   width: 700px;
  margin: auto;
  margin-top:20px;
  padding: 20px;}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>