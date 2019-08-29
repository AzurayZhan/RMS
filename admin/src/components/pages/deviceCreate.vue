<template>
  <div>
    <h3 class="title">{{$route.name}}</h3>
    <div class="container">
      <el-form ref="form" :model="device" label-width="100px">
        <el-form-item label="ip">
          <el-input v-model="device.ip"></el-input>
        </el-form-item>
        <el-form-item label="机房">
          <el-input  v-model="device.door"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input  v-model="device.num"></el-input>
        </el-form-item>
        <el-form-item label="宽带">
          <el-input v-model="device.width"></el-input>
        </el-form-item>
        <el-form-item label="状态">
             <el-radio v-model="device.status" label="1" name="status">空闲</el-radio>
          <el-radio v-model="device.status" label="0" name="status">已出售</el-radio>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button type="primary" v-if="id==0" @click="add()">添加</el-button>
        <el-button type="primary" v-if="id!=0" @click="update()" :disabled="isAdmin==2">修改</el-button>
        <el-button @click="toBack()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
import ajax from "../../common/js/ajax";
export default {
  data() {
    return {
        device:{
            ip:"",
            door:"",
            num:"",
            width:"",
            status:""
        },
        id:"",
        isAdmin:localStorage.getItem("isAdmin")
    };
  },
  methods: {
      add(){
          ajax(this,API.addDevice,"get",this.device,
          d=>{this.$router.replace("/index/device/list")},
          err=>{this.$message.error(err.data.info)}
          )
      },
      update() {
           delete this.device._id;
           console.log(this.device)
         ajax(this,API.updateDevice,"get",this.device,
          d=>{this.$router.replace("/index/device/list")},
          err=>{this.$message.error(err.data.info)}
          ) 
      },
      toBack(){
          this.$router.go(-1)
      }
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {
   
    this.id = this.$route.query.id;
    if (this.id != 0) {
      this.$http({
        url: API.findDevice,
        mehtod: "get",
        params: { id: this.id }
      }).then(d => {
        if (d.data.isok) {
          this.device = d.data.data[0];
        }
      });
    } else {
    }
  },
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';
  .container >>> .el-form-item__label{
  font-size 16px 
  color $font-color4
}
 .container >>> .el-radio__label{
   color #000000
   font-size 16px
   font-weight bold
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