<template>
  <div>
    <h3 class="title">{{$route.name}}</h3>
    <div class="container">
      <el-button class="create" @click="toCreate(0)" type="primary">添加</el-button>
      <el-table :data="info" style="width: 100%" max-height="400px">
        <el-table-column type="index" label="序号" width="150"></el-table-column>
        <el-table-column prop="name" label="账号" width="150"></el-table-column>
        <el-table-column prop="prop" label="属性" width="150"></el-table-column>
        <el-table-column prop="time" label="时间" width="250"></el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="toCreate(scope.row.id)">查看</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
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
      info: []
    };
  },
  methods: {
    //加载数据封装函数
    init() {
      ajax(
        this,
        API.findManage,
        "get",
        {},
        d => {
          this.info = d.data.data;
        },
        err => {
          this.$message.error(err.data.info);
        }
      );  
    },

    toCreate(id) {
      this.$router.replace("/index/manage/create?id=" + id);
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
            API.delManage,
            "get",
            { id: id },
            d => {
              this.init();
            },
            err => {
              this.$message.error(err.data.info)
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
  color: #ffffff;
}

.create {
  margin-bottom: 10px;
}
</style>