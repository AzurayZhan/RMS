<template>
  <div>
    <h3 class="title">{{$route.name}}</h3>
    <div class="container">
      <el-form ref="user" :model="user" :rules="rules" label-width="100px">
        <el-form-item label="账号" :required="id==0" prop="name">
          <el-input v-model="user.name" :disabled="id!=0"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" :required="id==0">
          <el-input type="password" v-model="user.pass" :disabled="id!=0"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm" v-if="id==0">
          <el-input type="password" v-model="user.confirm"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="user.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="user.sex" label="男" name="sex" :disabled="id!=0">男</el-radio>
          <el-radio v-model="user.sex" label="女" name="sex" :disabled="id!=0">女</el-radio>
        </el-form-item>
        <el-form-item label="身份证号" prop="idx">
          <el-input v-model="user.idx" :disabled="id!=0"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="des">
          <el-input v-model="user.des"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="user.time"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button type="primary" v-if="id==0" @click="add('user')">添加</el-button>
        <el-button type="primary" v-if="id!=0" @click="update()">修改</el-button>
        <el-button @click="toBack()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
import ajax from "../../common/js/ajax";
import rules from "../../assets/js/regular";
export default {
  data() {
    /* var nameRule = (rule, value, callback) => {
      if (/^[a-zA-Z0-9]{3,16}$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入3-16位字母、数字组成的账号"));
      }
    };
    var passRule = (rule, value, callback) => {
      if (/^[a-zA-Z][a-zA-Z0-9]{5,17}$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入6-18位以字母开头,由数字和字母组成的密码"));
      }
    };
    var confirmRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请确认密码"));
      } else {
        if (value !== this.user.pass) {
          callback(new Error("两次输入的密码不一致"));
        }
        else{
          callback()
        }
      }
    };
    var telRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号"));
      } else {
        if (/^1[34578]{1}\d{9}$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var emailRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入邮箱"));
      }
      else{
        callback()
      }
    };
    var idxRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入身份证号"));
      } else {
        if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/) {
          callback();
        } else {
          callback(new Error("请输入正确的身份证号"));
        }
      }
    };
    var desRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入备注信息"));
      }
      else{
        callback()
      }
    }; */
    
    return {
      user: {
        name: "",
        tel: "",
        email: "",
        sex: "",
        idx: "",  
        des: "",
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
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: passRule, trigger: "blur" }
        ],
        confirm: [{ validator: confirmRule, trigger: "blur" }],
        tel: [{ validator: telRule, trigger: "blur" }],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          },
          { validator: emailRule, trigger: "blur" }
        ],
        idx: [{ validator: idxRule, trigger: "blur" }],
        des: [{ validator: desRule, trigger: "blur" }]
      } */
    };
  },
  methods: {
    add(user) {
      // console.log(this.$refs.user)
      this.$refs[user].validate(valid => {
        // console.log(valid)
        if (valid) {
          delete this.user.confirm;
          ajax(
            this,
            API.addUser,
            "get",
            this.user,
            d => {
              this.$router.replace("/index/user/list");
            },
            err => {
              this.$message.error(err.data.info);
            }
          );
        }
        else {
            console.log('error submit!!');
            return false;
          }
      });
    },
    update() {
      delete this.user._id;
      delete this.user.confirm;
      // console.log(this.info)
      ajax(
        this,
        API.updateUser,
        "get",
        this.user,
        d => {
          this.$router.replace("/index/user/list");
        },
        err => {
          this.$message.error(err.data.info);
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
        url: API.findUser,
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
.container >>> .el-radio__label{
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

.create {
  margin-bottom: 10px;
}
</style>