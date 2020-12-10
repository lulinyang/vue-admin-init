<template>
  <el-dialog
    title="商品列表"
    :visible.sync="show"
    width="60%"
    :before-close="close"
  >
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
    <el-table
      ref="multipleTable"
      :data="tableData"
      :row-key="getRowKeys"
      @selection-change="handleSelectionChange"
      @row-click="toggleSelection"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
        :reserve-selection="true"
      ></el-table-column>
      <el-table-column
        prop="product_name"
        label="商品名"
        min-width="260"
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
        prop="stock"
        label="库存"
        align="center"
        width="100"
      ></el-table-column>
    </el-table>
    <el-row>
      <el-col :span="16">
        <div>
          <el-pagination
            style="text-align: left"
            background
            layout="total, prev, pager, next, jumper"
            :total="total"
            :current-page="form.page"
            :page-size="form.pageSize"
            @size-change="changeSize"
            @current-change="changePage"
          ></el-pagination>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="margin-top: 15px; text-align: right">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="save">保存选择</el-button>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
  import { GoodsProductService } from "@/services";
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      list: {
        type: Array,
        default: () => {
          return [];
        },
      },
    },
    data() {
      return {
        tableData: [],
        total: 0,
        form: {
          page: 1,
          pageSize: 5,
          product_name: "",
          cate_id: "",
        },
        cates: [],
        checkGoodsIds: [],
        checkGoods: [],
      };
    },
    watch: {
      show(val) {
        let that = this;
        if (val) {
          this.search(true);
          this.$nextTick(() => {
            this.list.forEach((row) => {
              this.$refs.multipleTable.toggleRowSelection(row, true);
            });
          });
        }
      },
    },
    created() {
      this.getCateList();
    },
    methods: {
      getCateList() {
        GoodsProductService.getCateList({}).then((res) => {
          this.cates = res.data || [];
        });
      },
      /**
       * 搜索
       */
      search(rest = false) {
        let that = this;
        if (rest) {
          this.form.page = 1;
        }
        GoodsProductService.getProductList(this.form).then((res) => {
          this.tableData = res.data.data || [];
          this.total = res.data.total || 0;
          this.pageSize = res.data.pageSize || 10;
        });
      },
      getRowKeys(row) {
        return row.id;
      },
      /**
       * 多选
       */
      handleSelectionChange(val) {
        let that = this;
        that.checkGoodsIds = [];
        that.checkGoods = [];
        val.forEach((element) => {
          that.checkGoodsIds.push(element.id);
          that.checkGoods.push(that.deepClone(element));
        });
      },
      toggleSelection(row, column, event) {
        this.$refs.multipleTable.toggleRowSelection(row);
      },
      /**
       * 改变页码
       */
      changeSize(size) {
        this.form.pageSize = size;
        this.search(true);
      },
      /**
       * 改变分页
       */
      changePage(page) {
        this.form.page = page;
        this.search();
      },
      resetForm(formName) {
        this.form = {
          page: 1,
          pageSize: 5,
          product_name: "",
          cate_id: "",
        };
        this.search();
      },
      close() {
        this.$refs.multipleTable.clearSelection();
        this.$emit("close");
      },
      save() {
        if (this.checkGoodsIds.length <= 0) {
          this.notify({
            type: "error",
            msg: "请选择商品",
          });
          return false;
        }
        this.$emit("confim", this.checkGoodsIds, this.checkGoods);
        this.$refs.multipleTable.clearSelection();
        this.$emit("close");
      },
    },
  };
</script>
<style scoped></style>
