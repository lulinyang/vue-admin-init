<template>
  <div class="container">
    <div class="form-group">
      <el-form
        ref="searchForm"
        :inline="true"
        :model="form"
        class="demo-form-inline"
      >
        <el-form-item label="商品名">
          <el-input
            v-model="form.product_name"
            placeholder="请输入商品名"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="form.cate_id" placeholder="请选择">
            <el-option-group
              v-for="group in cates"
              :key="group.id"
              :label="group.name"
            >
              <el-option
                v-for="item in group.children"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-option-group>
          </el-select>
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
        @click="jumpPage('/addgoods')"
      >
        新增
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border="">
      <el-table-column
        prop="product_name"
        label="商品名"
        width="260"
        align="left"
      ></el-table-column>
      <el-table-column label="商品图片" width="100" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.product_img"
            :preview-src-list="[scope.row.product_img]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="cate_name"
        label="分类"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="product_price"
        label="单价/元"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="product_price_max"
        label="最高价格/元"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="del_price"
        label="划线价格/元"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="stock"
        label="库存"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column label="是否上架" width="100" align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.is_sale * 1 === 1"
            type="success"
            effect="dark"
          >
            已上架
          </el-tag>
          <el-tag v-if="scope.row.is_sale * 1 === 0" type="info" effect="dark">
            未上架
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="product_desc"
        label="商品描述"
        align="left"
        width="260"
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
            @click.stop="jumpPage(`/editgoods?id=${scope.row.id}`)"
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
  import { GoodsProductService } from "@/services";
  export default {
    name: "Table2",
    data() {
      return {
        tableData: [],
        total: 0,
        form: {
          page: 1,
          pageSize: 10,
          product_name: "",
          cate_id: "",
        },
        cates: [],
      };
    },
    created() {
      this.search();
      this.getCateList();
    },
    methods: {
      getCateList() {
        GoodsProductService.getCateList({}).then((res) => {
          this.cates = res.data || [];
        });
      },
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
        GoodsProductService.getProductList(this.form).then((res) => {
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
            GoodsProductService.delProduct({ id: item.id }).then((res) => {
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
