<template>
  <div class="container">
    <div class="btn-group">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="jumpPage('/addcate')"
      >
        新增分类
      </el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="name"
        label="分类名"
        width="240"
        align="left"
      ></el-table-column>
      <el-table-column label="图片" width="300" align="left">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.pid * 1 === 0"
            style="width: 80px; height: 30px"
            :src="scope.row.img"
            :preview-src-list="[scope.row.img]"
            fit="fit"
          ></el-image>
          <el-image
            v-if="scope.row.pid * 1 > 0"
            :src="scope.row.img"
            :preview-src-list="[scope.row.img]"
            fit="fit"
            style="width: 30px; height: 30px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="排序值"
        width="100"
        align="center"
        prop="sort"
      ></el-table-column>
      <el-table-column label="是否启用" width="100" align="center" prop="sort">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.enabled * 1 === 1"
            type="success"
            effect="dark"
          >
            启用
          </el-tag>
          <el-tag v-if="scope.row.enabled * 1 === 0" type="info" effect="dark">
            禁用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click.stop="editItem(scope.row, scope.$index)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click.stop="delItem(scope.row, scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { GoodsProductService } from "@/services";
  export default {
    data() {
      return {
        tableData: [],
      };
    },
    created() {
      this.search();
    },
    methods: {
      jumpPage(page) {
        this.$router.push(page);
      },
      search() {
        GoodsProductService.getCateList({}).then((res) => {
          this.tableData = res.data || [];
        });
      },
      editItem(item, index) {
        this.$router.push("/editcate?id=" + item.id);
      },
      /**
       * 删除
       */
      delItem(item, index) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            GoodsProductService.deleteCate({ id: item.id }).then((res) => {
              this.notify({
                type: "success",
                msg: "删除成功!",
              });
              this.search();
            });
          })
          .catch(() => {
            this.notify({
              type: "info",
              msg: "已取消删除",
            });
          });
      },
    },
  };
</script>

<style scoped></style>
