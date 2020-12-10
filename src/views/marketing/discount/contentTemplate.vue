<template>
  <div class="container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="活动名称" prop="name" class="form-item">
        <el-input
          v-model="ruleForm.name"
          placeholder="前请输入活动名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="ruleForm.status" :label="0">启用</el-radio>
        <el-radio v-model="ruleForm.status" :label="1">禁用</el-radio>
      </el-form-item>
      <el-form-item label="有效时间" prop="end_time">
        <el-date-picker
          v-model="effective_time"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getDateTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="参与商品">
        <div>
          <el-button
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="changePartake"
          >
            选择商品
          </el-button>
        </div>

        <div style="padding-top: 10px">
          <el-table :data="tableData" border style="width: 850px">
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
              prop="stock"
              label="库存"
              align="center"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="product_price"
              label="单价/元"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column label="折扣1-99%" align="center" width="160">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.discount"
                  :min="1"
                  :max="99"
                  label="折扣"
                ></el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="type == 'add'"
          type="primary"
          @click="submitForm('ruleForm')"
        >
          立即创建
        </el-button>
        <el-button
          v-if="type == 'edit'"
          type="primary"
          @click="submitForm('ruleForm')"
        >
          保存
        </el-button>
        <el-button v-if="type == 'add'" @click="resetForm('ruleForm')">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <content-template
      :show="is_show"
      :list="tableData"
      @close="is_show = false"
      @confim="selectGoods"
    ></content-template>
  </div>
</template>

<script>
  import { MarketingService } from "@/services";
  import contentTemplate from "../productTemplate";
  export default {
    components: {
      contentTemplate,
    },
    props: {
      id: {
        type: [String, Number],
        default: () => "",
      },
      type: {
        type: String,
        default: () => "add",
      },
    },
    data() {
      return {
        ruleForm: {
          name: "",
          status: 0,
          start_time: "",
          end_time: "",
        },
        effective_time: "",
        is_show: false,
        tableData: [],
        rules: {
          name: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
          ],
          start_time: [
            { required: true, message: "请选择活动有效日期", trigger: "blur" },
          ],
          end_time: [
            { required: true, message: "请选择活动有效日期", trigger: "blur" },
          ],
        },
      };
    },
    created() {
      if (this.id) {
        this.getDiscountInfo();
      }
    },
    methods: {
      changePartake() {
        this.is_show = true;
      },
      getDateTime(val) {
        this.ruleForm.start_time = val[0];
        this.ruleForm.end_time = val[1];
      },
      getDiscountInfo() {
        MarketingService.getDiscountInfo({ id: this.id }).then((res) => {
          if (res.data) {
            this.effective_time = [res.data.start_time, res.data.end_time];
            this.ruleForm = res.data;
            this.tableData = res.data.products || [];
          }
        });
      },
      selectGoods(ids, list) {
        list = list.map((item) => {
          if (!item.discount) {
            item.discount = 95;
          }
          return item;
        });
        this.tableData = list || [];
      },
      submitForm(formName) {
        let that = this;
        this.ruleForm.discountProductAdds = [];
        this.tableData.forEach((item) => {
          that.ruleForm.discountProductAdds.push({
            product_id: item.id,
            discount: item.discount,
          });
        });
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let apiname = "addDiscount";
            if (this.type == "edit") {
              apiname = "editDiscount";
            }
            MarketingService[apiname](this.ruleForm).then((res) => {
              this.notify({
                type: "success",
                msg: "保存成功!",
              });
              this.$router.go(-1);
            });
          }
        });
      },
      resetForm(formName) {
        let that = this;
        this.$refs[formName].resetFields();
      },
    },
  };
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  .form-item {
    width: 500px;
  }
</style>
