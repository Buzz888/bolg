<template>
  <div class="note-context flex jc-center">
    <div class="flex color-green jc-sb" style="width:60%">
      <div class="flex ai-center">
        <span class="top-icon iconfont icon-left"></span>
        <p>{{left}}</p>
      </div>
      <div class="flex ai-center">
        <p>{{right}}</p>
        <span class="top-icon iconfont icon-left" style="transform: rotate(180deg)"></span>
      </div>
    </div>
    <h1 class="color-green Note-title flex jc-center">Hello world</h1>
    <div  v-html="tem" class="note-item"></div>
  </div>
</template>
<style scoped>
.note-context {
  flex-wrap: wrap;
  margin-top: 100px;
  width: 100%;
}
.top-icon {
  font-size: 2rem;
  font-weight: bold;
}
p {
  cursor: pointer;
  font-weight: bold;
}
.Note-title {
  font-size: 2rem;
  width: 100%;
}
.note-item {
    margin-top: 20px;
  width: 70%;
  height: 100vw;
  border-radius: 15px;
  box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.08);
  padding: 30px;
}
</style>
<script>
export default {
  data() {
    return {
      left: "react",
      right: "vue",
      tem:null
    };
  },
  created(){
      this.fetch()

  },
  methods:{
  async fetch(){
      const res =await this.$http.get(`/app/${this.$route.params.id}`)
      this.tem = res.data
  }  }
};
</script>