<template>
  <div id="dataModel" class="dataModel">
    <div v-for="(item,index) in dataArr" :key="index" :class="{no_border_right : index == (dataArr.length - 1)}">
      <p>{{item.title}}：</p>
      <p>{{item.value || 0}}
        <span v-if="item.unit">{{item.unit}}</span>
        <span v-else>元</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "dataCount",
  props: {
    /**
     * 父组件传一个数组(如下)，自动计算宽度
     * [{
     * title: "",  标题
     * value: "",  值
     * unit: ""    单位(默认‘元’)
     * }]
     */
    childData: Array
  },
  data() {
    return {
      dataArr: []
    };
  },
  created() {
    this.dataArr = this.childData;
  },
  mounted() {
    this.calculateWdith();
  },
  methods: {
    calculateWdith() {
      this.$nextTick(function() {
        let itemWidth = parseInt(100 / this.dataArr.length);
        let divArr = document.getElementById("dataModel").children;
        for (const iterator of divArr) {
          iterator.style.width = itemWidth + "%";
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.dataModel {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #bbb;
  .no_border_right {
    border-right: none;
  }
  div {
    border-right: 1px solid #bbb;
    height: 60px;
    text-align: center;
    p {
      margin: 0;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
