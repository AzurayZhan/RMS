<template>
  <div>
    <h3 class="title">{{$route.name}}</h3>
    <div class="container">
      <el-button class="create" @click="toCreate(0)" type="primary">添加</el-button>
      <el-table :data="user" style="width: 100%" max-height="400px">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="name" label="账号" width="100"></el-table-column>
        <el-table-column prop="tel" label="电话" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="idx" label="身份证号" width="200"></el-table-column>
        <el-table-column prop="des" label="备注" width="120"></el-table-column>
        <el-table-column prop="time" label="生日"  width="120"></el-table-column>
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
      user: []
    };
  },
  methods: {
    init() {
      ajax(
        this,
        API.findUser,
        "get",
        {},
        d => {
          // console.log(d)
          this.user = d.data.data;
        },
        err => {
          this.$message.error(err.data.info);
        }
      );
    },
    toCreate(id) {
      this.$router.replace("/index/user/create?id=" + id);
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
            API.delUser,
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