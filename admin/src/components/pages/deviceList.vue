<template>
  <div>
    <h3 class="title">{{$route.name}}</h3>
    <div class="container">
      <el-button class="create" @click="toCreate(0)" type="primary" v-if="isAdmin!=2">添加</el-button>
      <el-table :data="device" style="width: 100%" max-height="400px">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="ip" label="ip" width="150"></el-table-column>
        <el-table-column prop="door" label="机房" width="120"></el-table-column>
        <el-table-column prop="num" label="编号" width="120"></el-table-column>
        <el-table-column prop="width" label="宽带" width="120"></el-table-column>
        <el-table-column prop="status" label="使用" width="120">
          <template slot-scope="scope">{{scope.row.status==0?"已出售":"空闲"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="toCreate(scope.row.id)" v-if="isAdmin!=2">查看</el-button>
            <el-button size="mini" type="primary" @click="toBuy(scope.row.status,scope.row.id)" :disabled="scope.row.status==0" v-if="isAdmin==2"
            >购买</el-button>
            <el-button size="mini" type="danger" v-if="isAdmin!=2" @click="del(scope.row.id)">删除</el-button>
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
      isAdmin: localStorage.getItem("isAdmin"),
      device: []
    };
  },
  methods: {
    init() {
      ajax(
        this,
        API.findDevice,
        "get",
        {},
        d => {
          // console.log(d);
          this.device = d.data.data;
        },
        err => this.$message.error(err.data.info)
      );
    },
    toCreate(id) {
      this.$router.replace("/index/device/create?id=" + id);
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
            API.delDevice,
            "get",
            { id: id },
            d => {
              this.init();
            },
            err => {
              this.$message.error(err.data.info);
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    toBuy(status, id) {
      // console.log(this.device);
      if (status == 1) {
        ajax(
          this,
          API.updateDevice,
          "get",
          { id: id, status: "0" },
          d => {
            // console.log(d);
            this.init()
          },
          err => this.$message.error(err.data.info)
        );
      }
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