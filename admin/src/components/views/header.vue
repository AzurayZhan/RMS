<template>
  <div class="header">
    <h2>后台管理</h2>
    <div class="user">
      <el-avatar
        class="pic"
        :size="60"
        :src="pic1"
      ></el-avatar>
      <div class="name">
        <p>{{userName}}</p>
        <div @click="exit()">退出登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import userVue from '../pages/user.vue';
export default {
  data() {
    return {
      pic1:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=101023911,1072357512&fm=26&gp=0.jpg",
      userName:localStorage.getItem("userName")
    }
    
  },
  methods: {
    exit(){
      localStorage.removeItem("userName")
      this.$router.replace("/login")
       this.$message.info("退出登录")
    }
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.header {
  width: 100%;
  height: 80px;
  // background: $third-color;
  background url("../../assets/images/bg3.jpg")
  background-size 100vw 100px
  // border-bottom: 3px solid $deep-color;
  position: fixed;
  z-index: 10;

  h2 {
    width: 200px;
    padding-left 20px
    line-height: 80px;
    float: left;
    text-align: left;
    font-weight: bold;
    color: $font-color4;
  }

  .user {
    width: 200px;
    height: 80px;
    float right 
    color $font-color4
    .name{
      float right   
      width 120px
      text-align center
      line-height 80px
      font-size 30px
      position relative
      &:hover div{
         display block
         cursor pointer
        }
      div{
        position absolute
        width 120px
        height 40px
        right 0
        top 80px
        background $third-color
        font-size 20px
        line-height 40px
        display none 
      }
    }
    .pic {
      margin 10px auto
    }
  }
}
</style>