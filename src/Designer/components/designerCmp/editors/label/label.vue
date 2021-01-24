<template>
    <div>{{text}}</div>
</template>

<script>

export default {
    name: "label",
    props: ["configData", "config"],
    data() {
      return {
        text: '',
      };
    },
    computed: {
    },
    mounted() {
      this.text =  this.config.label;
    },
    methods: {
    },
};
</script>

<style></style>
