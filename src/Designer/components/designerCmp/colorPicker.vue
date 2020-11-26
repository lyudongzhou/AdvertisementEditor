<template>
  <el-color-picker v-model="color" show-alpha></el-color-picker>
</template>

<script>
export default {
    name:"colorPicker",
    data(){
        return {
            color:1
        };
    }
}
</script>

<style>

</style>