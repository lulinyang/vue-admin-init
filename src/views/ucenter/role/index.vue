<template>
  <div class="container">
    <div class="form-group">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="角色名">
          <el-input
            v-model="form.username"
            placeholder="请输入角色名"
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
        @click="jumpPage('/addrole')"
      >
        新增
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="rolename"
        label="机构名称"
        align="left"
        width="280"
      ></el-table-column>
      <el-table-column
        prop="desc"
        label="描述"
        align="left"
        min-width="280"
      ></el-table-column>
      <el-table-column
        prop="host"
        label="上传域名"
        align="left"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="bucket"
        label="上传空间"
        align="left"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="region"
        label="上传区域"
        align="center"
        min-width="80"
      ></el-table-column>
      <el-table-column
        prop="access_key"
        label="ACCESS-KEY"
        align="center"
        min-width="360"
      ></el-table-column>
      <el-table-column
        prop="secret_key"
        label="SECRET-KEY"
        align="center"
        min-width="360"
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
      <el-table-column label="操作" fixed="right" min-width="200" align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click.stop="jumpPage(`/editrole?id=${scope.row.id}`)"
          >
            编辑
          </el-button>
          <el-button
            v-if="$store.getters['user/username'] == 'admin'"
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
    name: "RoleList",
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
      console.log(this.$store.getters["user/username"]);
      this.search();
    },
    methods: {
      jumpPage(page) {
        this.$router.push(page);
      },
      /**
       * 搜索
       */
      search() {
        UcenterService.roleList(this.form).then((res) => {
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
            UcenterService.delRole({ id: item.id }).then((res) => {
              this.notify({
                type: "success",
                msg: "删除成功!",
              });
              this.form.page = 1;
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
