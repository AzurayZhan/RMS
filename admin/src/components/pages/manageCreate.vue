<template>
  <div>
    <h3 class="title">{{$route.name}}</h3>
    <div class="container">
      <el-form ref="user" :model="user" :rules="rules" label-width="100px">
        <el-form-item label="账号" :required="id==0" prop="name">
          <el-input v-model="user.name" :disabled="id!=0"></el-input>
        </el-form-item>
        <el-form-item label="密码" :required="id==0" prop="pass">
          <el-input type="password" v-model="user.pass" :disabled="id!=0"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="id==0" prop="confirm">
          <el-input type="password" v-model="user.confirm"></el-input>
        </el-form-item>
        <el-form-item label="属性" prop="prop">
          <el-input v-model="user.prop"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker v-model="user.time"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button type="primary" v-if="id==0" @click="add()">添加</el-button>
        <el-button type="primary" v-if="id!=0" @click="update()">修改</el-button>
        <el-button @click="toBack()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
import ajax from "../../common/js/ajax";
import rules from '../../assets/js/regular';
export default {
  data() {
    return {
      user: {
        name: "",
        pass: "",
        prop: "",
        time: "",
        confirm: ""
      },
      id: "",
      rules:rules(this)
      /* rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { validator: nameRule, trigger: "blur" }
        ],
        pass: "",
        confirm:"",
        prop:""
      } */
    };
  },
  methods: {
    add() {
      if (this.user.confirm != this.user.pass) {
        this.$message({
          message: "两次输入的密码不一致",
          type: "warning"
        });
        return;
      }
      ajax(
        this,
        API.addManage,
        "get",
        this.user,
        d => {
          this.$router.replace("/index/manage/list");
        },
        err => {
          this.$message.error(err.data.info);
        }
      );
    },
    update() {
      delete this.user._id;
      // console.log(this.info)
      ajax(
        this,
        API.updateManage,
        "get",
        this.user,
        d => {
          this.$router.replace("/index/manage/list");
        },
        err => {
          this.$message.error(d.data.info);
        }
      );
    },
    toBack() {
      this.$router.go(-1);
    }
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {
    this.id = this.$route.query.id;
    if (this.id != 0) {
      this.$http({
        url: API.findManage,
        mehtod: "get",
        params: { id: this.id }
      }).then(d => {
        if (d.data.isok) {
          this.user = d.data.data[0];
        }
      });
    } else {
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.container >>> .el-form-item__label{
  font-size 16px 
  color $font-color4
}
.title {
  width: 100%;
  height: 30px;
  padding: 10px;
  line-height: 30px;
  font-weight: bold;
  color: $font-color4;
}
</style>