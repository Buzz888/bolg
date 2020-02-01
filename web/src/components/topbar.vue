<template>
  <header class="topbar flex ai-center">
    <div @click="$store.commit('setmenu')">
      <span v-if="$route.path=='/Note'?false:true" class="menu iconfont icon-hanbao" style="font-size:2.5rem;"></span>
    </div>
    <div @click="$router.push('/')" class="d-flex flex jc-center">
      <img src="../assets/buz.png" alt="logo" class="logo" />
    </div>
    <ul class="title">
      <li v-for="item in title" :key="item.name">
        <transition name="slide-fade" mode="out-in">
          <router-link active-class="item" tag="span" :to="item.path">{{item.name}}</router-link>
        </transition>
      </li>
      <li>
        <a href="https://github.com/Buzz888">
          <span>MORE+</span>
        </a>
      </li>
    </ul>
    <div class="git">
      <a href="https://github.com/Buzz888">
        <span class="iconfont icon-github" style="font-size:1.2rem;"></span>
      </a>
      <a href>
        <span class="iconfont icon-gitlab-line" style="font-size:1.2rem;"></span>
      </a>
    </div>
  </header>
</template>
<style scoped>
@media (max-width: 650px) {
  .git {
    margin-right: 2.5%;
  }
  .menu {
    margin-left: 2.5%;
  }
  .title {
    display: none !important;
  }
}
@media (min-width: 650px) {
  .git {
    margin-right: 10%;
  }
  .title {
    display: block;
  }
}
@media (min-width: 950px) {
  .menu {
    margin-left: 120px;
  }
}
.topbar {
  margin: auto;
  height: 72px;
  background: white;
}
.title {
  list-style: none;
  box-sizing: border-box;
  display: flex;
}
.title li {
  text-decoration: none;
  margin-right: 1.5em;
}
span {
  font-size: 0.8rem;
  color: #767676;
  font-weight: 400;
}
span:hover {
  color: #00979d;
  cursor: pointer;
}
.item {
  color: #767676;
  font-weight: bold;
}
a {
  text-decoration: none;
}
</style>
<script>
export default {
  data() {
    return {
      title: [
        { name: "前端", path: "/web" },
        { name: "后端", path: "/server" },
        { name: "算法与数据结构", path: "/alg" },
        { name: "设计模式", path: "/mode" },
        { name: "笔记", path: "/Note" }
      ]
    };
  }
};
</script>