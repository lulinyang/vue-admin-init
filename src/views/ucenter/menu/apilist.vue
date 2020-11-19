<template>
  <div class="container">
    <div class="form-group">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input
            v-model="form.order_sn"
            placeholder="请输入订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="省份">
          <el-select v-model="form.province" placeholder="活动区域">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table ref="multipleTable" :data="tableData" style="width: 100%" border>
      <el-table-column prop="url" label="路由" width="180"></el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="160"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="num"
        label="访问量"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="desc"
        label="描述"
        align="left"
        width="240"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        min-width="180"
        prop="create_at"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        min-width="180"
        prop="updated_at"
      ></el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        min-width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click.stop="editItem(scope.row, scope.$index)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="show" width="550px">
      <el-form ref="ruleForm" :model="infoform" :rules="rules">
        <el-form-item label="路由" label-width="80px" prop="path">
          <el-input
            v-model.trim="infoform.url"
            disabled
            style="width: 60%"
            placeholder="请输入路由"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="80px" prop="name">
          <el-input
            v-model.trim="infoform.name"
            style="width: 60%"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="80px">
          <el-input
            v-model.trim="infoform.desc"
            style="width: 60%"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="editApi('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { UcenterService } from "@/services";
  export default {
    name: "ApiUrl",
    data() {
      return {
        tableData: [],
        total: 1000,
        form: {
          name: "",
          province: "",
          order_sn: "",
        },
        infoform: {
          name: "",
          desc: "",
        },
        show: false,
        rules: {
          name: [{ required: true, message: "请输入名称", trigger: "change" }],
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
        UcenterService.getAllUrl({}).then((res) => {
          this.tableData = res.data || [];
        });
      },
      /**
       * 编辑
       */
      editItem(item, index) {
        console.log(item, index);
        this.infoform = this.deepClone(item);
        this.show = true;
      },
      editApi(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            UcenterService.editApi(this.infoform).then((res) => {
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
            this.notify({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.notify({
              type: "info",
              message: "已取消删除",
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
