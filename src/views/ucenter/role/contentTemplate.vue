<template>
  <div class="container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名" prop="name">
        <el-input
          v-model="ruleForm.rolename"
          placeholder="请输入角色名"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="ruleForm.desc" placeholder="前请输入描述"></el-input>
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
        <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        },
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
