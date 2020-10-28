<template>
  <div class="container">
    <div class="form-group">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input
            v-model="form.order_sn"
            placeholder="请输入订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="省份">
          <el-select v-model="form.province" placeholder="活动区域">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-group">
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
      <el-button type="danger" icon="el-icon-delete">删除</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="toggleSelection"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="order_sn"
        label="订单号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column label="性别" width="80" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.sex * 1 === 1" class="el-icon-male sex-male"></i>
          <i
            v-if="scope.row.sex * 1 === 0"
            class="el-icon-female sex-female"
          ></i>
        </template>
      </el-table-column>
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
        prop="province"
        label="省份"
        align="center"
      ></el-table-column>
      <el-table-column label="创建时间" align="center" min-width="180">
        <template slot-scope="scope">
          {{ formatTime(scope.row.create_at, "Y-m-d H:i:s") }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" min-width="180">
        <template slot-scope="scope">
          {{ formatTime(scope.row.upadte_at, "Y-m-d H:i:s") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
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
        :page-size="10"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import { UcenterService } from "@/services";
  import { tableData } from "./data";
  export default {
    name: "Table",
    data() {
      return {
        tableData: tableData,
        total: 1000,
        form: {
          name: "",
          province: "",
          order_sn: "",
        },
      };
    },
    created() {
      // UcenterService.getdetail({ order_id: 50, gather_agent_id: 0 }).then(
      //   (res) => {
      //     console.log("res", res);
      //   }
      // );
    },
    methods: {
      /**
       * 搜索
       */
      search() {},
      /**
       * 多选
       */
      handleSelectionChange(val) {
        // console.log('val', val);
      },
      /**
       * 编辑
       */
      editItem(item, index) {
        console.log(item, index);
      },
      toggleSelection(row, column, event) {
        this.$refs.multipleTable.toggleRowSelection(row);
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
