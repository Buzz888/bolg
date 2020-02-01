<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
import NProgress from "nprogress";
import "./plugin/nprogress.css";
export default {
  beforeUpdate() {
    NProgress.start();
  },
  updated() {
    setTimeout(() => {
      NProgress.done();
    }, 100);
  }
};
</script>

