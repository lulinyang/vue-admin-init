<template>
  <div class="container">
    <div class="form-group">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-group">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="jumpPage('/adduser')"
      >
        新增
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="160"
        align="left"
      ></el-table-column>
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 45px; height: 45px"
            :src="scope.row.head_pic"
            :preview-src-list="[scope.row.head_pic]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="角色"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="create_at"
        label="创建时间"
        align="center"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="updated_at"
        label="更新时间"
        align="center"
        min-width="180"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" min-width="200">
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
    <div>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[10, 200, 300, 400]"
        :page-size="form.pageSize"
        @size-change="changeSize"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import { UcenterService } from "@/services";
  export default {
    name: "Table2",
    data() {
      return {
        tableData: [],
        total: 0,
        form: {
          page: 1,
          username: "",
          pageSize: 10,
        },
      };
    },
    created() {
      this.search();
    },
    methods: {
      /**
       * 跳转
       */
      jumpPage(page) {
        this.$router.push(page);
      },
      /**
       * 搜索
       */
      search() {
        UcenterService.userList(this.form).then((res) => {
          this.tableData = res.data.data || [];
          this.total = res.data.total || 0;
          this.pageSize = res.data.pageSize || 10;
        });
      },
      /**
       * 改变页码
       */
      changeSize(size) {
        this.form.page = 1;
        this.form.pageSize = size;
        this.search();
      },
      /**
       * 改变分页
       */
      changePage(page) {
        this.form.page = page;
        this.search();
      },
      /**
       * 编辑
       */
      editItem(item, index) {
        console.log(item, index);
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
            this.notify({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.notify({
              type: "info",
              message: "已取消删除",
            });
          });
      },
    },
  };
</script>
<style scoped>
  .container {
    padding: 20px;
  }
  .btn-group {
    padding: 0px 0 20px;
  }
  .sex-male {
    font-size: 18px;
    font-weight: 600;
    color: #409eff;
  }
  .sex-female {
    font-size: 18px;
    font-weight: 600;
    color: #f56c6c;
  }
</style>
