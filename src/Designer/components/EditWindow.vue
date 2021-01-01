<template lang="html">
  <div class="edit_window" v-if="thData||tdData">
    <div class="title">编辑图表数据</div>
    <div class="content">
      <div class="data_operation">
        <button class="add_operation" v-if="thData">添加行</button>
        <button v-if="thData">删除行</button>
        <button class="add_operation">添加列</button>
        <button>删除列</button>
      </div>
      <table>
        <tr>
          <th></th>
          <th class="list" v-for="(name,index) in tdData" :key="index">
            <input :value="name.name||name"
                    @input="changeValue(tdData,index,'name.name')"/>
          </th>
        </tr>
        <tr v-if="thData==null">
          <td>0</td>
          <td v-for="(name,index) in tdData" :key="index">
            <input type="number" :value="name.value"
                   @input="changeValue(tdData,index,'name.value')"/>
          </td>
        </tr>
        <tr v-else v-for="(serie,index) in thData" :key="index">
          <td class="list">
            <input :value="serie.name"
                   @input="changeValue(thData,index,'name')"/>
          </td>
          <td v-for="(data,ind) in serie.data" :key="ind">
            <input type="number" :value="data"
                   @input="changeValue(thData,ind,'data.ind')"/>
          </td>
        </tr>
      </table>
    </div>
    <div class="buttons">
      <button class="cancel" @click="thData=null;tdData=null">取消</button>
      <button class="correct">确定</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'editWindow',
    data () {
      return {
        thData: null,
        tdData: null,
        currentTH: null,
        currentTD: null,
      }
    },
    mounted () {
      this.$event.on('edit-window', (thData, tdData) => {
        this.thData = thData;
        this.tdData = tdData;
      })
    },
    methods: {
      changeValue (targetData, index, path) {
        let value = event.currentTarget.value,
            arr   = path.split('.'),
            data  = targetData[index];
        arr.forEach(every=>{
          if (data.constructor === Object) {
            data = data[every];
          } else {
            data = value;
          }
        })
      },
    },
    watch: {
    }
  }
</script>

<style lang="less" scoped>
  .edit_window {
    width: 900px;
    height: 523px;
    position: absolute;
    margin: 50px auto 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    .title {
      height: 70px;
      background: #F7F7F7;
      border-radius: 5px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #75838F;
      line-height: 70px;
      padding-left: 34px;
    }
    .content {
      flex: 1;
      margin-left: 37px;
      .data_operation {
        display: flex;
        button {
          margin: 10px 0 18px 0;
          width: 120px;
          height: 45px;
          background: #FFFFFF;
          border-radius: 10px;
          border: 1px solid #666666;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          margin-right: 6px;
          outline: none;
          cursor: pointer;
        }
        .add_operation {
          border: 1px solid #1391FF;
          color: #1391FF;
        }
      }
      table {
        overflow: scroll;
        width: 95%;
        tr {
          width: 100%;
          display: flex;
          th,td {
            flex: 1;
            height: 51px;
            text-align: center;
            line-height: 51px;
            background: #FFFFFF;
            border: 1px solid #E2E2E2;
            box-sizing: border-box;
            min-width: 100px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
          }
          .list {
            background: #F2F2F2;
          }
          input {
            width: 100%;
            height: 100%;
            background: none;
            outline: none;
            text-align: center;
          }
        }
      }
    }
    .buttons {
      width: 100%;
      height: 65px;
      display: flex;
      justify-content: center;
      button {
        width: 130px;
        height: 45px;
        border-radius: 10px;
        border: 1px solid #1391FF;
        background: #FFFFFF;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1391FF;
      }
      button:last-child {
        margin-left: 28px;
        background: #1391FF;
        border: none;
        color: #FFFFFF;
      }
    }
  }
</style>
