<template>
  <div class="container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="头像" prop="head_pic">
        <el-upload
          class="avatar-uploader"
          action="/api/common/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          ,
          :headers="{
            Accesstoken: $store.getters['user/accessToken'],
          }"
        >
          <img
            v-if="ruleForm.head_pic"
            :src="ruleForm.head_pic"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item v-if="id" label="用户名" prop="username">
        <el-input
          v-model="ruleForm.username"
          placeholder="请输入用户名"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item v-else label="用户名" prop="username">
        <el-input
          v-model="ruleForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>

      <el-form-item label="角色" prop="role_id">
        <el-select v-model="ruleForm.role_id" placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="id" label="密码">
        <el-input
          v-model="ruleForm.password"
          placeholder="前请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item v-else label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="前请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="ruleForm.phone"
          placeholder="前请输入手机号"
        ></el-input>
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
  import { UcenterService } from "@/services";
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
        defaultProps: {
          children: "children",
          label: "name",
        },
        ruleForm: {
          username: "",
          password: "",
          phone: "",
          head_pic: "",
          role_id: "",
        },
        imageUrl: "",
        roles: [],
        rules: {
          head_pic: [
            { required: true, message: "请上传头像", trigger: "blur" },
          ],
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入登录密码", trigger: "blur" },
          ],
          phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
          role_id: [
            { required: true, message: "请输选择角色", trigger: "change" },
          ],
        },
      };
    },
    created() {
      this.getAllRole();
      if (this.id) {
        this.getdetail();
      }
    },
    methods: {
      getAllRole() {
        UcenterService.getAllRole().then((res) => {
          this.roles = res.data || [];
        });
      },
      getdetail() {
        UcenterService.getdetail({ id: this.id }).then((res) => {
          this.ruleForm = res.data;
        });
      },
      handleAvatarSuccess(res, file) {
        if (res.code * 1 === 0) {
          this.ruleForm.head_pic = res.data;
        } else {
          this.notify({
            type: "error",
            msg: res.msg,
          });
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            let apiname = "addUser";
            if (this.type == "edit") {
              apiname = "editUser";
            }
            UcenterService[apiname](this.ruleForm).then((res) => {
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
