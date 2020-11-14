<template>
  <ul></ul>
</template>
<script>
export default {
  name: "singlePage",
  props: ["pageData", "pageIndex"],
  mounted() {
    console.log(this.pageData);
  }
};
</script>