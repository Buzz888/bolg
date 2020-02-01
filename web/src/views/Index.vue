<template>
  <div>
    <top-bar class="topbar shadow"></top-bar>
    <transition name="fade" mode="out-in">
      <skeleton v-show="$store.state.skel"></skeleton>
    </transition>
    <router-view class="contextmenu" />
  </div>
</template>
<script>


