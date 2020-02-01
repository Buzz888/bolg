<template>
  <div>
    <h1 style="font-size:1.3rem;color:#606266">菜单名称:{{name}}</h1>
    <el-table v-loading="listloading" :data="tableData" stripe style="width: 100%">
      <el-table-column label="创建日期">
        <template slot-scope="scope">{{scope.row.created|filterdate}}</template>
      </el-table-column>
      <el-table-column prop="name" label="菜单名"></el-table-column>
      <el-table-column prop="context" label="简介"></el-table-column>
      <el-table-column fixed="right">
        <template slot="header">
          <el-dropdown>
            <span class="el-dropdown-link">
              选择菜单列表
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in list" :key="item.name">
                <div @click="change(item.path)">{{item.name}}</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row,scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <putmenu @put="changeput" v-show="put" :path="path" :formtitle="formtitle"></putmenu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import putmenu from "../../components/putmenu.vue";

@Component({
  components: {
    putmenu
  }
})
export default class Title extends Vue {
  list = [
    { name: "前端菜单", path: "menu/webtitle" },
    { name: "数据结构与算法菜单", path: "menu/algtitle" },
    { name: "后端菜单", path: "menu/servertitle" },
    { name: "设计模式菜单", path: "menu/modetitle" }
  ];
  listloading = false;
  created() {
    if (!this.$route.query.id) {
      this.$route.query.id = "menu/webtitle";
    }
    const name: any = this.list.find(i => i.path === this.$route.query.id);
    this.name = name.name;
    this.fetch();
  }
  updated() {
    const name: any = this.list.find(i => i.path === this.$route.query.id);
    this.name = name.name;
  }
  name = "";
  tableData = [];
  //查
  async fetch() {
    this.listloading = true;
    const res: any = await this.$http.get(`${this.$route.query.id}`);
    window.console.log(res.data);
    this.tableData = res.data;
    this.listloading = false;
  }
  change(val: any) {
    this.$route.query.id = val;
    this.fetch();
  }
  //改
  put = false;
  formtitle = {};
  path: any = "";
  async handleClick(item: any) {
    this.formtitle = item;
    this.path = this.$route.query.id;
    this.put = true;
    this.listloading = true;
  }
  changeput() {
    this.put = !this.put;
    this.listloading = !this.listloading;
    this.fetch();
  }
  //删
  async del(item: any, index: number) {
    await this.open(item, index);
  }
  open(item: any, index: number) {
    this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        const res = await this.$http.delete(
          `${this.$route.query.id}/${item._id}`
        );
        this.$message({
          type: "success",
          message: "删除成功!"
        });

        this.tableData.splice(index, 1);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }
}
</script>
