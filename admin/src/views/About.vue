<template>
  <div>
    <el-container>
      <el-aside :width="flag?'65px':'210px'" height="100vh;">
        <el-menu
          style="height:100vh;"
          :default-active="$route.path"
          :collapse="flag"
          router
          background-color="#222d32"
          text-color="#b9c9ce"
          active-text-color="#fff"
        >
          <el-submenu :index="index+'1'" v-for="(item,index) in menu" :key="item.title">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item
              v-for="items in item.item"
              :key="items.path"
              :index="items.path"
            >{{items.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="flex ai-center">
          <el-button type="text" style="color:#606266;padding-right:20px" @click="flag=!flag">
            <span style="font-size:1.5rem" class="el-icon-s-operation"></span>
          </el-button>
          <el-breadcrumb class="d-flex" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- <el-avatar  shape="square" :size="size" :src="squareUrl"></el-avatar> -->
          <el-dropdown style="margin-right:20px;">
            <span class="el-dropdown-link">
              用户名
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <transition name="slide-fade" mode="out-in">
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class About extends Vue {
  flag = false;
  menu: Array<Object> = [
    {
      title: "菜单",
      item: [
        { path: "/title", name: "创建菜单" },
        { path: "/titlelist", name: "菜单列表" }
      ],
      icon: "el-icon-menu"
    },
    {
      title: "创建子名称",
      item: [
        { path: "/menus", name: "创建名称" },
        { path: "/menulist", name: "创建列表" },
        { path: "/baner", name: "创建思维导图" }
      ],
      icon: "el-icon-s-open"
    },
    {
      title: "创建笔记",
      item: [
        { path: "/note", name: "创建笔记" },
        { path: "/notelist", name: "笔记列表" }
      ],
      icon: "el-icon-s-order"
    }
  ];
  created() {}
}
</script>
<style scoped>
.el-header {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 60px;
}
</style>