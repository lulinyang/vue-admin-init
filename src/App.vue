<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App",
    mounted() {},
  };
</script>

<style>
  .container {
    padding: 20px;
  }
  .btn-group {
    padding: 0px 0 20px;
  }
  .el-dialog__header {
    padding: 25px;
  }
  .btn-primary-color {
    color: #409eff !important;
  }
  .btn-success-color {
    color: #67c23a !important;
  }
  .btn-warning-color {
    color: #e6a23c !important;
  }
  .btn-danger-color {
    color: #f56c6c !important;
  }
  .btn-info-color {
    color: #909399 !important;
  }
</style>
