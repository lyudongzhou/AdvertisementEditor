<template>
  <ul class="container" :style="{height: '1080px', width: '1920px'}">
    <render-component @click="handleClick" v-for="component in components" :key="component.id" :component="component" :ref="component.id"></render-component>
  </ul>
</template>

<script>
  import {getPropByPath} from '../../Utils/utils';
  import RenderComponent from './RenderComponent';

  export default {
    components: {
      RenderComponent,
    },
    props: {
      json: Object,
      designMode: Boolean,
    },
    computed: {
      components() {
        return getPropByPath(this.json, 'pages[0].components', []);
      },

    },
    methods: {
      getStyle(component) {
        return component.layoutConfig;
      },
      handleClick($event, refId) {
        if (!this.designMode) {
          return;
        }
        console.info($event, refId);
        this.$emit('click', this.$refs[refId], refId);
      },
    },
  };
</script>

<style>
  .container {
    position: relative;
  }
</style>