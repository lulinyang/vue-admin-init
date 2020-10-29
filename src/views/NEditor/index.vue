<template>
  <div class="container">
    <div class="title">百度富文本</div>
    <vue-neditor-wrap
      v-model="content"
      :config="myConfig"
      :destroy="false"
      @ready="ready"
    ></vue-neditor-wrap>
  </div>
</template>

<script>
  import VueNeditorWrap from "vue-neditor-wrap";
  import editor from "@/config/editor";
  export default {
    name: "NEditor",
    components: {
      VueNeditorWrap,
    },
    data() {
      return {
        myConfig: editor.myConfig,
        content: "",
      };
    },
    methods: {
      ready(editorSetting) {
        console.log("editorSetting", editorSetting);
      },
    },
  };
</script>

<style scoped>
  .container {
    padding: 20px;
  }
  .title {
    padding-bottom: 20px;
  }
</style>
