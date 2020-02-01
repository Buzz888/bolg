<template>
  <div>
    <el-table v-loading="vloading" :data="tableData" stripe style="width: 100%">
      <el-table-column label="日期">
        <template slot-scope="scope">{{scope.row.created|filterdate}}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="context.url" label="内容"></el-table-column>
    </el-table>
    
  </div>
</template>

<script lang = "ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Notelist extends Vue {
  tableData = [];
  fileList = [];
  formLabelAlign: any = {
    name: "",
    context: {}
  };
  async fetch() {
    const res = await this.$http.get("Note");
    this.tableData = res.data;
  }
  created() {
    this.fetch();
  }
}
</script>
<style scoped>
</style>