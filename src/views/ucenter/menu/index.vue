<template>
  <div class="container">
    <div class="btn-group">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addItem({ pid: 0 }, 0, 0)"
      >
        新增一级菜单
      </el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="name"
        label="名称"
        width="240"
        align="left"
      ></el-table-column>
      <el-table-column label="类型" width="120" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.type * 1 === 0">菜单</div>
          <div v-if="scope.row.type * 1 === 1">按钮</div>
        </template>
      </el-table-column>
      <el-table-column label="图标" width="100" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="path"
        label="路由"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" align="right" min-width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.type * 1 === 0"
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click.stop="addItem(scope.row, scope.$index)"
          >
            添加子菜单/按钮
          </el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click.stop="editItem(scope.row, scope.$index)"
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

    <el-dialog
      :title="`${infoform.id ? '编辑' : '新增'}-菜单/按钮`"
      :visible.sync="show"
      width="550px"
    >
      <el-form ref="ruleForm" :model="infoform" :rules="rules">
        <el-form-item label="名称" label-width="80px" prop="name">
          <el-input
            v-model.trim="infoform.name"
            style="width: 60%"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="level == 0" label="图标" label-width="80px">
          <el-input
            v-model.trim="infoform.icon"
            style="width: 60%"
            placeholder="请输入图标"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由" label-width="80px" prop="path">
          <el-input
            v-model.trim="infoform.path"
            style="width: 60%"
            placeholder="请输入路由"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="level > 0" label="类型" label-width="80px">
          <el-radio v-model="infoform.type" :label="0">菜单</el-radio>
          <el-radio v-model="infoform.type" :label="1">按钮</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button
          v-if="infoform.id"
          type="primary"
          @click="editMenuApi('ruleForm')"
        >
          确 定
        </el-button>
        <el-button v-else type="primary" @click="addMenuApi('ruleForm')">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { UcenterService } from "@/services";
  export default {
    name: "Menu",
    data() {
      return {
        tableData: [],
        show: false,
        level: 0,
        infoform: {
          name: "",
          path: "",
          icon: "",
          type: 0,
          pid: 0,
        },
        currentItem: {},
        rules: {
          name: [{ required: true, message: "请输入名称", trigger: "change" }],
          path: [{ required: true, message: "请输入路由", trigger: "change" }],
        },
      };
    },
    created() {
      this.search();
    },
    methods: {
      /**
       * 搜索
       */
      search() {
        UcenterService.obtainMenus({ type: 1 }).then((res) => {
          this.tableData = res.data || [];
        });
      },
      /**
       * 新增
       */
      addItem(item, index, level = 1) {
        this.level = level;
        this.currentItem = item;
        this.infoform.pid = item.id;
        this.infoform.type = 0;
        this.infoform.name = "";
        this.infoform.path = "";
        this.infoform.icon = "";
        this.show = true;
      },
      addMenuApi(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            UcenterService.addmeun(this.infoform).then((res) => {
              this.show = false;
              this.notify({
                type: "success",
                msg: "添加成功",
              });
              this.search();
            });
          }
        });
      },
      editMenuApi(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            UcenterService.editmenu(this.infoform).then((res) => {
              this.show = false;
              this.notify({
                type: "success",
                msg: "保存成功",
              });
              this.search();
            });
          }
        });
      },
      /**
       * 编辑
       */
      editItem(item, index) {
        if (item.pid > 0) {
          this.level = 1;
        } else {
          this.level = 0;
        }
        this.infoform = this.deepClone(item);
        this.show = true;
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
            UcenterService.delMenu({ id: item.id }).then((res) => {
              this.notify({
                type: "success",
                msg: "删除成功!",
              });
              this.search();
            });
          })
          .catch(() => {
            this.notify({
              type: "info",
              msg: "已取消删除",
            });
          });
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
