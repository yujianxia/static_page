<template>
  <div class="data-count-page">
    <!-- 左边的数据 -->
    <div class="user_data_view">
      <div>
        <p>用户数据</p>
      </div>
      <div>
        <p>用户数据</p>
      </div>
    </div>
    <div class="today_data_view">
      <p class="today_total">今日营业额统计</p>
      <DataModel :child-data="transferData"></DataModel>
      <div>12321213213123213213123</div>
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
        height: 70px;
        line-height: 70px;
    }
  }
}
</style>
