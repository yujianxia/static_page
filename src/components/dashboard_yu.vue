<template>
  <div class="dashboard_page">
    <!-- 头部 -->
    <div class="dashboard_header">
      <span class="fs14">2020/8/5 下午16:28:04</span>
      <span class="fs14 header_title">Aslink监控</span>
      <span class="fs14 pointer">全屏显示</span>
    </div>
    <!-- 展示数据 -->
    <div class="view_main">
      <!-- 上半部分 -->
      <div class="view_main_top">
        <div class="view_main_top_l">
          <!-- 各航司实时总量 -->
          <div class="fs14 view_main_title">各航司实时总量</div>
          <p>
            <span> <span style="color: #677b94;">成航：</span>567474756</span>
            <span> <span style="color: #677b94;">藏航：</span>654757548</span>
          </p>
          <p>
            <span> <span style="color: #677b94;">川航：</span>34737357373</span>
            <span> <span style="color: #677b94;">其他：</span>78047673</span>
          </p>
          <!-- 各航司每日总量 -->
          <div class="fs14 view_main_title">各航司每日总量</div>
          <div id="myCharts" class="daily_total_chart" ref="myCharts"></div>
        </div>
        <div class="view_main_top_m">
          <!-- 总报文量 -->
          <div class="view_main_top_m_total">
            总报文量：
          </div>
          <div class="fs14 view_main_title">各航司实时总量</div>
        </div>
        <div class="view_main_top_r">
          <div class="fs14 view_main_title">川航</div>
          <div class="donut_chart_box">
            <div>
              <div class="doug_chart_style" ref="doug_chart"></div>
            </div>
            <div>
              <div class="doug_chart_style" ref="doug_chart1"></div>
            </div>
            <div>345</div>
          </div>
          <div class="fs14 view_main_title">藏航</div>
          <div class="donut_chart_box">
            <div>123</div>
            <div>234</div>
            <div>345</div>
          </div>
        </div>
      </div>
      <!-- 下半部分 -->
      <div class="view_main_bottom">
        <!-- 第一个缓存区 -->
        <div style="padding-right: 10px;">
          <div class="fs14 view_main_title">tv缓存点</div>
          <div class="cache_chart" ref="myCharts111"></div>
        </div>
        <!-- 第二个缓存区 -->
        <div style="padding-right: 10px;">
          <div class="fs14 view_main_title">ev缓存点</div>
          <div class="cache_chart" ref="myCharts222"></div>
        </div>
        <!-- 第三个缓存区 -->
        <div>
          <div class="fs14 view_main_title">tu缓存点</div>
          <div class="cache_chart" ref="myCharts333"></div>
        </div>
        <!-- 第四个缓存区 -->
        <div style="padding-left: 10px;">
          <div class="fs14 view_main_title">redis和mq缓存点</div>
          <div class="cache_chart" ref="myCharts444"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CircleComp from "./circle.vue";
export default {
  name: "dashboard_page",
  components: {
    CircleComp
  },
  data() {
    return {
      nowTime: "" //当前时间
    };
  },
  created() {},
  mounted() {
    // 图标
    const doug_chart = this.$echarts.init(this.$refs.doug_chart);
    let option_doug_chart = {
      title: {
        text: "你好",
        left: "center",
        top: "2%",
        textStyle: {
          color: "#00ce7d",
          fontSize: 12,
          align: "center",
          fontWeight:"400"
        }
      },
      color: ["#00ce7d", "#213b58"], //环形颜色

      series: [
        {
          name: "",
          type: "pie",
          radius: ["60%", "70%"],
          avoidLabelOverlap: false,
          // silent: true, 
          // hoverAnimation: false,
          hoverOffset : 3,
          center:["50%","58%"],
          label: {
            normal: {
              show: true,
              position: "center",
              textStyle: {
                //设置文字样式
                fontSize: "12",
                color: "#00ce7d"
              },
              formatter: function(data) {
                if (data.name === '直接访问') {
                  return data.value +"\n"+ data.percent +"%";
                }else{
                  return ''
                }
              }
            },
          },
          data: [
            { value: 100, name: "直接访问"},
            { value: 330, name: "总量" }
          ]
        }
      ]
    };
    doug_chart.setOption(option_doug_chart);
    doug_chart.dispatchAction({ type: 'highlight', dataIndex: 0 });
    // 图标

    // 图标
    const doug_chart1 = this.$echarts.init(this.$refs.doug_chart1);
    let option_doug_chart1 = {
      title: {
        text: "你好",
        left: "center",
        top: "2%",
        textStyle: {
          color: "#42b6f6",
          fontSize: 12,
          align: "center",
          fontWeight:"400"
        }
      },
      color: ["#42b6f6", "#213b58"], //环形颜色

      series: [
        {
          name: "",
          type: "pie",
          radius: ["60%", "70%"],
          avoidLabelOverlap: false,
          // silent: true, 
          // hoverAnimation: false,
          hoverOffset : 3,
          center:["50%","58%"],
          label: {
            normal: {
              show: true,
              position: "center",
              textStyle: {
                //设置文字样式
                fontSize: "12",
                color: "#42b6f6"
              },
              formatter: function(data) {
                if (data.name === '直接访问') {
                  return data.value +"\n"+ data.percent +"%";
                }else{
                  return ''
                }
              }
            },
          },
          data: [
            { value: 100, name: "直接访问"},
            { value: 330, name: "总量" }
          ]
        }
      ]
    };
    doug_chart1.setOption(option_doug_chart1);
    doug_chart1.dispatchAction({ type: 'highlight', dataIndex: 0 });
    // 图标




    // 第一个图表
    const myCharts = this.$echarts.init(this.$refs.myCharts);
    let options = {
      color: [
        "green",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#749f83",
        "#ca8622"
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: "10px",
        left: "10px",
        right: "14px",
        bottom: "18px",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["08-12", "08-13", "08-14", "08-15", "08-16", "08-17", "08-18"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontsize: "12"
            },
            interval: 0,
            rotate: -30 //文字倾斜角度
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#213853"],
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff"
            },
            formatter: function(value) {
              return value / 1000 + "k";
            }
          }
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          data: [3246460, 356432, 3351, 3354, 3940, 3234230, 323230]
        },
        {
          name: "邮件营销",
          type: "bar",
          stack: "广告",
          data: [3246460, 356432, 3351, 3354, 3940, 3234230, 323230]
        },
        {
          name: "联盟广告",
          type: "bar",
          stack: "广告",
          data: [3246460, 356432, 3351, 3354, 3940, 3234230, 323230]
        }
      ]
    };
    myCharts.setOption(options);

    const myCharts111 = this.$echarts.init(this.$refs.myCharts111);
    const myCharts222 = this.$echarts.init(this.$refs.myCharts222);
    const myCharts333 = this.$echarts.init(this.$refs.myCharts333);
    const myCharts444 = this.$echarts.init(this.$refs.myCharts444);
    let option111 = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: "category",
        data: ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"]
      },
      series: [
        {
          name: "2011年",
          type: "bar",
          data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
          name: "2012年",
          type: "bar",
          data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
      ]
    };

    myCharts111.setOption(option111);
    myCharts222.setOption(option111);
    myCharts333.setOption(option111);
    myCharts444.setOption(option111);
  },
  beforeDestroy() {},
  methods: {}
};
</script>
<style lang="scss">
p {
  margin: 0;
  padding: 0;
}
.dashboard_page {
  .pointer {
    cursor: pointer;
  }
  .fs12 {
    font-size: 12px;
  }
  .fs14 {
    font-size: 14px;
  }
  .fs16 {
    font-size: 16px;
  }
  color: #fff;
  word-break: break-all;
  width: 100vw;
  height: 100vh;
  background-color: #17273b;
  // color: #00ce7d;
  // color: #42b6f6;
  // color: #ff9560;
  // color: #e55541;
  // color: #fff04b;
  // color: #f95aff;
  .dashboard_header {
    background-color: #1c344f;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
    .header_title {
      font-size: 20px;
      letter-spacing: 3px;
    }
  }
  .view_main {
    // outline: 1px solid red;
    width: 100%;
    height: calc(100vh - 60px);
    padding: 0 10px;
    box-sizing: border-box;
    .view_main_title {
      height: 36px;
      line-height: 36px;
      background-color: #1c344f;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .view_main_top {
      display: flex;
      height: 45%;
      .view_main_top_l {
        padding-right: 10px;
        box-sizing: border-box;
        width: 25%;
        & > p {
          font-size: 12px;
          height: 30px;
          padding: 0 10px;
          box-sizing: border-box;
          background-color: #1c3049;
          display: flex;
          & > span {
            display: inline-block;
            line-height: 30px;
            width: 50%;
            height: 100%;
            border-bottom: 1px solid #213853;
          }
        }
        .daily_total_chart {
          width: 100%;
          height: calc(100% - 134px);
          background-color: #1c3049;
        }
      }
      .view_main_top_m {
        // outline: 1px solid red;
        width: 50%;
        .view_main_top_m_total {
          height: 50px;
          text-align: center;
          background-color: #1c3049;
        }
      }
      .view_main_top_r {
        // outline: 1px solid red;
        padding-left: 10px;
        box-sizing: border-box;
        width: 25%;
        .donut_chart_box {
          width: 100%;
          height: calc((100% - 72px) / 2);
          background-color: #1c3049;
          display: flex;
          & > div {
            width: calc(100% / 3);
            height: 100%;
            .doug_chart_style {
              height: 100%;
            }
          }
        }
      }
    }
    .view_main_bottom {
      margin-top: 10px;
      display: flex;
      height: calc(55% - 10px);
      display: flex;
      & > div {
        width: 25%;
        box-sizing: border-box;
        height: 100%;
        .cache_chart {
          width: 100%;
          height: calc(100% - 36px);
          background-color: #1c3049;
        }
      }
    }
  }
}
</style>
