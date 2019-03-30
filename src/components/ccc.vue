// 个人预存款充值记录
<template>
  <div class="wallet-count-page">
     <p style="margin-bottom:10px">
       <el-button icon="el-icon-plus">预存款充值</el-button>
       <el-button style="float:right" icon="el-icon-plus">预存款调货</el-button>
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
          <el-table-column prop="date" label="交易流水号" align="center">
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
        </el-table>
        <!-- 翻页 -->
        <el-pagination style="text-align:right" background @current-change="handleCurrentChange" :current-page.sync="params.page" :page-size="params.size" layout="prev, pager, next" :total="totalCount">
        </el-pagination>

        
    <!-- 打款 -->
    <el-dialog :visible.sync="moneyDialogVisible" width="700px" :modal-append-to-body="false" :lock-scroll="false" center>
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="充值人电话：">
          <el-input style="width:300px" size="medium" placeholder="请输入用户ID/手机号" v-model="form.name"></el-input>
           <i style="font-size:24px" class="el-icon-search"></i>
        </el-form-item>
        <el-form-item label="充值人姓名：">
          qwqw
        </el-form-item>
        <el-form-item label="充值人电话：">
          qwqw
        </el-form-item>
        <el-form-item label="请选择充值商品：">
          <el-checkbox-group v-model="checkedCities1">
            <p v-for="(city,index) in cities" :key="index">
             <el-checkbox :label="city.city">XXX玻尿酸：70元/盒 x <el-input v-model="city.money" style="width:100px" size="medium"></el-input> 盒 =  7000元</el-checkbox>
            </p>
          </el-checkbox-group>
        </el-form-item>
        <p style="text-align:center">提示：预存款将加上9000元</p>
        <p style="text-align:center">库存将加上100盒</p>
        <p style="text-align:center;margin-top:20px">
          <el-button>确认充值</el-button>
        </p>
          
      </el-form>
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
          title: "库存结余",
          value: 3333,
          unit:"盒"
        }
      ],
      searchInfo: "", //查询str
      startMonth: "", //开始月
      endMonth: "", //结束月
      tableData: [
        {
          date: "2016-05-02"
        }
      ],
      totalCount: 30,
      moneyDialogVisible:true,
      form:{
        name:"1212"
      },
      checkedCities1:[], //选中的列表
      cities:[
        {
          city:"1",
          money:123
        }, {
          city:"2",
          money:""
        }, {
          city:"3",
          money:""
        }
      ],
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
    handleCurrentChange(val){
      console.log('params',this.params);
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
}
</style>
