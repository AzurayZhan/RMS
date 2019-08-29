<template>
  <div class="left">
    <div class="box">
      <router-link to="/index/manage" active-class="select" v-if="isAdmin==0">管理员管理</router-link>
      <router-link to="/index/user" active-class="select" v-if="isAdmin!=2">用户管理</router-link>
      <router-link to="/index/device" active-class="select">设备管理</router-link>
      <router-link to="/index/news" active-class="select">通知</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAdmin:localStorage.getItem("isAdmin")
    };
  },
  methods: {},
  components: {},
  watch: {},
  computed: {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.left {
  width: 180px;
  height 100%
  position fixed
  z-index 2
  // background: $primary-color;
  background: url("../../assets/images/bg1.jpg") ;
  background-size 180px 
  // min-width 180px
  .box {
    margin-top: 10px;

    a {
      display: block;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      font-weight: bold;
      color: $font-color4;

      &:hover {
        background: $third-color
        color: $font-color4;
      }
    }

    .select {
      background: $third-color
        color: #ffffff;
    }
  }
}
</style>