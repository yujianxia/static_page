<template>
  <div class="data-count-page">
    <!-- 左边的数据 -->
    <div class="user_data_view">
      <div>
        <p class="borderBottom">用户数据</p>
        <div class="user_info">
          <p>
            <span>游客总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>体验会员总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>v咖会员总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>合伙人总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>公星总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>核心总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>运营中心：</span>
            <span class="text_left">121212 人</span>
          </p>
        </div>
          <p class="fontWeight">
            <span>用户总计：</span>
            <span class="text_left">121212 人</span>
          </p>
      </div>
      <div>
        <p class="borderTop borderBottom">本月新增用户</p>
          <div class="user_info">
          <p>
            <span>游客总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>体验会员总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>v咖会员总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>合伙人总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>公星总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>核心总计：</span>
            <span class="text_left">121212 人</span>
          </p>
          <p>
            <span>运营中心：</span>
            <span class="text_left">121212 人</span>
          </p>
        </div>
        <p class="fontWeight">
            <span>新增用户总计</span>
            <span class="text_left">121212 人</span>
          </p>
      </div>
    </div>
    <div class="today_data_view">
      <p class="today_total">今日营业额统计</p>
      <DataModel class="borderLeftNone" :child-data="transferData"></DataModel>
        <!-- 地图 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="实时订单地图显示" name="first">实时订单地图显示</el-tab-pane>
        </el-tabs>

    </div>

  </div>
</template>
<script>
import DataModel from "./dataModel";
export default {
  name: "dataCount",
  components: {
    DataModel
  },
  data() {
    return {
      activeName: 'first',
      transferData: [
        {
          title: "今日订单数",
          value: 111,
          unit: "单"
        },
        {
          title: "今日营业额",
          value: 2222,
          unit: "元"
        },
        {
          title: "今日充值金额",
          value: 3333,
          unit: "元"
        },
        {
          title: "本月交易总订单",
          value: 4444,
          unit: "单"
        },
        {
          title: "本月累计交易金额",
          value: 55555,
          unit: "元"
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss">
.data-count-page {
  height: 800px;
  display: flex;
  justify-content: flex-start;
  .fontWeight{
    font-weight: 700
  }
  .borderTop{
    border-top:1px solid #bbb;
  }
  .borderBottom{
     border-bottom:1px solid #bbb;
  }
  .borderLeftNone{
    border-left: none;
  }
  .user_data_view {
    width: 280px;
    height: 800px;
    border: 1px solid #bbb;
    & > div {
      height: 50%;
      & > p {
        height: 70px;
        line-height: 70px;
        text-align: center;
      }
    }
  }
  .today_data_view {
    width: calc(100% - 280px);
    .today_total{
      border-top: 1px solid #bbb;
      border-right: 1px solid #bbb;
        height: 70px;
        line-height: 70px;
    }
  }
  .user_info{
    display: flex;
    justify-content: center;
    flex-direction:column;
    align-content: center;
    height: 250px;
    p{
      font-size: 14px;
      width:100%;
      height: 24px;
      line-height: 24px;
      .text_left{
        text-align: left;
      }
      span{
        display: block;
        float: left;
        width: 50%;
        text-align: right;
      }
    }
  }
}
</style>
