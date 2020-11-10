<template>
    <li class="moveItem">
        <slot></slot>
    </li>
</template>
<script>
export default {
    name:"baseCmp",
    props:["layoutConfig"]
}
</script>
<style scoped>
.moveItem{
    display: block;
    position: absolute;
}
</style>