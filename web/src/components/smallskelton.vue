<template>
  <div class="skeleton">
    <div class="skeleton-title"></div>
    <div class="skeleton-context"></div>
    <div class="skeleton-context1"></div>
  </div>
</template>
<style scoped>
.skeleton {
  background-color: white;
  margin-left: 60px;   
}
.skeleton-title {
  opacity: 0.6;
  background: #dfdfdf;
  width: 100px;
  height:23px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.skeleton-context {
  opacity: 0.6;
  background: #dfdfdf;
  height: 20px;
  margin-bottom: 10px;
  animation: contextleft .8s infinite;
}
@keyframes contextleft {
  0% {
    width: 100px;
  }
  50% {
    width: 200px;
  }
  to {
    width: 100px;
  }
}
.skeleton-context1 {
  opacity: 0.6;
  background: #dfdfdf;
  height: 20px;
  animation: contextleft1 .8s infinite;
}
@keyframes contextleft1 {
  0% {
    width: 200px;
  }
  50% {
    width: 100px;
  }
  to {
    width: 200px;
  }
}
</style>