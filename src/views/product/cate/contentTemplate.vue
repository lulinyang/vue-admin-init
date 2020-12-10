<template>
  <div class="container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="分类名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="前请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类图片" prop="img">
        <el-upload
          class="avatar-uploader"
          action="/api/common/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :headers="{
            Accesstoken: $store.getters['user/accessToken'],
          }"
        >
          <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="排序值" prop="name">
        <el-input-number
          v-model="ruleForm.sort"
          :min="1"
          :max="999"
          label="排序"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="ruleForm.pid" placeholder="请选择">
          <el-option
            v-for="item in cates"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="ruleForm.is_enable"></el-switch>
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
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { GoodsProductService } from "@/services";
  export default {
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
        cates: [],
        defaultProps: {
          children: "children",
          label: "name",
        },
        ruleForm: {
          name: "",
          img: "",
          pid: 0,
          enabled: 1,
          is_enable: true,
          sort: 0,
        },
        rules: {
          name: [{ required: true, message: "请输入分类名", trigger: "blur" }],
          img: [{ required: true, message: "请上传分类图片", trigger: "blur" }],
        },
      };
    },
    created() {
      this.getPidCate();
    },
    methods: {
      getCateInfo() {
        GoodsProductService.getCateInfo({ id: this.id }).then((res) => {
          if (res.data) {
            res.data.is_enable = res.data.enabled * 1 === 0 ? false : true;
            this.ruleForm = res.data;
          }
        });
      },
      getPidCate() {
        GoodsProductService.getPidCate({ pid: 0 }).then((res) => {
          this.cates = res.data || [];
          this.cates.unshift({
            name: "顶级分类",
            pid: 0,
            id: 0,
          });

          if (this.id) {
            this.getCateInfo();
          }
        });
      },
      submitForm(formName) {
        this.ruleForm.enabled = this.ruleForm.is_enable ? 1 : 0;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let apiname = "addCate";
            if (this.type == "edit") {
              apiname = "editCate";
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
      handleAvatarSuccess(res, file) {
        if (res.code * 1 === 0) {
          this.ruleForm.img = res.data;
        } else {
          this.notify({
            type: "error",
            msg: res.msg,
          });
        }
      },
      resetForm(formName) {
        let that = this;
        this.$refs[formName].resetFields();
      },
    },
  };
</script>

<style>
  .demo-ruleForm {
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
</style>
