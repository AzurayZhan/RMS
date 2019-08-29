<template>
  <div>
    <h3 class="title">{{$route.name}}</h3>
    <div class="container">
      <el-form ref="form" :model="news" label-width="100px">
        <el-form-item label="题目">
          <el-input v-model="news.tit"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="news.con"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="news.time"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button type="primary" v-if="id==0" @click="add()">添加</el-button>
        <el-button type="primary" v-if="id!=0" @click="update()"
        :disabled="isAdmin==2" >修改</el-button>
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
      news: {
        tit: "",
        con: "",
        time: ""
      },
      id: "",
      isAdmin:localStorage.getItem("isAdmin")
    };
  },
  methods: {
    add() {
      ajax(
        this,
        API.addNews,
        "get",
        this.news,
        d => {
          this.$router.replace("/index/news/list");
        },
        err => {
          this.$message.error(err.data.info);
        }
      );
    },
    update() {
        delete this.news._id;
      ajax(
        this,
        API.updateNews,
        "get",
        this.news,
        d => {
            // console.log(d)
          this.$router.replace("/index/news/list");
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
        url: API.findNews,
        mehtod: "get",
        params: { id: this.id }
      }).then(d => {
        if (d.data.isok) {
          this.news = d.data.data[0];
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

.create {
  margin-bottom: 10px;
}
</style>