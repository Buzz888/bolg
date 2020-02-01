<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item,index) in title" :title="item.name" :key="index"   :name="index">
        <elmmenu :path="item.path"></elmmenu>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import elmmenu from "../../components/elmmenu.vue";
@Component({
  components: {
    elmmenu
  }
})
export default class Title extends Vue {
  formtitle = {};
  activeName = 0;
  title = [
    { name: "前端菜单", path: "menu/webtitle" },
    { name: "数据结构与算法菜单", path: "menu/algtitle" },
    { name: "后端菜单", path: "menu/servertitle" },
    { name: "设计模式菜单", path: "menu/modetitle" }
  ];
 
}

</script>