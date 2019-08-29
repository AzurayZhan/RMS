<template>
  <div class="mask">
    <div class="login">
      <h2>Login</h2>
        <p><el-select class="login-inp" v-model="user.type" placeholder="请选择">
          <el-option v-for="item in types" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select></p>
        <p> <el-input class="login-inp" placeholder="账号" v-model="user.name" ></el-input></p>
      <p><el-input class="login-inp" placeholder="请输入密码" v-model="user.pass" show-password></el-input></p>
      <p><el-button class="lg" type="primary" :plain="true" @click="login()">Login</el-button></p>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api"
export default {
  data() {
    return {
      // isAdmin:"",
      types: [
        {
          name: "超级管理员",
          value: "0"
        },
        {
          name: "用户管理员",
          value: "1"
        },
        {
          name: "用户",
          value: "2"
        }
      ],
      user: {
        type: "",
        name: "",
        psas: ""
      }
    };
  },
  methods: {
      login(){
          this.$http({  
              url:API.login,
              method:"post",
              data:this.$qs.stringify(this.user)
          }).then(d=>{
              // console.log(d)
              if(d.data.isok){
                localStorage.setItem("isAdmin",d.data.isAdmin)
                localStorage.setItem("userName",this.user.name)
                  this.$message({
                      message:"登录成功",
                      type:"success"
                  })
                  this.$router.replace("/index")
              }else{
                  this.$message.error(d.data.info)
              }
          })
      }
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {},
  
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';
.mask {
  width: 100vw;
  height: 100vh;
  background: $primary-color;
  position: fixed;
  background:url("../../assets/images/bg4.jpg")
  background-size 100vw 100vh
  .login {
    position: absolute;
    width: 340px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255,255,255,.6)
    text-align: center;
    border-radius: 5px;
    padding-bottom: 10px;
    // opacity .8
    .login-inp {
      width: 80%;
      margin: 10px auto;
    }

    h2 {
      height: 30px;
      padding: 10px;
      margin-bottom 10px
      color: $deep-color;
      border-bottom: 1px solid $deep-color;
      // font-weight bold
    }
    .lg{
       font-size 16px
       font-weight bold
      }
  }
}
</style>