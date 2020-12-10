<template>
  <div class="container">
    <div class="form-group">
      <el-form
        ref="searchForm"
        :inline="true"
        :model="form"
        class="demo-form-inline"
      >
        <el-form-item label="优惠券名称">
          <el-input
            v-model="form.coupon_name"
            placeholder="请输入优惠券名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search(true)">
            查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-group">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="jumpPage('/addcoupon')"
      >
        新增
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border="">
      <el-table-column
        prop="coupon_name"
        label="优惠券名称"
        width="180"
        align="left"
      ></el-table-column>

      <el-table-column
        prop="full_money"
        label="满减金额/元"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="denomination"
        label="面额/元"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="grant_num"
        label="发放数量"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="receive_num"
        label="限领/人"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column label="参与商品" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.is_home * 1 === 0 ? "部分" : "全部" }}
        </template>
      </el-table-column>
      <el-table-column label="是否显示首页" width="120" align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.is_home * 1 === 1"
            type="success"
            effect="dark"
          >
            是
          </el-tag>
          <el-tag v-if="scope.row.is_home * 1 === 0" type="info" effect="dark">
            否
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.is_disabled * 1 === 1"
            type="danger"
            effect="dark"
          >
            已禁用
          </el-tag>
          <el-tag
            v-if="scope.row.is_disabled * 1 === 0"
            type="success"
            effect="dark"
          >
            已启用
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="有效时间" align="left" width="240">
        <template slot-scope="scope">
          <div>开始时间：{{ scope.row.start_time }}</div>
          <div>结束时间：{{ scope.row.end_time }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="优惠券描述"
        min-width="240"
        align="left"
        prop="describe"
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
            @click.stop="jumpPage(`/editcoupon?id=${scope.row.id}`)"
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
        :current-page="form.page"
        :page-sizes="[10, 200, 300, 400]"
        :page-size="form.pageSize"
        @size-change="changeSize"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import { MarketingService } from "@/services";
  export default {
    name: "Table2",
    data() {
      return {
        tableData: [],
        total: 0,
        form: {
          page: 1,
          pageSize: 10,
          coupon_name: "",
        },
      };
    },
    created() {
      this.search(true);
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
      search(rest = false) {
        if (rest) {
          this.form.page = 1;
        }
        MarketingService.searchCoupon(this.form).then((res) => {
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
            MarketingService.delCoupon({ id: item.id }).then((res) => {
              this.notify({
                type: "success",
                message: "删除成功!",
              });
              this.form.page = 1;
              this.search();
            });
          })
          .catch(() => {
            this.notify({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      resetForm(formName) {
        this.form = {
          page: 1,
          pageSize: 10,
          product_name: "",
          cate_id: "",
        };
        this.search();
      },
    },
  };
</script>
<style scoped>
  .container {
    padding: 20px;
  }
  .btn-group {
    padding: 10px 0 10px;
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
