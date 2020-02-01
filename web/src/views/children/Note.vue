<template>
  <div>
    <div class="Note shadow">
      <h1 class="color-green">笔记列表 | @2020</h1>
      <div class="w"></div>
      <div
        v-for="(item,index) in Notelist"
        :key="item.name"
        @click="$router.push({path:`/Note/${item.context.name}`,query:{index:item.index}})"
        class="Noteitem flex ai-center jc-start"
      >
        <div
          class="color-gray"
          style="font-size:1.2rem;width:20px;margin-right:10px;padding:5px"
        >{{index+1}}.</div>
        <div class="d-flex name">
          <h1 style="font-size:1.5rem" class="color-green">{{item.name}}</h1>
          <div class="color-gray">{{item.context.url}}</div>
          <div class="color-gray" style="font-size:12px">{{item.updated.slice(0,10)}}</div>
        </div>
      </div>
      <button :disabled="isDisabled" v-show="!vloding" @click="more" class="more">{{isDisabled ?'这是我的底线啦...':'拼命加载更多...'}}</button>
      <transition name="fade" mode="out-in">
        <smallskelton v-show="vloding"></smallskelton>
      </transition>
    </div>
    <div>
      <div class="rightNote">
          <h1>推荐:</h1>
        <ul>
          <li class="rightNote-item">
            <div class="rightNote-title iconfont icon-link">活动按期开始</div>
            <div style="font-size:.8rem" class="color-gray">2018-04-15</div>
          </li>
          <li class="rightNote-item">
            <div class="rightNote-title iconfont icon-link">活动按期开始</div>
            <div style="font-size:.8rem" class="color-gray">2018-04-15</div>
          </li>
          <li class="rightNote-item">
            <div class="rightNote-title iconfont icon-link">活动按期开始</div>
            <div style="font-size:.8rem" class="color-gray">2018-04-15</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media (max-width: 650px) {
  .Note {
    margin: 1%;
  }
}
@media (min-width: 650px) {
  .Note {
    margin-left: 5%;
  }
}
.Note {
  border-radius: 15px;
  padding: 10px;
  margin-top: 100px;
  max-width: 700px;
}
.watch input {
  border: none;
  outline: none;
  border-bottom: 1px solid #767676;
  width: 50px;
  transition: 0.5s all ease;
  color: #767676;
  font-size: 0.9rem;
}
.watch span {
  color: #767676;
}

.watch input:focus {
  width: 100px;
}
.w {
  border: 2px solid #dedede;
  margin-top: 50px;
  margin-bottom: 20px;
}
.Noteitem {
  cursor: pointer;
  margin: auto;
  width: 90%;
  height: 70px;
  margin-bottom: 20px;
}
.Noteitem :hover {
  background: #fafafa;
  border-radius: 15px;
}
.name {
  padding-left: 30px;
}
.more {
  width: 200px;
  border: none;
  background: #00979d;
  color: white;
  border-radius: 15px;
  font-size: 0.8rem;
  height: 30px;
  margin: auto;
  display: flex;
  justify-content: center;
  outline: none;
  cursor: pointer;
  margin-bottom: 40px;
}
.more:hover {
  background: #1c7d81;
}
.v-loading {
  width: 20px;
  height: 20px;
  border: 3px solid #00979d;
  border-radius: 50%;
}
.rightNote {
  position: fixed;
  top: 200px;
  right: 10%;
}
.rightNote-item {
  border-left: 2px solid #e4e7ed;
  padding-left: 20px;
  list-style: none;
  padding-bottom: 10px;
}
.rightNote-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: #2c3e50;
  padding-bottom: 10px;
}
.rightNote-title:hover {
  color: #00979d;
  cursor: pointer;
}
</style>
<script>
export default {
  data() {
    return {
      vloding: false,
      Notelist: [],
      index: 0,
      isDisabled: false
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/api/web/note/${this.index}`);
      if (this.index !== 0) {
        if (res.data.length < 1) {
          this.isDisabled = true;
        } else {
          this.Notelist = this.Notelist.concat(res.data);
        }
      } else {
        this.Notelist = res.data;
      }
      this.index = this.index + 5;
    },
    more() {
      this.vloding = true;
      setTimeout(() => {
        this.fetch();
        this.vloding = false;
      }, 1000);
    }
  }
};
</script>