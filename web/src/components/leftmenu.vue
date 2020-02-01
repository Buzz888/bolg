<template>
  <div class="leftbar">
    <div>
      <ul class="contextul">
        <li v-for="(item,index) in list" :key="index">
          <div class="flex ai-center jc-sb">
            <div
              :style="flag == index ? 'color:#00979D; border-left: 5px solid #00979D':''"
              @click="flag = index"
              class="contexttitle"
            >{{item.title}}</div>
            <span
              style="font-size:.6rem;"
              :class="flag === index ?'iconfont icon-top':'icon-ttop iconfont icon-top'"
            ></span>
          </div>
          <ul class="itemul" v-for="(it,i) in item.item" :key="i">
            <transition name="slide-fade">
              <router-link
                active-class="it"
                v-show="flag == index ? true : false"
                class="color-gray contextitem"
                tag="li"
                :to="{path:it.path,query:{index:index}}"
              >{{it.name}}</router-link>
            </transition>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["propslist"],
  data() {
    return {
      flag: 0,
      list: []
    };
  },
  created() {
    this.flag = this.$route.query.index;
  },
  mounted() {
    this.list = this.propslist;    
  },
  watch: {
    propslist: function(val, oldval) {
      if (val !== oldval) {
        this.list = this.propslist;
      }
    }
  },
  updated() {
    this.list = this.propslist;
  },
  methods: {}
};
</script>
<style scoped>
@media (min-width: 950px) {
  .leftbar {
    width: 330px;
  }
}
@media (max-width: 950px) {
  .leftbar {
    width: 250px;
  }
}
.leftbar {
  box-shadow: 0px 3px 3px rgba(0, 21, 41, 0.08);
  top: 72px;
  padding-top: 20px;
  position: fixed;
  left: 0px;
  background: white;
  height: 100%;
  overflow: auto;
  z-index: 999;
}
ul {
  list-style: none;
  padding: 0;
  margin-right: 1em;
}
.contextul {
  line-height: 1.5em;
  margin-top: 5px;
}
.contexttitle {
  font-size: 0.9rem;
  padding-left: 3em;
  font-weight: 500;
  color: #767676;

  cursor: pointer;
}
.icon-ttop {
  transition: all 0.3s ease;
  transform: rotate(180deg);
}
.contextitem {
  font-size: 14px;
  cursor: pointer;
  padding-left: 2.5em;
}
.it {
  color: #00979d;
  font-weight: 500;
}
.itemul {
  padding-left: 1.5em;
  margin: .9em;
}
</style>

