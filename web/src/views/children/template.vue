<template>
  <div>
    <transition name="slide-fade">
      <leftmenu v-show="$store.state.menu" :propslist="info"></leftmenu>
    </transition>
    <router-view />
    <img :src="getsrc()" v-show="showimg" class="temp-img" alt />
  </div>
</template>

<script>
export default {
  async algRequest(store) {
    return await store.dispatch(`get${this.path}`);
  },
  data() {
    return {
      list: [],
      src: "",
      showimg:true,
      path:''
    };
  },
  computed: {
    info() {
      return this.$store.state[this.path];
    }
  },
  async mounted() {
    const res = await this.$http.get("/api/admin/baner");
    this.list = res.data;
    await this.$store.dispatch(`get${this.getname()}`);
    this.getsrc();
    if(this.$route.params.id){
      this.showimg = false
    }else{
      document.title = this.$route.name
    }
  },
  methods: {
    getsrc() {
      let index = this.list.findIndex(i => i.name == `${this.getname()}.png`);
      if (index !== -1) {
        return `http://localhost:3030/${this.list[index].url}`;
      } else {
        return "";
      }
    },
    getname() {
      this.path = this.$route.path.match(/(\/\w{1,})/)[0].slice(1);
      return this.$route.path.match(/(\/\w{1,})/)[0].slice(1);
    }
  },
  watch: {
    async $route(to, from) {
      if (to !== from && !to.params.id) {
        await this.$store.dispatch(`get${this.getname()}`);
        document.title = this.$route.name
        this.getsrc();
        this.showimg = true;
      }
      if(to.params.id){
        this.showimg = false
      }
      
    }
  }
};
</script>

