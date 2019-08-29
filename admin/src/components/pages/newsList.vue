<template>
  <div>
    <h3 class="title">{{$route.name}}</h3>
    <div class="container">
      <el-button class="create" @click="toCreate(0)" type="primary" v-if="isAdmin!=2">添加</el-button>
      <el-table :data="news" style="width: 100%" max-height="400px">
        <el-table-column type="index" label="序号" width="150"></el-table-column>
        <el-table-column prop="tit" label="题目" width="150"></el-table-column>
        <el-table-column prop="con" label="内容" width="300"></el-table-column>
        <el-table-column prop="time" label="时间" width="150"></el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="toCreate(scope.row.id)">查看</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row.id)" v-if="isAdmin!=2">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
import ajax from "../../common/js/ajax";
export default {
  data() {
    return {
      news: [],
      isAdmin: localStorage.getItem("isAdmin")
    };
  },
  methods: {
    init() {
      ajax(
        this,
        API.findNews,
        "get",
        {},
        d => {
          console.log(d);
          this.news = d.data.data;
        },
        err => {
          this.$message.error(err.data.info);
        }
      );
    },
    toCreate(id) {
      this.$router.replace("/index/news/create?id=" + id);
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          ajax(
            this,
            API.delNews,
            "get",
            { id: id },
            d => {
              this.init();
            },
            err => {
              this.$message.error(d.data.info);
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {
    this.init();
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

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