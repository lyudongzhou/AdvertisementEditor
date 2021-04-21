<template>
  <designer @submit="handleSubmit" ref="designer"></designer>
</template>
<script>
import designer from "./Designer.vue";
import { SUBMIT_PROJECT } from "./constant/event";
import { mapGetters, mapMutations, mapState } from "./store/index";
import { clone } from "@/utils";

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { get } from "@/register";
import { REG_GETRES } from "@/const";
import defaultJson from "../../testData/defaultJson.json";
import manager from "./manager/snapShot";


const resourceVisitor = {
  component: (schema, context) => {
    let fun = get(REG_GETRES)[schema.type];
    if (fun) {
      let arr = fun(schema);
      arr.forEach((ele) => {
        if (ele) {
          context.resource.add(ele);
        }
      });
    }

    // if (schema.type === "ImageCmp") {
    // }
    // todo 其他组件
  },
  container(schema, context) {
    let aResources = [];
    if (schema.bgm.src) {
      aResources.push(schema.bgm.src);
    }
    return aResources;
    // todo 处理对应资源
  },
  page(schema, context) {
    let arr = [];
    if (schema.container.backGround.type === "image") {
      arr.push(schema.container.backGround.value);
    }
    schema.container.bgMusic.music.forEach((ele) => {
      arr.push({
        name: ele.resName,
        uuid: ele.uuid,
        url: ele.sourcePaht,
      });
      // arr.push({url:ele.sourcePaht});
    });
    arr.forEach((ele) => {
      context.resource.add(ele);
    });
    return arr;
    // todo 处理对应资源
  },
  dialog(schema, context) {
    let arr = [];
    if (schema.container.backGround.type === "image") {
      arr.push(schema.container.backGround.value);
    }
    schema.container.bgMusic.music.forEach((ele) => {
      arr.push({
        name: ele.resName,
        uuid: ele.uuid,
        url: ele.sourcePaht,
      });
    });
    arr.forEach((ele) => {
      context.resource.add(ele);
    });
    return arr;
    // todo 处理对应资源
  },
};

export default {

  components: {
    designer,
  },
  data() {
    return {};
  },
  mounted() {
    this.initProject();
    this.init();
    this.$event.on(SUBMIT_PROJECT, (payload) => {
      this.handleSubmit(payload);
    });
  },
  computed: {
    ...mapState(["projectInfo"]),
    ...mapGetters(["pages"]),
  },
  methods: {
    ...mapMutations(["setProgramInfo"]),
    handleSubmit(payload) {
      console.log(payload)
      const isCreate = !payload.id;
      const url = `/program/update`;
      // const url = `/program/${isCreate ? "add" : "update"}`;
      const resource = this.getResource(payload.schema);
      console.log(resource);
      const bodyJson = JSON.stringify(
        { ...clone(payload.schema), resource },
        null,
        4
      );
      // 处理首页封面
      let pagesId = this.pages[0].id;
      let pagesData = manager.getResult(pagesId);
      this.$axios.post("/program/uploadCover", { file: pagesData }).then(({ data }) => {
        // 获取封面图的uuid
        console.log('coverUuid:' + data);
        let postBody = {
          bodyJson,
          name: this.projectInfo.name,
          resolutionWidth: payload.schema.container.width,
          resolutionHeight: payload.schema.container.height,
          coverUuid: data
        }
        // if (!isCreate) {
          postBody.programId = payload.id;
        // }
        this.$axios
        .post(url, postBody)
        .then(({ data }) => {
          if (isCreate) {
            const urlSearchParams = new URLSearchParams(location.hash);
            urlSearchParams.append("id", data.id);
            location.hash = urlSearchParams.toString();
          }
          this.$message({ message: "操作成功！", type: "success" });
        });
        
      });
    },
    init() {
      if (PRODUCTION) {
        window.addEventListener("beforeunload", function (e) {
          const confirmationMessage = "请确认是否离开页面";
          (e || window.event).returnValue = confirmationMessage; //Gecko + IE
          return confirmationMessage;
        });
      }
    },
    initProject() {
      const urlSearchParams = new URLSearchParams(location.search);
      const urlHashParams = new URLSearchParams(location.hash);
      let id = urlSearchParams.get("id") || urlHashParams.get("id");
      let programType = urlSearchParams.get("programType") || urlHashParams.get("programType");
      // if (!PRODUCTION) {
      //   id = id || 1
      // }
      if (id) {
        this.$axios.post("/program/get", { programId: id,programType: programType }).then(({ data }) => {
          let { id, name, description, programData } = data;
          // 引用情况&&不是新增后刷新的
          if (
            urlSearchParams.get("action") === "quote" &&
            !urlHashParams.get("id")
          ) {
            id = null;
          }
          this.setProgramInfo({ id, name, description });
          if(programType){
            if(data.body === ""){
              var copyJson = JSON.parse(JSON.stringify(defaultJson));
              copyJson.container.width = data.width;
              copyJson.container.height = data.height;
              this.$refs.designer.openProject(copyJson);
            }else{
              this.$refs.designer.openProject(JSON.parse(data.body));
            }
          }else{
            this.$refs.designer.openProject(programData);
          }
        });
      } else {
        this.$refs.designer.openProject(defaultJson);
      }
    },
    getResource(schema) {
      const resource = new Set();
      this.traversalSchema(schema, resourceVisitor, { resource });
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
          schema[key].forEach((page) => {
            visitor[visitorKey] && visitor[visitorKey](page, context);
            if (visitor.component && page.components) {
              page.components.forEach((component) => {
                visitor.component(component, context);
              });
            }
          });
        }
      };
      traversalPageLike("pages", "page");
      traversalPageLike("dialogs", "dialog");
    },
  },
};
</script>
<style>
</style>
