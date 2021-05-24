<template lang="html">
  <div class="edit_chart_window" v-if="thData||tdData">
    <div class="title">编辑图表数据</div>
    <div class="content">
      <div class="data_operation">
        <button class="add_operation" v-if="thData" @click="addRow">添加行</button>
        <button v-if="thData" @click="removeRow">删除行</button>
        <button class="add_operation" @click="addColumn">添加列</button>
        <button @click="removeColumn">删除列</button>
      </div>
      <div class="table">
        <table>
          <tr>
            <th></th>
            <th class="list" v-for="(name,index) in tdData" :key="index">
              <!-- {{tdData[index]}} -->
              <input :value="name.name||name"
                     @focus="handleFocus('currentTD', [tdData[index]])"
                     @input="name.name?changeValue(tdData[index],'name'):changeValue(tdData,index)" />
            </th>
          </tr>
          <!-- 饼图 -->
          <tr v-if="thData==null">
            <td class="list">0</td>
            <td v-for="(name,index) in tdData" :key="index">
              <input type="number" :value="name.value"
                     @focus="handleFocus('currentTD',[tdData[index]])"
                     @input="changeValue(tdData[index], 'value')" />
            </td>
          </tr>
          <!-- other -->
          <tr v-else v-for="(serie,index) in thData" :key="index">
            <td class="list">
              <input :value="serie.name"
                     @focus="handleFocus('currentTH',[thData[index]])"
                     @input="changeValue(thData[index], 'name')" />
            </td>
            <td v-for="(data,ind) in serie.data" :key="ind">
              <input type="number" :value="data"
                     @focus="handleFocus('currentTH,currentTD', [thData[index],tdData[ind]])"
                     @input="changeValue(thData[index].data, ind)" />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="buttons">
      <button class="cancel" @click="handleCancle">取消</button>
      <button class="correct" @click="handleCorrect">确定</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'editChartWindow',
    data () {
      return {
        thData: null,
        tdData: null,
        currentTH: null,
        currentTD: null,
      }
    },
    mounted () {
      this.$event.on('EDITCHARTWINDOW', (thData, tdData) => {
        this.thData = thData;
        this.tdData = tdData;
      })
    },
    methods: {
      changeValue (targetData, key) {
        let value = event.currentTarget.value;
        this.$set(targetData, key, value===""?[]:value);
      },
      addColumn () {
        let data = !this.thData?{
          value: 0,
          name: '图表'
        }:'图表';
        this.tdData.push(data);
        if (this.thData) {
          this.thData.forEach(every=>{
            every.data.push(0);
          })
        }
      },
      addRow () {
        let arr = [];
        for (let i=0;i<this.tdData.length;i++) {
          arr.push(i);
        }
        let data = {
          name: "c",
          data: arr,
          type: this.thData[0].type
        };
        this.thData.push(data);
      },
      removeRow () {
        if (this.currentTH&&this.thData.length>1) {
          this.thData.splice(this.thData.findIndex(item=>item===this.currentTH), 1);
          this.currentTH = null;
        }
      },
      removeColumn () {
        let findIndex = this.tdData.findIndex(item=>item===this.currentTD);
        if (this.tdData.length>1) {
          if (this.currentTD) {
            // 饼图
            this.tdData.splice(findIndex, 1);
            this.currentTD = null;
            if (this.thData) {
              // other,需要删除series的数据
              this.thData.forEach(child=>{
                child.data.splice(findIndex, 1);
              })
            }
          }
        }
      },
      handleCancle () {
        this.thData = null;
        this.tdData = null
      },
      handleCorrect () {
        this.$event.emit('CORRECTCHARTWINDOW', this.thData, this.tdData);
        this.handleCancle();
      },
      // check current operation
      handleFocus (data,value) {
        let obj=data.split(',');
        obj.forEach((child,index)=>{
          this[child] = value[index];
        })
      },
    },
    watch: {
    }
  }
</script>

<style lang="less" scoped>
  .edit_chart_window {
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
      margin: 0 20px 0 37px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
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
      .table {
        overflow: scroll;
        width: 95%;
        ::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
        table {
          width: 100%;
        }
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
            min-width: 100px;
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
