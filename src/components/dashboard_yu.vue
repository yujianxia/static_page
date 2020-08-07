// 下载 cnpm install element-resize-detector
// 加了接口 
<template>
  <div id="dashboard_page" class="dashboard_page">
    <!-- 头部 -->
    <div class="dashboard_header opacity_6">
      <span class="fs14">{{nowTime}}</span>
      <span class="fs14 header_title">PSC-Aslink3生产运行实时监控</span>
      <span
        class="fs14 pointer"
        style="text-align: right;"
        @click="screen"
      >全屏显示</span>
    </div>
    <!-- 展示数据 -->
    <div class="view_main opacity_6">
      <!-- 上半部分 -->
      <div class="view_main_top">
        <div class="view_main_top_l">
          <!-- 各航司实时总量 -->
          <div class="fs14 view_main_title">各航司实时总量</div>
          <p>
            <span> <span style="color: #677b94;">成航：</span>{{totalEU}}</span>
            <span> <span style="color: #677b94;">藏航：</span>{{totalTV}}</span>
          </p>
          <p>
            <span> <span style="color: #677b94;">川航：</span>{{totalThree}}</span>
            <span> <span style="color: #677b94;">其他：</span>{{totalOther}}</span>
          </p>
          <!-- 各航司每日总量 -->
          <div class="fs14 view_main_title">各航司每日总量</div>
          <div
            class="daily_total_chart"
            ref="bar_chart"
          ></div>

        </div>
        <div class="view_main_top_m">
          <!-- 总报文量 -->
          <div class="view_main_top_m_total">
            <span class="fs14 top_m_total_title">总报文量</span>
            <!-- 滚动的总数 -->
            <div
              ref="count"
              style="position:relative"
            ></div>
          </div>
          <div class="fs14 view_main_title">各航司每半小时报文增量</div>
          <div
            class="increment_chart"
            ref="map_chart"
          ></div>
        </div>
        <div class="view_main_top_r">
          <div class="fs14 view_main_title">当日数据</div>
          <div class="donut_chart_box">
            <div>
              <div
                class="doug_chart_style"
                ref="doug_chart"
              ></div>
            </div>
            <div>
              <div
                class="doug_chart_style"
                ref="doug_chart1"
              ></div>
            </div>
            <div>
              <div
                class="doug_chart_style"
                ref="doug_chart2"
              ></div>
            </div>
          </div>
          <div class="fs14 view_main_title">当月数据</div>
          <div class="donut_chart_box">

            <div>
              <div
                class="doug_chart_style"
                ref="doug_chart3"
              ></div>
            </div>
            <div>
              <div
                class="doug_chart_style"
                ref="doug_chart4"
              ></div>
            </div>
            <div>
              <div
                class="doug_chart_style"
                ref="doug_chart5"
              ></div>
            </div>
          </div>

        </div>
      </div>
      <!-- 下半部分 -->
      <div class="view_main_bottom">
        <!-- tv 藏航 -->
        <div style="padding-right: 10px;">
          <div class="fs14 view_main_title">藏航缓存</div>
          <div
            class="cache_chart"
            ref="charts_tv"
          ></div>
        </div>
        <!-- eu 成航 -->
        <div style="padding-right: 10px;">
          <div class="fs14 view_main_title">成航缓存</div>
          <div
            class="cache_chart"
            ref="charts_eu"
          ></div>
        </div>
        <!-- tu 川航 -->
        <div>
          <div class="fs14 view_main_title">川航缓存</div>
          <div
            class="cache_chart"
            ref="charts_tu"
          ></div>
        </div>
        <!-- redis和mq缓存点 -->
        <div style="padding-left: 10px;">
          <div class="fs14 view_main_title">redis和mq缓存</div>
          <div
            class="cache_chart"
            ref="charts_redis_mq"
          ></div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _roll from "./rollnum/rollnum";
import TopLeftCmp from "./TopLeftCmp";
import echarts from 'echarts'
import screenfull from "screenfull";
import { mapGetters } from "vuex";
import * as dataView from "@/api/dataView";
const elementResizeDetectorMaker = require("element-resize-detector");
export default {
  name: "dashboard_page",
  components: {},
  data() {
    return {
      nowTime: "", //当前时间
      isFullscreen: false, //是否全屏
      timer2: null, //实时时间定时器
      timer3: null, //当月当日数据定时器
      myInterval: null, //缓存点轮询
      viewer: "", //总数
      totalEU: "", //EU
      totalThree: "", //3u
      totalOther: "", //其他
      totalTV: "", //tv
      cycle: {}, //缓存点
      TULines: [],
      OZLines: [],
      EULines: [],
      TVLines: [],
      CounterLines: [],
      mouthMessage: {}, //六个环形图的数据
      Monitoring: {},
      path: "ws://10.150.64.252:8081/aslink3.0-web/ws/monitor/", // websocket 地址
      websock: null, // websocket 实例
      elResizeMaker:null,
      optionColor: [
        "#00ce7d",
        "#42b6f6",
        "#ff9560",
        "#e55541",
        "#fff04b",
        "#f95aff",
      ],
      // 所有图表
      doug_chart:null,
      doug_chart1:null,
      doug_chart2:null,
      doug_chart3:null,
      doug_chart4:null,
      doug_chart5:null,
      charts_tv:null,
      charts_eu:null,
      charts_tu:null,
      charts_redis_mq:null,
      map_chart:null,
      bar_chart:null,
    };
  },
  components: {
    TopLeftCmp,
  },
  computed: {
    ...mapGetters(["shown"]),
  },
  watch: {
    isFullscreen(i, e) {
      if (!i) {
        this.$router.go(0);
      }
      this.$store.commit("SET_MENUSHOWN", i);
    },
  },
  created() {
    
  },
  mounted() {
    let that = this;
    this.timeFormate(); //实时时间初始化
    this.getAmout(); //轮询总量(初始化)
    this.loadHeat(); // 获取当天数据
    this.realTims(); //  轮询2分钟量
    this.realInitDougChart(); //  轮询10s量
    this.getCanch(); // 查询小时监控
    this.initWebSocket(); // 初始化ws

    // 缓存点轮询
    this.myInterval = window.setInterval(() => {
      setTimeout(() => {
        this.realTims();
      }, 1);
    }, 120 * 1000);
    //实时时间定时器
    this.timer2 = window.setInterval(() => {
      setTimeout(this.timeFormate, 0);
    }, 1000);

    //当月 当日的定时器
    this.timer3 = window.setInterval(() => {
      setTimeout(this.realInitDougChart, 0);
    }, 10 * 1000);
     // 创建实例
    this.elResizeMaker = elementResizeDetectorMaker();
    // 创建实例带参
    var erdUltraFast = elementResizeDetectorMaker({
        strategy: "scroll", //<- For ultra performance.
        callOnAdd: true,
        debug: true
    });
    // 防抖函数，防止多次触发 resize事件，影响页面性能
    function debounce (handle, delay) {
        let time = null;
        return function () {
            let self = this,arg = arguments;
            clearTimeout(time);
            time = setTimeout(function () {
                handle.apply(self,arg);　　//this绑定
            },delay)
        }
    }
    this.$nextTick(()=>{
      this.elResizeMaker.listenTo(document.getElementById("dashboard_page"), debounce(function(){
        that.doug_chart.resize();
        that.doug_chart1.resize();
        that.doug_chart2.resize();
        that.doug_chart3.resize();
        that.doug_chart4.resize();
        that.doug_chart5.resize();
        that.charts_tv.resize();
        that.charts_eu.resize();
        that.charts_tu.resize();
        that.charts_redis_mq.resize();
        that.map_chart.resize();
        that.bar_chart.resize();
      },200)); 
    })
  },
  beforeDestroy() {
    clearInterval(this.myInterval);
    this.websocketclose();
    clearInterval(this.timer2);
    this.timer2 = null;
    clearInterval(this.timer3);
    this.timer3 = null;
    // 移除监听器
    this.elResizeMaker.removeAllListeners(document.getElementById("dashboard_page"));
  },
  methods: {
    // 全屏展示
    screen() {
      // 如果不允许进入全屏，发出不允许提示
      //         if (!screenfull.enabled) {
      //           this.$message('您的浏览器不能全屏');
      //           return false
      //         }
      screenfull.toggle();
      screenfull.on("change", () => {
        if (screenfull.isFullscreen) {
          //全屏时，要执行的操作
          this.isFullscreen = true;
        } else {
          this.isFullscreen = false;
          //取消全屏时，要执行的操作
        }
        // console.log('Am I fullscreen?', screenfull.isFullscreen ? 'Yes' : 'No');
      });
    },
    // 实时时间函数
    timeFormate(timeStamp) {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      if (hh > 12) {
        _this.nowTime =
          yy + "/" + mm + "/" + dd + " 下午" + hh + ":" + mf + ":" + ss;
      } else {
        _this.nowTime =
          yy + "/" + mm + "/" + dd + " 上午" + hh + ":" + mf + ":" + ss;
      }
    },
    // 获取各航司实时总量
    async getAmout() {
      let infos = await dataView.totalCache();
      this.viewer = infos.data.data.counter;
      this.totalEU = infos.data.data.EU;
      this.totalThree = infos.data.data.TU;
      this.totalOther = infos.data.data.OZ;
      this.totalTV = infos.data.data.TV;
      this.scrollNum();
    },
    scrollNum(item) {
      let newviews = this.changeNum(this.viewer);
      _roll.roll(this.$refs.count, {
        deVal: newviews,
      });
    },
    changeNum(money) {
      if (money && money != null) {
        money = String(money);
        var left = money.split(".")[0],
          right = money.split(".")[1];
        var temp = left
          .split("")
          .reverse()
          .join("")
          .match(/(\d{1,3})/g);
        return (
          (Number(money) < 0 ? "-" : "") +
          temp.join(".").split("").reverse().join("")
        );
      } else {
        return "";
      }
    },
    initWebSocket() {
      const wsuri = this.path + localStorage.getItem("token"); //ws地址

      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },

    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      let actions = { toUserId: localStorage.getItem("token") };
      this.websock.send(JSON.stringify(actions));
      console.log("WebSocket连接成功");
    },
    websocketonerror() {
      // 连接建立失败重连
      console.log("重连请求");
      this.initWebSocket();
    },
    websocketonmessage(e) {
      // 数据接收
      const redata = JSON.parse(e.data);
      if (redata) {
        this.viewer = redata.counter;
        this.totalEU = redata.EU;
        this.totalThree = redata.TU;
        this.totalOther = redata.OZ;
        this.totalTV = redata.TV;
        this.scrollNum();
      }
    },
    websocketsend(Data) {
      // 数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      // 关闭
      console.log("断开连接", e);
    },

    //轮询获取缓存点
    async realTims() {
      let cycleData = await dataView.amountCache(); //柱状图缓存点监控  两分钟
      this.cycle.cycleTips_tv = cycleData.data.data[0].cacheNames
        .split(",")
        .slice(6, 8); //缓存点监控 标题
      this.cycle.cycleTips_eu = cycleData.data.data[0].cacheNames
        .split(",")
        .slice(4, 6); //缓存点监控 标题
      this.cycle.cycleTips_tu = cycleData.data.data[0].cacheNames
        .split(",")
        .slice(2, 4); //缓存点监控 标题
      this.cycle.cycleTips_redis_mq = cycleData.data.data[0].cacheNames
        .split(",")
        .slice(0, 2); //缓存点监控 标题
      let cycleInfo_tv = [];
      let cycleInfo_eu = [];
      let cycleInfo_tu = [];
      let cycleInfo_redis_mq = [];
      cycleData.data.data.map((item, index) => {
        let cycleList_tv = {
          name: this.formMinte(item.monitorDate),
          type: "bar",
          data: item.cacheValues.split(",").slice(6, 8),
        };
        let cycleList_eu = {
          name: this.formMinte(item.monitorDate),
          type: "bar",
          data: item.cacheValues.split(",").slice(4, 6),
        };
        let cycleList_tu = {
          name: this.formMinte(item.monitorDate),
          type: "bar",
          data: item.cacheValues.split(",").slice(2, 4),
        };
        let cycleList_redis_mq = {
          name: this.formMinte(item.monitorDate),
          type: "bar",
          data: item.cacheValues.split(",").slice(0, 2),
        };
        cycleInfo_tv.push(cycleList_tv);
        cycleInfo_eu.push(cycleList_eu);
        cycleInfo_tu.push(cycleList_tu);
        cycleInfo_redis_mq.push(cycleList_redis_mq);
      });
      this.cycle.cycleInfo_tv = cycleInfo_tv;
      this.cycle.cycleInfo_eu = cycleInfo_eu;
      this.cycle.cycleInfo_tu = cycleInfo_tu;
      this.cycle.cycleInfo_redis_mq = cycleInfo_redis_mq;
      this.initCharts(); //echarts 初始
    },
    async realInitDougChart() {
      let mouthIns = await dataView.amountGraphicalMonth(); //环形 5s/次
      // 11111111111111111111
      // 组装六个环形图的数据 => tv 藏航 eu 成航 tu 川航
      let changeInfs = mouthIns.data.data;
      // 当日数据
      this.mouthMessage.doug_chart_opt = [
        { value: changeInfs.curm[0].euTotal, name: "成航" },
        { value: changeInfs.curm[0].alTotal, name: "" },
      ];
      this.mouthMessage.doug_chart_opt1 = [
        { value: changeInfs.curm[0].tuTotal, name: "川航" },
        { value: changeInfs.curm[0].alTotal, name: "" },
      ];
      this.mouthMessage.doug_chart_opt2 = [
        { value: changeInfs.curm[0].tvTotal, name: "藏航" },
        { value: changeInfs.curm[0].alTotal, name: "" },
      ];
      // 当月数据
      this.mouthMessage.doug_chart_opt3 = [
        { value: changeInfs.curd[0].euAmount, name: "成航" },
        { value: changeInfs.curd[0].totalAmount, name: "" },
      ];
      this.mouthMessage.doug_chart_opt4 = [
        { value: changeInfs.curd[0].tuAmount, name: "川航" },
        { value: changeInfs.curd[0].totalAmount, name: "" },
      ];
      this.mouthMessage.doug_chart_opt5 = [
        { value: changeInfs.curd[0].tvAmount, name: "藏航" },
        { value: changeInfs.curd[0].totalAmount, name: "" },
      ];
      this.initDougChart();
    },
    // 初始化六个环形图
    initDougChart() {
      // 右上方的六个环形图
      this.doug_chart = this.$echarts.init(this.$refs.doug_chart);
      this.doug_chart1 = this.$echarts.init(this.$refs.doug_chart1);
      this.doug_chart2 = this.$echarts.init(this.$refs.doug_chart2);
      this.doug_chart3 = this.$echarts.init(this.$refs.doug_chart3);
      this.doug_chart4 = this.$echarts.init(this.$refs.doug_chart4);
      this.doug_chart5 = this.$echarts.init(this.$refs.doug_chart5);
      /**
       * donutChartOption 是返回六个环形图配置的函数
       * title: 标题
       * color: 颜色
       * data: 数据
       */
      function donutChartOption(title, color, data) {
        return {
          title: {
            text: title,
            left: "center",
            top: "1%",
            textStyle: {
              color: "#fff",
              fontSize: 12,
              align: "center",
              fontWeight: "400",
            },
          },
          color: [color, "#213b58"], //环形颜色

          series: [
            {
              name: "",
              type: "pie",
              radius: ["55%", "66%"],
              avoidLabelOverlap: false,
              // silent: true,
              // hoverAnimation: false,
              hoverOffset: 2,
              center: ["50%", "58%"],
              label: {
                normal: {
                  show: true,
                  position: "center",
                  textStyle: {
                    //设置文字样式
                    fontSize: "12",
                    color: color,
                  },
                  formatter: function (data) {
                    if (data.name === title) {
                      return data.value + "\n" + data.percent + "%";
                    } else {
                      return "";
                    }
                  },
                },
              },
              data: data,
            },
          ],
        };
      }
      this.doug_chart.setOption(
        donutChartOption("成航", "#00ce7d", this.mouthMessage.doug_chart_opt)
      );
      this.doug_chart1.setOption(
        donutChartOption("川航", "#42b6f6", this.mouthMessage.doug_chart_opt1)
      );
      this.doug_chart2.setOption(
        donutChartOption("藏航", "#ff9560", this.mouthMessage.doug_chart_opt2)
      );
      this.doug_chart3.setOption(
        donutChartOption("成航", "#e55541", this.mouthMessage.doug_chart_opt3)
      );
      this.doug_chart4.setOption(
        donutChartOption("川航", "#fff04b", this.mouthMessage.doug_chart_opt4)
      );
      this.doug_chart5.setOption(
        donutChartOption("藏航", "#f95aff", this.mouthMessage.doug_chart_opt5)
      );
      this.doug_chart.dispatchAction({ type: "highlight", dataIndex: 0 });
      this.doug_chart1.dispatchAction({ type: "highlight", dataIndex: 0 });
      this.doug_chart2.dispatchAction({ type: "highlight", dataIndex: 0 });
      this.doug_chart3.dispatchAction({ type: "highlight", dataIndex: 0 });
      this.doug_chart4.dispatchAction({ type: "highlight", dataIndex: 0 });
      this.doug_chart5.dispatchAction({ type: "highlight", dataIndex: 0 });
    },
    // 初始化图表
    initCharts() {
      // 页面下面四个图表
      this.charts_tv = this.$echarts.init(this.$refs.charts_tv);
      this.charts_eu = this.$echarts.init(this.$refs.charts_eu);
      this.charts_tu = this.$echarts.init(this.$refs.charts_tu);
      this.charts_redis_mq = this.$echarts.init(this.$refs.charts_redis_mq);
      // 半小时增量
      this.map_chart = this.$echarts.init(this.$refs.map_chart);
      // 每日增量
      this.bar_chart = this.$echarts.init(this.$refs.bar_chart);

      let cache_option_tv = {
        color: this.optionColor,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          position: ["50%", "0"],
        },

        grid: {
          left: "20px",
          right: "20px",
          top: "10px",
          bottom: "10px",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLine: {
            //x轴线的颜色以及宽度
            show: true,
            lineStyle: {
              color: "#434f5f",
              width: 0,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#434f5f"],
              width: 1,
              type: "solid",
            },
          },
        },
        yAxis: {
          type: "category",
          data: this.cycle.cycleTips_tv,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 60, //文字倾斜角度
          },
        },
        textStyle: {
          color: "#fff",
        },
        series: this.cycle.cycleInfo_tv,
      };
      let cache_option_eu = {
        color: this.optionColor,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          position: ["50%", "0"],
        },

        grid: {
          left: "20px",
          right: "20px",
          top: "10px",
          bottom: "10px",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLine: {
            //x轴线的颜色以及宽度
            show: true,
            lineStyle: {
              color: "#434f5f",
              width: 0,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#434f5f"],
              width: 1,
              type: "solid",
            },
          },
        },
        yAxis: {
          type: "category",
          data: this.cycle.cycleTips_eu,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 60, //文字倾斜角度
          },
        },
        textStyle: {
          color: "#fff",
        },
        series: this.cycle.cycleInfo_eu,
      };
      let cache_option_tu = {
        color: this.optionColor,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          position: ["50%", "0"],
        },

        grid: {
          left: "20px",
          right: "20px",
          top: "10px",
          bottom: "10px",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLine: {
            //x轴线的颜色以及宽度
            show: true,
            lineStyle: {
              color: "#434f5f",
              width: 0,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#434f5f"],
              width: 1,
              type: "solid",
            },
          },
        },
        yAxis: {
          type: "category",
          data: this.cycle.cycleTips_tu,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 60, //文字倾斜角度
          },
        },
        textStyle: {
          color: "#fff",
        },
        series: this.cycle.cycleInfo_tu,
      };
      let cache_option_redis_mq = {
        color: this.optionColor,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          position: ["50%", "0"],
        },

        grid: {
          left: "20px",
          right: "20px",
          top: "10px",
          bottom: "10px",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLine: {
            //x轴线的颜色以及宽度
            show: true,
            lineStyle: {
              color: "#434f5f",
              width: 0,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#434f5f"],
              width: 1,
              type: "solid",
            },
          },
        },
        yAxis: {
          type: "category",
          data: this.cycle.cycleTips_redis_mq,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 60, //文字倾斜角度
          },
        },
        textStyle: {
          color: "#fff",
        },
        series: this.cycle.cycleInfo_redis_mq,
      };
      let map_option = {
        color: this.optionColor,
        grid: {
          top: "20px",
          left: "10px",
          right: "10px",
          bottom: "30px",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        // 设置范围选择
        dataZoom: [
          {
            type: "slider",
            filterMode: "weakFilter",
            showDataShadow: false,
            bottom: 10,
            right: 20,
            height: 4,
            borderColor: "transparent",
            backgroundColor: "#264265",
            handleIcon:
              "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
            handleSize: 14,
            handleStyle: {
              shadowBlur: 9,
              shadowOffsetX: 1,
              shadowOffsetY: 2,
              shadowColor: "#aaa",
            },
            labelFormatter: "",
          },
          {
            type: "inside",
            filterMode: "weakFilter",
          },
        ],
        xAxis: {
          boundaryGap: false,
          axisLine: {
            //x轴线的颜色以及宽度
            show: true,
            lineStyle: {
              color: "#fff",
              width: 0,
            },
          },
          type: "category",
          data: [
            "00:00",
            "00:30",
            "01:00",
            "01:30",
            "02:00",
            "02:30",
            "03:00",
            "03:30",
            "04:00",
            "04:30",
            "05:00",
            "05:30",
            "06:00",
            "06:30",
            "07:00",
            "07:30",
            "08:00",
            "08:30",
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
            "18:00",
            "18:30",
            "19:00",
            "19:30",
            "20:00",
            "20:30",
            "21:00",
            "21:30",
            "22:00",
            "22:30",
            "23:00",
            "23:30",
          ],
        },
        yAxis: {
          type: "value",
          axisLine: {
            //x轴线的颜色以及宽度
            show: true,
            lineStyle: {
              color: "#434f5f",
              width: 0,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#434f5f"],
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            },
            formatter: function (value) {
              return value / 1000 + "k";
            },
          },
        },
        series: [
          {
            name: "总量",
            type: "line",
            stack: "条数",
            data: this.CounterLines,
          },
          {
            name: "川航",
            data: this.TULines,
            type: "line",
          },
          {
            name: "成都航",
            data: this.EULines,
            type: "line",
          },
          {
            name: "藏航",
            data: this.TVLines,
            type: "line",
          },
          {
            name: "其他",
            data: this.OZLines,
            type: "line",
          },
        ],
      };
      let bar_option = {
        color: this.optionColor,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: "10px",
          left: "10px",
          right: "14px",
          bottom: "18px",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.Monitoring.times,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontsize: "12",
              },
              interval: 0,
              rotate: -30, //文字倾斜角度
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#434f5f"],
                width: 1,
                type: "solid",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
              formatter: function (value) {
                return value / 1000 + "k";
              },
            },
          },
        ],
        series: this.Monitoring.Monitorinfos,
      };
      this.charts_tv.setOption(cache_option_tv);
      this.charts_eu.setOption(cache_option_eu);
      this.charts_tu.setOption(cache_option_tu);
      this.charts_redis_mq.setOption(cache_option_redis_mq);
      this.map_chart.setOption(map_option);
      this.bar_chart.setOption(bar_option);
    },
    // 获取当日数据
    loadHeat() {
      var dataDash = [];
      dataView.todayInfo().then((dataInfo) => {
        if (dataInfo.data.data) {
          dataInfo.data.data.map((item, index) => {
            item.monitorDate = this.formatDate(item.monitorDate);
            dataDash.push([
              item.monitorDate,
              item.euAmount,
              item.tuAmount,
              item.tvAmount,
            ]);
          });
        }
        this.salesConfig = {
          data: [...dataDash],
          header: ["日期", "EU", "TU", "TV"],
          rowNum: 10,
          columnWidth: [100, 80, 80, 80],
          headerHeight: 50,
          headerBGC: "transparent",
          oddRowBGC: "transparent",
          evenRowBGC: "rgba(64, 158, 255, 0.08)",
        };
      });
    },
    formatDate(date) {
      let credate = new Date(date).toJSON();
      return new Date(new Date(credate) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .split(" ")[0];
    },
    formMinte(data) {
      let datas = new Date(data);
      let hours = datas.getHours();
      let minutes = datas.getMinutes();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return hours + ":" + minutes;
    },
    //非实时刷新接口
    async getCanch() {
      let mountCach = await dataView.todayHourseInfo(); //总监控
      let todayInfo = await dataView.todayInfo(); //每天数据接口

      // 截取日期中的月-日
      this.Monitoring.times = todayInfo.data.data[0].monitorDates.map(
        (item) => {
          return item.length > 5 ? item.slice(5, 10) : item;
        }
      );

      let MonitoringTip = []; //数据接口标题
      let Monitorinfos = []; //数据接口信息

      todayInfo.data.data.map((item, index) => {
        if (item.monitorType === "0Z") {
          item.currentNames = "其他";
        } else if (item.monitorType === "3U") {
          item.currentNames = "川航";
        } else if (item.monitorType === "counter") {
          item.currentNames = "总计";
        } else if (item.monitorType === "EU") {
          item.currentNames = "成航";
        } else if (item.monitorType === "TV") {
          item.currentNames = "藏航";
        }
        MonitoringTip.push(item.monitorType);
        let others = {
          name: item.currentNames,
          type: "bar",
          data: item.monitorValues,
        };
        Monitorinfos.push(others);
      });
      this.Monitoring.seconds = MonitoringTip;
      this.Monitoring.Monitorinfos = Monitorinfos;

      mountCach.data.data.map((item) => {
        if (item.monitorType == "counter") {
          this.CounterLines = item.monitorValues;
        }
        if (item.monitorType == "3U") {
          this.TULines = item.monitorValues;
        }
        if (item.monitorType == "EU") {
          this.EULines = item.monitorValues;
        }
        if (item.monitorType == "TV") {
          this.TVLines = item.monitorValues;
        }
        if (item.monitorType == "0Z") {
          this.OZLines = item.monitorValues;
        }
      });
      this.initCharts(); //echarts 初始
    },
  },
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
  .opacity_6 {
    opacity: 0.9;
  }
  color: #fff;
  word-break: break-all;
  // min-width: 1300px;
  width: 100%;
  height: 100% !important;
  background: #17273b url(./dashboardBGI.jpg) no-repeat center center;
  background-size: 100% 100%;
  .dashboard_header {
    color: #00fbff;
    background-color: #264265;
    height: 50px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
    & > span {
      display: inline-block;
      width: 25%;
    }
    .header_title {
      font-size: 20px;
      letter-spacing: 3px;
      font-weight: 700;
      color: #00fbff;
      text-align: center;
      width: 75%;
    }
  }
  .view_main {
    // outline: 1px solid red;
    width: 100%;
    height: calc(100% - 60px);
    padding: 0 10px;
    box-sizing: border-box;
    .view_main_title {
      height: 36px;
      line-height: 36px;
      background-color: #264265;
      padding: 0 10px;
      box-sizing: border-box;
      color: #00fbff;
    }
    .view_main_top {
      display: flex;
      height: 50%;
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
          height: 70px;
          text-align: center;
          background-color: #1c3049;
          .top_m_total_title {
            display: inline-block;
            margin: 4px 0;
            color: #f4f65e;
          }
        }
        .increment_chart {
          width: 100%;
          height: calc(100% - 106px);
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
      height: calc(50% - 10px);
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
  //滚动数字样式
  .numtext {
    width: 15px;
    display: flex;
    line-height: 20px;
    padding: 0 5px;
    font-style: normal;
  }
  .dataNums {
    overflow: hidden;
    padding: 0;
    display: inline-block;
    text-align: center;
    z-index: 9999999;
  }
  .dataNums .dataOne {
    width: 25px;
    height: 40px;
    margin: 0px 2px;
    text-align: center;
    background: linear-gradient(#00ffe4, #4d38f7);
    font-family: "Arial";
    border-radius: 4px;
    float: left;
    list-style: none;
  }
  .dataNums .dataBoc {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .dataNums .dataBoc .tt {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 2 !important;
  }
  .dataNums .tt span {
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 2rem;
    line-height: 40px;
    float: left;
  }
}
</style>
