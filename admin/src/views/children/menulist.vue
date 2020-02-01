<template>
  <div>
    <h1 style="font-size:1.3rem;color:#606266">菜单名称:{{name}}</h1>
    <el-table
      v-loading="listloading"
      :data="tableData.filter(data => !search || data.objid.name.toLowerCase().includes(search.toLowerCase()))"
      stripe
      style="width: 100%"
    >
      <el-table-column label="创建日期">
        <template slot="header" slot-scope="scope">
          <el-input
            style="width:120px"
            v-model="search"
            @click="add(scope)"
            size="mini"
            placeholder="输入父分类搜索"
          />
        </template>
        <template slot-scope="scope">{{scope.row.created|filterdate}}</template>
      </el-table-column>
      <el-table-column prop="name" label="创建名"></el-table-column>
      <el-table-column label="父分类">
        <template slot-scope="scope">
          {{scope.row.objid.name|filtername(search)}}
          <span
            style="color:#409EFF;font-size:1.5rem;font-weight:bold"
          >{{search}}</span>
          {{scope.row.objid.name|filtername2(search)}}
        </template>
      </el-table-column>
      <el-table-column prop="context.url" label="内容"></el-table-column>
      <el-table-column fixed="right">
        <template slot="header">
          <el-dropdown>
            <span class="el-dropdown-link">
              选择菜单列表
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in list" :key="item.name">
                <div @click="change(item)">{{item.name}}</div>
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
    <putitem @put="changeput" v-show="put" :path="path" :formtitle="formtitle"></putitem>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import putitem from "../../components/putitem.vue";

@Component({
  components: {
    putitem
  }
})
export default class Title extends Vue {
  list: Array<any> = [
    { name: "前端菜单", path: "menu/webtitle", url: "item/webitem" },
    { name: "数据结构与算法菜单", path: "menu/algtitle", url: "item/algitem" },
    { name: "后端菜单", path: "menu/servertitle", url: "item/serveritem" },
    { name: "设计模式菜单", path: "menu/modetitle", url: "item/modeitem" }
  ];
  listloading: boolean = false;
  search: string = "";
  name: string = "";
  tableData: Array<any> = [];
  created() {
    if (!this.$route.query.id) {
      this.$route.query.id = "item/webitem";
    }
    const name: any = this.list.find(i => i.url === this.$route.query.id);
    this.$route.query.path = name.path;
    this.name = name.name;
    this.fetch();
  }
  //查
  async fetch() {
    this.listloading = true;
    await this.$http.get(`${this.$route.query.path}`);
    const res: any = await this.$http.get(`${this.$route.query.id}`);
    this.tableData = res.data;
    this.listloading = false;
    this.search = "";
  }
  change(val: any) {
    this.$route.query.id = val.url;
    this.$route.query.path = val.path;
    this.name = val.name;
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
