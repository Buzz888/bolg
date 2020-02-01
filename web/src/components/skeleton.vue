<template>
  <div class="skeleton">
    <div class="skeleton-title"></div>
    <div class="skeleton-context"></div>
    <div class="skeleton-context"></div>
    <div class="skeleton-title" style="margin-top:150px"></div>
    <div class="skeleton-context"></div>
  </div>
</template>
<style scoped>
@media (max-width: 650px) {
  .skeleton {
    left: 0px;
  }
}
@media (min-width: 650px) {
  .skeleton {
    left: 220px;
  }
}
@media (min-width: 950px) {
  .skeleton {
    left: 330px;
  }
}
.skeleton {
  z-index: 999;
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 72px;
  background-color: white;
}
.skeleton-title {
  border-radius: 10px;
  opacity: 0.6;
  background: #dfdfdf98;
  width: 15%;
  height: 35px;
  margin: 50px;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.55) 10%,
    transparent 25%
  );
  animation: title .5s linear infinite;
}
.skeleton-context {
  border-radius: 10px;
  background: #dfdfdf98;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.35) 10%,
    transparent 25%
  );
  height: 35px;
  margin: 50px;
  animation: context .5s linear infinite;
  width: 35%;
}
@keyframes context {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 35vw 0;
  }
}
@keyframes title {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 15vw 0;
  }
}
</style>