// 个人预存款调货
<template>
  <div class="person-cargo-count-page">
    <div id="testTip"></div>
    <div class="animationText loading">
      3.1 文字扫光效果 -webkit-keyframes
    </div>
  </div>
</template>
<script>
export default {
  name: "personCargo",
  data() {
    return {};
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = this.$echarts.init(document.getElementById("testTip"));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        },
        confine: true, //显示在图标区域内
        formatter: function(params) {
          let astr = "";
          params.forEach(ele => {
            astr += `
              <div class="itemStyle">
                <i style="background: ${ele.color};"></i>
                <span>${ele.seriesName}：${ele.value}</span>
              </div>
            `;
          });
          const allItem = `<div class="tooltipStyle">
            <p>${params[0].axisValueLabel}</p>
            ${astr}
          <div>`;
          return allItem;
        }
      },
      xAxis: [
        {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "邮件营销",
          type: "bar",
          stack: "广告",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "bar",
          stack: "广告",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "bar",
          stack: "广告",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "搜索引擎",
          type: "bar",
          data: [862, 1018, 964, 1026, 1679, 1600, 1570]
        },
        {
          name: "百度",
          type: "bar",
          barWidth: 5,
          stack: "搜索引擎",
          data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name: "谷歌",
          type: "bar",
          stack: "搜索引擎",
          data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
          name: "必应",
          type: "bar",
          stack: "搜索引擎",
          data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
          name: "其他",
          type: "bar",
          stack: "搜索引擎",
          data: [62, 82, 91, 84, 109, 110, 120]
        }
      ]
    });
  },
  methods: {}
};
</script>
<style lang="scss">
.pointer {
  cursor: pointer;
  color: #3f51b5;
}
.person-cargo-count-page {
  width: 100vw;
  height: 100vh;
  background: gray;
  #testTip {
    width: 300px;
    height: 300px;
  }
}
.tooltipStyle {
  // height: 300px;
  width: 426px;
  padding: 10px;
  border-radius: 8px;
  box-sizing: border-box;
  z-index: 9999999;
  & > p {
    margin: 0 0 4px;
    padding: 0;
  }
  .itemStyle {
    min-height: 24px;
    line-height: 24px;
    width: 134px;
    float: left;
    color: #fff;
    & > i {
      width: 10px;
      height: 10px;
      display: inline-block;
      border-radius: 50%;
    }
  }

  // 文字效果
}

// @keyframes masked-nimation {
//   0% {
//     // background-position: 0 0;
//     text-shadow: 0 0 10px, 0 0 4px;
//   }
//   20% {
//     // background-position: -100% 0;
//     text-shadow: 0 0 8px, 0 0 4px;
//   }
//   40% {
//     // background-position: -100% 0;
//     text-shadow: 0 0 6px, 0 0 4px;
//   }
//   60% {
//     // background-position: -100% 0;
//     text-shadow: 0 0 4px, 0 0 4px;
//   }
//   80% {
//     // background-position: -100% 0;
//     text-shadow: 0 0 6px, 0 0 4px;
//   }
//   100% {
//     // background-position: -100% 0;
//     text-shadow: 0 0 10px, 0 0 4px;
//   }
// }

@keyframes masked-nimation {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: -50% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
.animationText {


  width: 290px;
  height: 30px;
    margin: 0 auto;
    margin-top: 100px;
    font-size: 20px;
    text-align: center;
    background: -webkit-linear-gradient(left,#147B96,#1786c7 25%,#82cfe2 50%,#0594e6 75%,#147B96);
    // color: rgb(77, 211, 73); 
    color: transparent;
    -webkit-background-clip: text;  
    background-size: 200% 100%;
    animation: 2s masked-nimation infinite linear;
}
</style>
