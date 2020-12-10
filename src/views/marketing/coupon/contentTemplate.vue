<template>
  <div class="container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="名称" prop="coupon_name" class="form-item">
        <el-input
          v-model="ruleForm.coupon_name"
          placeholder="前请输入优惠券名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="describe" class="form-item">
        <el-input
          v-model="ruleForm.describe"
          placeholder="前请输入优惠券描述"
          type="textarea"
          :row="2"
        ></el-input>
      </el-form-item>
      <el-form-item label="满减金额" prop="full_money" class="form-item">
        <el-input
          v-model="ruleForm.full_money"
          placeholder="前请输入优惠券满减金额"
        ></el-input>
      </el-form-item>
      <el-form-item label="面额" prop="denomination" class="form-item">
        <el-input
          v-model="ruleForm.denomination"
          placeholder="前请输入优惠券面额"
        ></el-input>
      </el-form-item>
      <el-form-item label="发放数量" prop="grant_num">
        <el-input-number
          v-model="ruleForm.grant_num"
          :min="1"
          label="发放数量"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="领取数/人" prop="receive_num">
        <el-input-number
          v-model="ruleForm.receive_num"
          :min="1"
          label="每人最大领取数"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="显示首页">
        <el-switch
          v-model="ruleForm.is_home"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="ruleForm.is_disabled" :label="0">启用</el-radio>
        <el-radio v-model="ruleForm.is_disabled" :label="1">禁用</el-radio>
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
        <el-radio v-model="ruleForm.is_partake" :label="0">全场</el-radio>
        <el-radio v-model="ruleForm.is_partake" :label="1">部分</el-radio>

        <div v-if="ruleForm.is_partake * 1 === 1" style="padding-top: 10px">
          <el-button
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="changePartake"
          >
            选择商品
          </el-button>
        </div>

        <div v-if="ruleForm.is_partake * 1 === 1" style="padding-top: 10px">
          <el-table :data="tableData" border style="width: 800px">
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
      var checkPrice = (rule, value, callback) => {
        if (/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(value)) {
          callback();
        } else {
          callback(new Error("请正确输入价格"));
        }
      };
      return {
        cates: [],
        defaultProps: {
          children: "children",
          label: "name",
        },
        ruleForm: {
          coupon_name: "",
          describe: "",
          full_money: "",
          denomination: "",
          grant_num: 1,
          receive_num: 1,
          is_home: 0,
          is_disabled: 0,
          is_partake: 0,
          start_time: "",
          end_time: "",
        },
        effective_time: "",
        is_show: false,
        tableData: [],
        rules: {
          coupon_name: [
            { required: true, message: "请输入优惠券名称", trigger: "blur" },
          ],
          describe: [
            { required: true, message: "请输入优惠券描述", trigger: "blur" },
          ],
          full_money: [
            {
              required: true,
              message: "请输入优惠券满减金额",
              trigger: "blur",
            },
            { validator: checkPrice, trigger: "blur" },
          ],
          denomination: [
            { required: true, message: "请输入优惠券面额", trigger: "blur" },
            { validator: checkPrice, trigger: "blur" },
          ],
          start_time: [
            {
              required: true,
              message: "请选择优惠券有效日期",
              trigger: "blur",
            },
          ],
          end_time: [
            {
              required: true,
              message: "请选择优惠券有效日期",
              trigger: "blur",
            },
          ],
        },
      };
    },
    created() {
      if (this.id) {
        this.getCouponInfo();
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
      getCouponInfo() {
        MarketingService.getCouponInfo({ id: this.id }).then((res) => {
          if (res.data) {
            this.effective_time = [res.data.start_time, res.data.end_time];
            this.ruleForm = res.data;
            this.tableData = res.data.products || [];
          }
        });
      },
      selectGoods(ids, list) {
        this.ruleForm.product_ids = ids.join(",");
        this.tableData = list || [];
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let apiname = "addCoupon";
            if (this.type == "edit") {
              apiname = "editCoupon";
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
