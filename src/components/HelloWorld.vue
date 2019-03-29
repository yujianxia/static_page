
<template>
  <div class="money-count-page">
    <DataModel class="borderLeftNone" :child-data="transferData"></DataModel>
    <!-- 查询 -->
    <div class="search_container">
      查询：
      <el-input size="small" clearable placeholder="会员ID/姓名/电话" v-model="searchInfo" style="width:200px;margin-right:20px"></el-input>
      <el-date-picker v-model="startMonth" value-format="yyyy-MM" style="width:150px;margin-right:20px" type="month" size="small" placeholder="选择开始月">
      </el-date-picker>
      <el-date-picker v-model="endMonth" value-format="yyyy-MM" style="width:150px;margin-right:20px" type="month" size="small" placeholder="选择结束月">
      </el-date-picker>
      <i @click="search_submit" class="el-icon-search"></i>
    </div>
    <!-- 标签页 -->
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="今天日交易记录" name="1">
        <!-- 今天日交易记录 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4E7ED'}">
          <el-table-column prop="date" label="订单编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="date" label="电话" align="center">
          </el-table-column>
          <el-table-column prop="date" label="订单金额" align="center">
          </el-table-column>
          <el-table-column prop="date" label="快递费" align="center">
          </el-table-column>
          <el-table-column prop="date" label="交易流水号" align="center">
          </el-table-column>
          <el-table-column prop="date" label="支付方式" align="center">
          </el-table-column>
          <el-table-column prop="date" label="推荐人" align="center">
          </el-table-column>
          <el-table-column prop="date" label="级别" align="center">
          </el-table-column>
          <el-table-column prop="date" label="状态" align="center">
          </el-table-column>
          <el-table-column prop="date" label="操作" align="center">
            <template slot-scope="scope">
              <span class="pointer" @click="showDetails(scope.row)">详情</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="params.page" :page-size="params.size" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="今日提现记录" name="2">
        <!-- 今日提现记录 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4E7ED'}">
          <el-table-column prop="date" label="提现订单编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现姓名" align="center">
          </el-table-column>
          <el-table-column prop="date" label="电话" align="center">
          </el-table-column>
          <el-table-column prop="date" label="已提现金额" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现流水号" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现到账银行" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现卡号" align="center">
          </el-table-column>
          <el-table-column prop="date" label="级别" align="center">
          </el-table-column>
          <el-table-column prop="date" label="推荐人" align="center">
          </el-table-column>
          <el-table-column prop="date" label="状态" align="center">
          </el-table-column>
          <el-table-column prop="date" label="银行凭证" align="center">
            <template slot-scope="scope">
              <span class="pointer" @click="showBank(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="params.page" :page-size="params.size" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="今日充值记录" name="3">
        <!-- 今日充值记录 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4E7ED'}">
          <el-table-column prop="date" label="充值订单编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值人姓名" align="center">
          </el-table-column>
          <el-table-column prop="date" label="电话" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值金额" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值流水号" align="center">
          </el-table-column>
          <el-table-column prop="date" label="支付方式" align="center">
          </el-table-column>
          <el-table-column prop="date" label="级别" align="center">
          </el-table-column>
          <el-table-column prop="date" label="推荐人" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值状态" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值日期" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值纪录" align="center">
            <template slot-scope="scope">
              <span class="pointer">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="params.page" :page-size="params.size" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="今日扣税记录" name="4">
        <!-- 今日扣税记录 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4E7ED'}">
          <el-table-column prop="date" label="提现订单编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现姓名" align="center">
          </el-table-column>
          <el-table-column prop="date" label="电话" align="center">
          </el-table-column>
          <el-table-column prop="date" label="已提现扣税" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现流水号" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现到账银行" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现卡号" align="center">
          </el-table-column>
          <el-table-column prop="date" label="级别" align="center">
          </el-table-column>
          <el-table-column prop="date" label="推荐人" align="center">
          </el-table-column>
          <el-table-column prop="date" label="状态" align="center">
          </el-table-column>
          <el-table-column prop="date" label="操作" align="center">
            <template slot-scope="scope">
              <span class="pointer">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="params.page" :page-size="params.size" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="今日保证金记录" name="5">
        <!-- 今日保证金记录 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4E7ED'}">
          <el-table-column prop="date" label="提现订单编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现姓名" align="center">
          </el-table-column>
          <el-table-column prop="date" label="电话" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现扣保证金" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现流水号" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现到账银行" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提现卡号" align="center">
          </el-table-column>
          <el-table-column prop="date" label="级别" align="center">
          </el-table-column>
          <el-table-column prop="date" label="推荐人" align="center">
          </el-table-column>
          <el-table-column prop="date" label="状态" align="center">
          </el-table-column>
          <el-table-column prop="date" label="操作" align="center">
            <template slot-scope="scope">
              <span class="pointer">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="params.page" :page-size="params.size" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- 订单详情 -->
    <el-dialog :visible.sync="detailsDialogVisible" width="1000px" :title="frameTitle" :modal-append-to-body="false" :lock-scroll="false" center>
      <div class="detail_info">
        <!-- 第一行 -->
        <div>
          <p>
            <span>订单编号:</span>
            <span class="text_left">12313123131223</span>
          </p>
          <p>
            <span>支付方式:</span>
            <span class="text_left">12313123131223</span>
          </p>
          <p>
            <span>支付流水号:</span>
            <span class="text_left">12313123131223</span>
          </p>
          <p>
            <span>预存款结余:</span>
            <span class="text_left">12313123131223</span>
          </p>
        </div>
        <!-- 第二行 -->
        <div>
          <p>
            <span>推荐人:</span>
            <span class="text_left">12313123131223</span>
          </p>
          <p>
            <span>订单上级处理人:</span>
            <span class="text_left">12313123131223</span>
          </p>
          <p>
            <span>订单类型:</span>
            <span class="text_left">12313123131223</span>
          </p>
        </div>
        <!-- 第三行 -->
        <div>
          <p>
            <span>收货人姓名:</span>
            <span class="text_left">12313123131223</span>
          </p>
          <p>
            <span>收货人电话:</span>
            <span class="text_left">12313123131223</span>
          </p>
          <p>
            <span>会员级别:</span>
            <span class="text_left">12313123131223</span>
          </p>
        </div>
        <!-- 第四行 -->
        <div>
          <p>
            <span>收货人地址:</span>
            <span class="text_left">12313123131223</span>
          </p>
          <p></p>
          <p></p>
          <p>
            <span>总计:</span>
            <span class="text_left">12313123131223</span>
          </p>
        </div>
      </div>
      <!-- 详情表格 -->
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4E7ED'}">
        <el-table-column label="商品" width="180" align="center">
          <template slot-scope="scope">
            <img style="width:100px;height:80px;" src="http://www.pptok.com/wp-content/uploads/2012/08/xunguang-4.jpg" alt="商品图片">
            <p>{{scope.row.date}}</p>
          </template>
        </el-table-column>
        <el-table-column label="购买价格/数量" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.date}}</p>
            <p>(100/盒)</p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="运费" align="center">
        </el-table-column>
        <el-table-column prop="date" label="购买人/电话" align="center">
          <template slot-scope="scope">
            <p>张三</p>
            <p>1306626520</p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="下单时间" align="center">
        </el-table-column>
        <el-table-column prop="date" label="订单状态" align="center">
        </el-table-column>
        <el-table-column prop="date" label="快递信息" align="center">
          <template slot-scope="scope">
            <p>韵达快递</p>
            <p>13066265201306626520</p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 银行流水单 -->
    <el-dialog :visible.sync="bankDialogVisible" width="1000px" :title="bankTitle" :modal-append-to-body="false" :lock-scroll="false" center>
      <div class="bank_info">
        <p style="text-align:left;">
          <span>交易时间：2019-01-01 19:19:19</span>
          <span>网银流水号：2111111111111111111111111</span>
        </p>
        <div>
          <div class="border_r width50">
            <div class="pay_info">
              <div class="width40 border_r_b">
                <div class="height120 width50">付款方</div>
                <div class="width50">
                  <p>账户户名</p>
                  <p>付款账户</p>
                  <p>开户行</p>
                </div>
              </div>
              <div class="width60">
                <p>账户户名11111111111</p>
                <p>付款账户11111111</p>
                <p>开户行11111</p>
              </div>
            </div>
            <div class="pay_info_num border_b">
              <p class="width40 border_r">转账金额（小写）</p>
              <p class="width60">合计（小写）</p>
            </div>
            <div class="pay_info_num">
              <p class="width40 border_r">11111元</p>
              <p class="width60">2222元</p>
            </div>
          </div>
          <div class="width50">
            <div class="pay_info">
              <div class="width40 border_r_b">
                <div class="height120 width50">收款方</div>
                <div class="width50">
                  <p>收款方</p>
                  <p>收款账户</p>
                  <p>开户行</p>
                </div>
              </div>
              <div class="width60">
                <p>账户户名11111111111</p>
                <p>付款账户11111111</p>
                <p>开户行11111</p>
              </div>
            </div>
            <div class="pay_info_num border_b">
              <p class="width40 border_r">手续费</p>
              <p class="width60">合计（大写）</p>
            </div>
            <div class="pay_info_num">
              <p class="width40 border_r">11111元</p>
              <p class="width60">2222元</p>
            </div>
          </div>
        </div>
        <div class="bank_info_bottom border_b">
          <p class="width20">附言</p>
          <p class="width80">附言附言附言附言附言附言附言附言附言附言附言</p>
        </div>
        <div class="bank_info_bottom" style="height:100px;border-top:none;border-bottom:none">
          <p class="width20">图片</p>
          <p class="width80">图片图片图片</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import DataModel from "../common/dataModel";
export default {
  name: "moneyCount",
  components: {
    DataModel
  },
  data() {
    return {
      activeName: "first",
      transferData: [
        {
          title: "今日营业额",
          value: 111
        },
        {
          title: "今日提现金额",
          value: 2222
        },
        {
          title: "今日扣税总额",
          value: 3333
        },
        {
          title: " 今日预存款总额",
          value: 4444
        },
        {
          title: "今日保证金总额",
          value: 55555
        },
        {
          title: "今日总盈利",
          value: 55555
        }
      ],
      searchInfo: "", //查询str
      startMonth: "", //开始月
      endMonth: "", //结束月
      activeName: "1", //tab选中
      frameTitle: "订单详情",
      bankTitle: "转账结果 交易成功",
      detailsDialogVisible: false, //详情弹框
      bankDialogVisible: false, //银行流水单弹框
      tableData: [
        {
          date: "2016-05-02"
        }
      ],
      totalCount: 30,
      params: {
        page: 1,
        size: 10
      }
    };
  },
  methods: {
    // 提交函数
    search_submit() {
      console.log("searchInfo", this.searchInfo);
      console.log("startMonth", this.startMonth);
      console.log("endMonth", this.endMonth);
    },
    showDetails(item) {
      console.log("点击详情");
      this.detailsDialogVisible = true;
    },
    showBank(item) {
      console.log("点击查看");
      this.bankDialogVisible = true;
    },
    // tab切换
    handleClick() {
      console.log(this.activeName);
    },
    // 翻页
    handleCurrentChange() {
      console.log(" 翻页", this.params);
    }
  }
};
</script>
<style lang="scss">
.pointer {
  cursor: pointer;
  color: #3f51b5;
}
.money-count-page {
  p {
    margin: 0;
  }
  .search_container {
    height: 40px;
    background-color: #f8f8f8;
    margin: 20px 0;
    padding: 0 10px;
    display: flex;
    align-items: center;
    .el-icon-search {
      cursor: pointer;
      font-size: 24px;
    }
  }
  .bank_info {
    height: auto;
    width: 100%;
    border: 1px solid #bbb;
    text-align: center;
    & > p {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #bbb;
      span {
        display: block;
        float: left;
        width: 50%;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
    .border_r {
      border-right: 1px solid #bbb;
    }
    & > div {
      height: 200px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      .width50 {
        width: 50%;
      }
      .width40 {
        width: 40%;
      }
      .width60 {
        width: 60%;
      }
      .border_b {
        border-bottom: 1px solid #bbb;
      }
      .border_r_b {
        border-bottom: 1px solid #bbb;
        display: flex;
        justify-content: flex-start;
        border-right: 1px solid #bbb;
        .height120 {
          height: 120px;
          line-height: 120px;
          border-right: 1px solid #bbb;
        }
      }
      .pay_info_num {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: flex-start;
      }
      .pay_info {
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        height: 120px;
        p {
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
          border-bottom: 1px solid #bbb;
        }
      }
    }
    .bank_info_bottom {
      box-sizing: border-box;
      display: flex;
      border-top: 1px solid #bbb;
      border-bottom: 1px solid #bbb;
      justify-content: flex-start;
      height: 40px;
      line-height: 40px;
      .width20 {
        box-sizing: border-box;
        width: 20%;
        border-right: 1px solid #bbb;
      }
      .width80 {
        width: 80%;
      }
    }
  }
  .detail_info {
    height: 170px;
    width: 100%;
    border: 1px solid #bbb;
    box-sizing: border-box;
    margin-bottom: 20px;
    & > div {
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: flex-start;
      p {
        font-size: 14px;
        width: 25%;
        height: 40px;
        line-height: 40px;
        .text_left {
          text-align: left;
        }
        span {
          display: block;
          float: left;
          width: 50%;
          text-align: right;
        }
      }
    }
  }
  .user_info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    height: 250px;
    p {
      font-size: 14px;
      width: 100%;
      height: 24px;
      line-height: 24px;
      .text_left {
        text-align: left;
      }
      span {
        display: block;
        float: left;
        width: 50%;
        text-align: right;
      }
    }
  }
}
</style>
