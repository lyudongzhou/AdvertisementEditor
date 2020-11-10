<template>
  <div class="flex-container them-dark-bg them-dark-text space-around">
    <div class="full-width"></div>
    <div class="full-width">
      <components></components>
    </div>
    <div class="full-width text-right">
      <main-operators></main-operators>
    </div>
  </div>
</template>

<script>
  import Components from './Components.vue';
  import MainOperators from './MainOperator.vue';
  export default {
    components: {
      Components,
      MainOperators
    }
  }
</script>