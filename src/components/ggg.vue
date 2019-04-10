// 预存款管理
<template>
  <div class="wallet-count-page">
     <p style="margin-bottom:10px">
       <el-button icon="el-icon-plus" @click="recharge">预存款充值</el-button>
       <el-button style="float:right" @click="pickUp" icon="el-icon-plus">预存款调货</el-button>
       <el-button style="float:right" @click="cargo" icon="el-icon-plus">预存款提货</el-button>
     </p>
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
      <el-tab-pane label="预存款充值记录" name="1">
        <!-- 预存款充值记录 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4E7ED'}">
          <el-table-column prop="date" label="充值订单编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值人姓名" align="center">
          </el-table-column>
          <el-table-column prop="date" label="电话" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值金额" align="center">
          </el-table-column>
          <el-table-column prop="date" label="商品名称" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值盒数" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值流水号" align="center">
          </el-table-column>
          <el-table-column prop="date" label="支付方式" align="center">
          </el-table-column>
          <el-table-column prop="date" label="级别" align="center">
          </el-table-column>
          <el-table-column prop="date" label="推荐人" align="center">
          </el-table-column>
          <el-table-column prop="date" label="预存款结余" align="center">
          </el-table-column>
          <el-table-column prop="date" label="库存盒数" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值状态" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值日期" align="center">
          </el-table-column>
          <el-table-column prop="date" label="充值记录" align="center">
            <template slot-scope="scope">
              <span class="pointer" @click="showDetails(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination style="text-align:right" background @current-change="handleCurrentChange" :current-page.sync="params.page" :page-size="params.size" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
      </el-tab-pane>    
      <el-tab-pane label="预存款消费记录" name="2">
        <!-- 预存款消费记录 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4E7ED'}">
          <el-table-column prop="date" label="提货订单编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="date" label="电话" align="center">
          </el-table-column>
          <el-table-column prop="date" label="消费费金额" align="center">
          </el-table-column>
          <el-table-column prop="date" label="商品名称" align="center">
          </el-table-column>
          <el-table-column prop="date" label="消费盒数" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提货流水号" align="center">
          </el-table-column>
          <el-table-column prop="date" label="支付方式" align="center">
          </el-table-column>
          <el-table-column prop="date" label="推荐人" align="center">
          </el-table-column>
          <el-table-column prop="date" label="级别" align="center">
          </el-table-column>
          <el-table-column prop="date" label="预存款结余" align="center">
          </el-table-column>
          <el-table-column prop="date" label="库存盒数" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提货订单状态" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提货日期" align="center">
          </el-table-column>
          <el-table-column prop="date" label="历史记录" align="center">
            <template slot-scope="scope">
              <span class="pointer" @click="showDetails(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination style="text-align:right" background @current-change="handleCurrentChange" :current-page.sync="params.page" :page-size="params.size" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
      </el-tab-pane>    
      <el-tab-pane label="预存款调货" name="3">
        <!-- 公星 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4E7ED'}">
          <el-table-column prop="date" label="调货编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="调货人姓名" align="center">
          </el-table-column>
          <el-table-column prop="date" label="电话" align="center">
          </el-table-column>
          <el-table-column prop="date" label="商品名称" align="center">
          </el-table-column>
          <el-table-column prop="date" label="调货数量" align="center">
          </el-table-column>
          <el-table-column prop="date" label="级别" align="center">
          </el-table-column>
          <el-table-column prop="date" label="预存款结余" align="center">
          </el-table-column>
          <el-table-column prop="date" label="调货人库存" align="center">
          </el-table-column>
          <el-table-column prop="date" label="收货人姓名" align="center">
          </el-table-column>
          <el-table-column prop="date" label="收货人电话" align="center">
          </el-table-column>
          <el-table-column prop="date" label="预存款结余" align="center">
          </el-table-column>
          <el-table-column prop="date" label="收货人库存" align="center">
          </el-table-column>
          <el-table-column prop="date" label="调货状态" align="center">
          </el-table-column>
          <el-table-column prop="date" label="调货日期" align="center">
          </el-table-column>
          <el-table-column prop="date" label="调货记录" align="center">
            <template slot-scope="scope">
              <span class="pointer" @click="showDetails(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination style="text-align:right" background @current-change="handleCurrentChange" :current-page.sync="params.page" :page-size="params.size" layout="prev, pager, next" :total="totalCount">
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
          title: "今日充值",
          value: 111
        },
        {
          title: "本月充值",
          value: 2222
        },
        {
          title: "预存款总计",
          value: 3333
        },
        {
          title: "库存货总计",
          value: 4444,
          unit:"盒"
        },
      ],
      searchInfo: "", //查询str
      startMonth: "", //开始月
      endMonth: "", //结束月
      activeName: "1", //tab选中
      frameTitle: "订单详情",
      detailsDialogVisible:false,
      form: {
        name: '',
      },
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
    showOperation(){
      console.log("点击操作");
      this.operationDialogVisible = true;
    },
    // tab切换
    handleClick() {
      console.log(this.activeName);
    },
    // 翻页
    handleCurrentChange() {
      console.log(" 翻页", this.params);
    },
    // 预存款充值
    recharge(){
      console.log('预存款充值',);
    },
    // 预存款调货
    cargo(){
      console.log('预存款调货',);
    },
    // 预存款提货
    pickUp(){
      console.log('预存款提货',);
    }
  }
};
</script>
<style lang="scss">
.pointer {
  cursor: pointer;
  color: #3f51b5;
}
.wallet-count-page{
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

.el-form-item {
    margin-bottom: 10px;
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
