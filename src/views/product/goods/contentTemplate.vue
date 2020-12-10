<template>
  <div class="container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="商品名称" prop="product_name" class="form-item">
        <el-input
          v-model="ruleForm.product_name"
          type="textarea"
          :rows="2"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="product_name">
        <el-select v-model="ruleForm.cate_id" placeholder="请选择">
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
      <el-form-item label="商品描述" prop="product_desc" class="form-item">
        <el-input
          v-model="ruleForm.product_desc"
          placeholder="请输入商品描述，最多50个字符"
          type="textarea"
          :rows="2"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="product_img" class="form-item">
        <el-upload
          class="avatar-uploader"
          action="/api/common/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :headers="{
            Accesstoken: $store.getters['user/accessToken'],
          }"
        >
          <img
            v-if="ruleForm.product_img"
            :src="ruleForm.product_img"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="海报图片" prop="product_poster" class="form-item">
        <el-upload
          class="avatar-uploader"
          action="/api/common/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :headers="{
            Accesstoken: $store.getters['user/accessToken'],
          }"
        >
          <img
            v-if="ruleForm.product_poster"
            :src="ruleForm.product_poster"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="库存" prop="stock" class="form-item">
        <el-input-number
          v-model="ruleForm.stock"
          :min="1"
          label="请输入库存"
        ></el-input-number>
        <input type="hidden" :value="totalStock" />
        <span class="stock-remark">
          *如果有商品规格，库存以商品规格库存为准
        </span>
      </el-form-item>
      <el-form-item label="商品单价" prop="product_price" class="form-item">
        <el-input
          v-model="ruleForm.product_price"
          placeholder="请输入商品价格"
        ></el-input>
      </el-form-item>

      <el-form-item label="最高价格" prop="product_price_max" class="form-item">
        <el-input
          v-model="ruleForm.product_price_max"
          placeholder="填写后会和商品价格生成价格范围"
        ></el-input>
      </el-form-item>

      <el-form-item label="划线价格" class="form-item" prop="del_price">
        <el-input
          v-model="ruleForm.del_price"
          placeholder="请输入划线价格"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品规格">
        <el-row v-for="(item, index) in ruleForm.sku" :key="index">
          <el-col :span="12">
            <div style="padding-bottom: 10px">
              <el-input
                v-model="item.sku_title"
                placeholder="请输入规格名称"
                style="width: 160px"
              ></el-input>
            </div>
            <div style="margin-bottom: 10px">
              <el-tag
                v-for="tag in item.sku_values"
                :key="tag"
                closable
                size="medium"
                :disable-transitions="false"
                style="margin-right: 10px"
                @close="handleClose(tag, index)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="item.inputVisible"
                v-model="item.inputValue"
                class="input-new-tag"
                size="small"
                autofocus
                @keyup.enter.native="handleInputConfirm(index)"
                @blur="handleInputConfirm(index)"
              ></el-input>
              <el-button
                v-else
                type="info"
                size="mini"
                icon="el-icon-plus"
                @click="showInput(index)"
              >
                添加规格值
              </el-button>
            </div>
          </el-col>
          <el-col :span="6">
            <el-button
              type="info"
              icon="el-icon-close"
              circle
              @click="delSku(index)"
            ></el-button>
          </el-col>
        </el-row>
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="addSku">
            新增商品规格
          </el-button>
        </div>

        <div v-if="ruleForm.skuValues.length > 0" style="margin-top: 10px">
          <el-table :data="ruleForm.skuValues" border style="width: 800px">
            <el-table-column prop="sku_name" label="规格值"></el-table-column>
            <el-table-column prop="sku_img" label="图片" width="160">
              <template slot-scope="scope">
                <div style="padding-bottom: 5px">
                  <el-upload
                    class="sku-value"
                    action="/api/common/upload"
                    :show-file-list="false"
                    :on-success="
                      (response, file, fileList) =>
                        uploadSkuImg(scope.$index, response)
                    "
                    :headers="{
                      Accesstoken: $store.getters['user/accessToken'],
                    }"
                  >
                    <img
                      v-if="scope.row.sku_img"
                      :src="scope.row.sku_img"
                      class="sku-value"
                    />
                    <i v-else class="el-icon-plus sku-value-icon"></i>
                  </el-upload>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="单价" width="180">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.sku_price"
                  placeholder="请输入单价"
                  @blur="regPrice(scope.$index, scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="库存" width="180">
              <template slot-scope="scope">
                <!-- <el-input type="Number" v-model="scope.row.sku_stock" placeholder="请输入库存"></el-input> -->
                <el-input-number
                  v-model="scope.row.sku_stock"
                  :min="1"
                  label="请输入库存"
                ></el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item label="是否上架" class="form-item">
        <el-switch v-model="ruleForm.is_bool_sale"></el-switch>
      </el-form-item>
      <el-form-item label="商品轮播图" prop="product_arr_imgs">
        <el-upload
          action="/api/common/upload"
          list-type="picture-card"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-success="uploadSuccess"
          :on-remove="handleRemove"
          :headers="{
            Accesstoken: $store.getters['user/accessToken'],
          }"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item
        label="商品介绍"
        prop="product_introduce"
        style="width: 70%"
      >
        <vue-neditor-wrap
          v-model="ruleForm.product_introduce"
          :config="myConfig"
          :destroy="false"
          @ready="ready"
        ></vue-neditor-wrap>
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
        <el-button v-if="!id" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { GoodsProductService } from "@/services";
  import VueNeditorWrap from "vue-neditor-wrap";
  import editor from "@/config/editor";
  export default {
    components: {
      VueNeditorWrap,
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
        } else if (value == "") {
          callback();
        } else if (value === null) {
          callback();
        } else {
          callback(new Error("请正确输入价格"));
        }
      };
      return {
        defaultProps: {
          children: "children",
          label: "name",
        },
        ruleForm: {
          product_name: "",
          cate_id: "",
          product_desc: "",
          product_img: "",
          product_poster: "",
          stock: 1,
          product_price: "",
          product_price_max: "",
          del_price: "",
          sku: [],
          skuValues: [],
          is_sale: 0,
          is_bool_sale: false,
          product_arr_imgs: [],
          product_details_imgs: "",
          product_introduce: "",
        },
        imageUrl: "",
        dialogImageUrl: "",
        dialogVisible: false,
        cates: [],
        myConfig: editor.myConfig,
        fileList: [],
        //
        rules: {
          product_name: [
            { required: true, message: "请输入商品名称", trigger: "blur" },
          ],
          product_desc: [
            { required: true, message: "请输入商品描述", trigger: "blur" },
          ],
          product_img: [
            { required: true, message: "请上传商品图片", trigger: "change" },
          ],
          product_poster: [
            { required: true, message: "请上传海报图片", trigger: "change" },
          ],
          stock: [{ required: true, message: "请输入库存", trigger: "blur" }],
          product_price: [
            { required: true, message: "请输入商品价格", trigger: "blur" },
            { validator: checkPrice, trigger: "blur" },
          ],
          del_price: [{ validator: checkPrice, trigger: "blur" }],
          product_price_max: [{ validator: checkPrice, trigger: "blur" }],
          product_arr_imgs: [
            { required: true, message: "请上传商品轮播图", trigger: "change" },
          ],
          product_introduce: [
            { required: true, message: "请输入商品介绍", trigger: "blur" },
          ],
        },
      };
    },
    computed: {
      totalStock: function () {
        let that = this;
        let total = 0;
        this.ruleForm.skuValues.forEach((item, index) => {
          total += item.sku_stock * 1;
        });
        return total;
      },
    },
    watch: {
      totalStock(val) {
        this.ruleForm.stock = val;
      },
    },
    created() {
      this.getCateList();
      this.changeSkuValues();
    },
    methods: {
      regPrice(index, item) {
        if (
          !/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(item.sku_price)
        ) {
          item.sku_price = "";
        }
      },
      //
      skuResult(strStack, arrGroup, index) {
        let that = this;
        if (index + 1 > arrGroup.length) {
          return;
        }
        var arr = arrGroup[index];
        var nextIndex = index + 1;
        for (var i = 0; i < arr.length; i++) {
          strStack.push(arr[i]);
          this.skuResult(strStack, arrGroup, nextIndex);
          if (nextIndex + 1 > arrGroup.length) {
            that.ruleForm.skuValues.push({
              sku_name: strStack.join(","),
              sku_img: "",
              sku_price: "",
              sku_stock: 1,
            });
          }
          if (strStack.length > 0) {
            strStack.pop();
          }
        }
      },
      //
      funcSkuValues(arrStack, strStack, arrGroup, size, index) {
        if (index + 1 > arrGroup.length) {
          return;
        }
        var nextIndex = index + 1;
        arrStack.push(arrGroup[index]);
        if (arrStack.length == size) {
          this.skuResult(strStack, arrStack, 0);
        }
        this.funcSkuValues(arrStack, strStack, arrGroup, size, nextIndex);
        if (arrStack.length > 0) {
          arrStack.pop();
        }
        this.funcSkuValues(arrStack, strStack, arrGroup, size, nextIndex);
      },
      //
      uploadSkuImg(index, res) {
        if (res.code * 1 === 0) {
          this.ruleForm.skuValues[index].sku_img = res.data;
        } else {
          this.notify({
            type: "error",
            msg: res.msg,
          });
        }
      },
      //
      handleClose(tag, index) {
        this.ruleForm.sku[index].sku_values.splice(
          this.ruleForm.sku[index].sku_values.indexOf(tag),
          1
        );
        this.ruleForm.sku[index].sku_value = this.ruleForm.sku[
          index
        ].sku_values.join(",");
        this.changeSkuValues();
      },
      showInput(index) {
        this.$set(this.ruleForm.sku[index], "inputVisible", true);
      },
      handleInputConfirm(index) {
        let inputValue = this.ruleForm.sku[index].inputValue;
        if (inputValue) {
          if (this.ruleForm.sku[index].sku_values.indexOf(inputValue) > -1) {
            this.notify({
              type: "error",
              msg: "规格值不能重复！",
            });
            this.ruleForm.sku[index].inputVisible = false;
            this.ruleForm.sku[index].inputValue = "";
            return false;
          }
          this.ruleForm.sku[index].sku_values.push(inputValue);
          this.ruleForm.sku[index].sku_value = this.ruleForm.sku[
            index
          ].sku_values.join(",");
          this.changeSkuValues();
        }
        this.ruleForm.sku[index].inputVisible = false;
        this.ruleForm.sku[index].inputValue = "";
      },
      changeSkuValues() {
        //sku-value
        let that = this;
        that.ruleForm.skuValues = [];
        var arrGroup = [];
        this.ruleForm.sku.forEach((item, index) => {
          if (item.sku_values.length > 0) {
            arrGroup.push(that.deepClone(item.sku_values));
          }
        });
        var arrStack = [];
        var strStack = [];
        that.funcSkuValues(arrStack, strStack, arrGroup, arrGroup.length, 0);
        //
      },
      addSku() {
        this.ruleForm.sku.push({
          sku_title: "",
          sku_value: "",
          sku_values: [],
        });
      },
      delSku(index) {
        this.ruleForm.sku.splice(index, 1);
        this.changeSkuValues();
      },
      //
      ready(editorSetting) {
        if (this.id) {
          this.getdetail();
        }
      },
      handleRemove(file, fileList) {
        let that = this;
        this.ruleForm.product_arr_imgs = [];
        fileList.forEach((item) => {
          if (item.response.code * 1 === 0) {
            that.ruleForm.product_arr_imgs.push(item.response.data);
          }
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadSuccess(response, file, fileList) {
        let that = this;
        this.ruleForm.product_arr_imgs = [];
        fileList.forEach((item) => {
          if (item.response.code * 1 === 0) {
            that.ruleForm.product_arr_imgs.push(item.response.data);
          }
        });
      },
      getCateList() {
        GoodsProductService.getCateList({}).then((res) => {
          this.cates = res.data || [];
        });
      },
      getdetail() {
        GoodsProductService.getProductInfo({ id: this.id }).then((res) => {
          if (res.data) {
            res.data.is_bool_sale = res.data.is_sale * 1 === 1 ? true : false;
            this.fileList = res.data.product_arr_imgs.map((item, index) => {
              return {
                url: item,
                response: {
                  code: 0,
                  data: item,
                  msg: "SUCCESS",
                },
              };
            });
            this.ruleForm = res.data;
          }
        });
      },
      handleAvatarSuccess(res, file) {
        if (res.code * 1 === 0) {
          this.ruleForm.product_img = res.data;
        } else {
          this.notify({
            type: "error",
            msg: res.msg,
          });
        }
      },
      handleAvatarSuccess2(res, file) {
        if (res.code * 1 === 0) {
          this.ruleForm.product_poster = res.data;
        } else {
          this.notify({
            type: "error",
            msg: res.msg,
          });
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.ruleForm.product_details_imgs = this.ruleForm.product_arr_imgs.join(
            ","
          );
          if (
            this.ruleForm.product_price_max &&
            this.ruleForm.product_price_max * 1 <=
              this.ruleForm.product_price * 1
          ) {
            this.notify({
              type: "error",
              msg: "最高价格必须大于商品单价",
            });
            return false;
          }
          this.ruleForm.is_sale = this.ruleForm.is_bool_sale ? 1 : 0;
          // console.log("this.ruleForm", JSON.stringify(this.ruleForm));
          if (valid) {
            let apiname = "addProduct";
            if (this.type == "edit") {
              apiname = "editProduct";
            }
            GoodsProductService[apiname](this.ruleForm).then((res) => {
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
        this.$refs[formName].resetFields();
      },
    },
  };
</script>

<style>
  .form-item {
    width: 500px;
  }

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

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }

  .sku-value .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .sku-value .el-upload:hover {
    border-color: #409eff;
  }
  .sku-value-icon {
    font-size: 18px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .sku-value {
    width: 60px;
    height: 60px;
    display: block;
    /* border: 1px dashed #d9d9d9; */
  }

  .stock-remark {
    padding-left: 10px;
    font-size: 12px;
    color: #999;
    display: inline-block;
    vertical-align: bottom;
    line-height: 12px;
  }
</style>
