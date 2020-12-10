<template>
  <div>
    <content-template :id="id" type="edit"></content-template>
  </div>
</template>

<script>
  import contentTemplate from "./contentTemplate";
  export default {
    components: { contentTemplate },
    data() {
      return {
        id: this.$route.query.id,
      };
    },

    methods: {},
  };
</script>

<style scoped></style>
