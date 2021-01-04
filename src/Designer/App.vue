<template>
  <designer @submit="handleSubmit" ref="designer"></designer>
</template>
<script>

import designer from './Designer.vue';
import {SUBMIT_PROJECT} from './constant/event';
import {mapMutations} from './store/index';
import {clone} from '@/utils';

const resourceVisitor = {
  component: (schema, context) => {
    if (schema.type === 'ImageCmp') {
      context.resource.add(schema.props.bgUrl);
    }
  },
  container() {

  },
};

export default {
  components: {
    designer,
  },
  data () {
    return {
    }
  },
  created() {
    this.initProject();
    this.init();
    this.$event.on(SUBMIT_PROJECT, (payload) => {
      this.handleSubmit(payload);
    });
  },
  methods: {
    ...mapMutations(['setProjectId']),
    handleSubmit(payload) {
      const isCreate = !payload.id;
      const url = `/program/${isCreate ? 'add' : 'update'}`;
      const resource = this.getResource(payload.schema);
      const programData = {...clone(payload.schema), resource};
      this.$axios.post(url, {id: payload.id, programData}).then(({data}) => {
        if (isCreate) {
          const urlSearchParams = new URLSearchParams(location.hash);
          urlSearchParams.append('id', data.id);
          location.hash = urlSearchParams.toString();
        }
        this.$message({message: '操作成功！', type: 'success'});
      });
    },
    init() {
      if (PRODUCTION) {
        window.addEventListener("beforeunload", function(e) {
          const confirmationMessage = "请确认是否离开页面";
          (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
          return confirmationMessage;
        });
      }
    },
    initProject() {
      const urlSearchParams = new URLSearchParams(location.search);
      const urlHashParams = new URLSearchParams(location.hash);
      let id = urlSearchParams.get('id') || urlHashParams.get('id');
      id = !PRODUCTION ? id || 1 : id;
      const templateId = urlSearchParams.get('templateId');
      if (!id && templateId) {
        this.$axios.get('/template/get/id', {templateId: id}).then(({data}) => {
          this.$refs.designer.openProject(data.bodyJson);
        });
      } else if (id) {
        this.setProjectId(id);
        this.$axios.get('/program/get/id', {programId: id}).then(({data}) => {
          this.$refs.designer.openProject(data.programData);
        });
      }
    },
    getResource(schema) {
      const resource = new Set();
      this.traversalSchema(schema, resourceVisitor, {resource});
      return [...resource];
    },
    traversalSchema(schema, visitor, context) {
      if (!schema) {
        return;
      }
      if (visitor.container) {
        visitor.container(schema.container, context);
      }
      const traversalPageLike = (key, visitorKey) => {
        if (schema[key] && (visitor[visitorKey] || visitor.component)) {
          schema[key].forEach(page => {
            visitor[visitorKey] && visitor[visitorKey](page, context);
            if (visitor.component && page.components) {
              page.components.forEach(component => {
                visitor.component(component, context);
              });
            }
          });
        }
      };
      traversalPageLike('pages', 'page');
      traversalPageLike('dialogs', 'dialog');
    }
  }
};
</script>
<style>

</style>
