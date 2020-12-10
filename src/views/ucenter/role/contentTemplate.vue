<template>
  <div class="container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="机构名" prop="name">
        <el-input
          v-model="ruleForm.rolename"
          placeholder="请输入机构名"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="ruleForm.desc" placeholder="前请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="上传域名" prop="host">
        <el-input
          v-model="ruleForm.host"
          placeholder="前请输入七牛云上传域名"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传空间" prop="bucket">
        <el-input
          v-model="ruleForm.bucket"
          placeholder="前请输入七牛云上传空间"
        ></el-input>
      </el-form-item>
      <el-form-item label="ACCESS-KEY" prop="access_key">
        <el-input
          v-model="ruleForm.access_key"
          placeholder="前请输入七牛云ACCESS-KEY"
        ></el-input>
      </el-form-item>
      <el-form-item label="SECRET-KEY" prop="secret_key">
        <el-input
          v-model="ruleForm.secret_key"
          placeholder="前请输入七牛云SECRET-KEY"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择七牛云上传区域">
          <el-option
            v-for="item in regions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单权限">
        <el-tree
          ref="tree"
          :data="menus"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="hasMenus"
          :props="defaultProps"
        ></el-tree>
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
        menus: [],
        defaultProps: {
          children: "children",
          label: "name",
        },
        hasMenus: [],
        ruleForm: {
          rolename: "",
          desc: "",
          menusids: "",
          host: "",
          bucket: "",
          access_key: "x0CiP_VUK8IrK_vkScMVR4rKcuodZvHcjqSr3qKW",
          secret_key: "Letcb267dE1HZhhEuiAmvU5rSr3SkLWxqcOrczjo",
          region: "华东",
        },
        regions: [
          {
            value: "华东",
            label: "华东",
          },
          {
            value: "华北",
            label: "华北",
          },
          {
            value: "华南",
            label: "华南",
          },
          {
            value: "北美",
            label: "北美",
          },
          {
            value: "东南亚",
            label: "东南亚",
          },
        ],
        rules: {
          rolename: [
            { required: true, message: "请输入角色名", trigger: "blur" },
          ],
          desc: [{ required: true, message: "请输入描述", trigger: "blur" }],
        },
      };
    },
    created() {
      this.obtainMenus();
    },
    methods: {
      getRoleInfo() {
        UcenterService.getRoleInfo({ id: this.id }).then((res) => {
          if (res.data) {
            this.ruleForm = res.data;
            let all = res.data.menusids.split(",");
            this.setKeys(all);
          }
        });
      },
      obtainMenus() {
        UcenterService.obtainMenus({ type: 1 }).then((res) => {
          this.menus = res.data || [];
          if (this.id) {
            this.getRoleInfo();
          }
        });
      },
      submitForm(formName) {
        let checkeds = this.$refs.tree.getCheckedKeys();
        let halfCheck = this.$refs.tree.getHalfCheckedKeys();
        this.ruleForm.menusids = checkeds.concat(halfCheck).join(",");
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let apiname = "addRole";
            if (this.type == "edit") {
              apiname = "editRole";
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
        let that = this;
        this.$refs.tree.setCheckedKeys([]);
        this.$refs[formName].resetFields();
      },
      setKeys(arr = []) {
        let aleryCheckeds = [];
        arr.forEach((item, index) => {
          if (this.$refs.tree.getNode(item).childNodes.length == 0) {
            aleryCheckeds.push(item);
          }
        });
        this.$refs.tree.setCheckedKeys(aleryCheckeds);
      },
    },
  };
</script>

<style scoped>
  .demo-ruleForm {
    width: 500px;
  }
</style>
