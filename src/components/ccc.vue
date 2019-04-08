// 个人预存款充值记录
<template>
  <div class="wallet-count-page">
     <p style="margin-bottom:10px">
       <el-button icon="el-icon-plus" @click="recharge">预存款充值</el-button>
       <el-button style="float:right" @click="cargo" icon="el-icon-plus">预存款调货</el-button>
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
    <el-dialog :visible.sync="moneyDialogVisible" title="预存款充值" width="700px" :modal-append-to-body="false" :lock-scroll="false" center>
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="充值人电话：">
          <el-input style="width:300px" size="medium" placeholder="请输入用户ID/手机号" v-model="form.name"></el-input>
           <i style="font-size:24px;" @click="searchPerson" class="el-icon-search"></i>
        </el-form-item>
        <el-form-item label="充值人姓名：">
          qwqw
        </el-form-item>
        <el-form-item label="充值人电话：">
          qwqw
        </el-form-item>
        <el-form-item label="请选择充值商品：">
            <p v-for="(item,index) in list" :key="index">
             <el-checkbox v-model="item.checked" :label="item.name">{{item.name}}：{{item.money}}元/盒 x 
               <el-input v-model="item.num" style="width:120px" size="medium" placeholder="输入数量" @input="calculate(item)"></el-input> 盒 = 
              {{item.total}}元</el-checkbox>
            </p>
        </el-form-item>
        <p style="text-align:center;color:#E51C23">提示：预存款将加上 {{totalPrice}} 元</p>
        <p style="text-align:center;color:#E51C23">库存将加上 {{numAll}} 盒</p>
        <p style="text-align:center;margin-top:20px">
          <el-button>确认充值</el-button>
        </p>
      </el-form>
    </el-dialog>

    <!-- 调货 -->
    <el-dialog :visible.sync="cargoDialogVisible" title="预存款调货" width="1100px" :modal-append-to-body="false" :lock-scroll="false" center>
     <div class="cargoBox">
       <!-- 调货人 -->
       <div class="border_r">
         <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="调货人电话：">
              <el-input style="width:250px" size="medium" placeholder="请输入用户ID/手机号" v-model="form.name"></el-input>
              <i style="font-size:24px;" @click="searchPerson" class="el-icon-search"></i>
            </el-form-item>
            <el-form-item label="调货人姓名：">
              qwqw
            </el-form-item>
            <el-form-item label="调货人电话：">
              qwqw
            </el-form-item>
            <el-form-item label="库存商品：">
                <p v-for="(item,index) in list1" :key="index">
                <el-checkbox v-model="item.checked" :label="item.name">{{item.name}}：{{item.money}}元/盒 x 
                  <el-input v-model="item.num" style="width:100px" size="medium" placeholder="输入数量" @input="calculate1(item)"></el-input> 盒 = 
                  {{item.total}}元</el-checkbox>
                </p>
            </el-form-item>
            <el-form-item label="调货数量：">
                <p v-for="(item,index) in list1" :key="index" v-show="item.checked">
                {{item.name}}：{{item.money}}元/盒 x 
                  {{item.num}} 盒 = 
                  {{item.total}}元
                </p>
            </el-form-item>
            <p style="color:#E51C23">提示：预存款将减去 {{totalPrice1}} 元</p>
            <p style="color:#E51C23;text-indent: 42px;">库存将减去 {{numAll1}} 盒</p>
         </el-form>
       </div>
       <!-- 收货人 -->
       <div style="padding-left:25px;">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="收货人电话：">
              <el-input style="width:250px" size="medium" placeholder="请输入用户ID/手机号" v-model="form.name"></el-input>
              <i style="font-size:24px;" @click="searchPerson" class="el-icon-search"></i>
            </el-form-item>
            <el-form-item label="收货人姓名：">
              qwqw
            </el-form-item>
            <el-form-item label="收货人电话：">
              qwqw
            </el-form-item>
            <el-form-item label="库存商品：">
                <p v-for="(item,index) in list2" :key="index">
                <el-checkbox v-model="item.checked" :label="item.name">{{item.name}}：{{item.money}}元/盒 x 
                  <el-input v-model="item.num" style="width:100px" size="medium" placeholder="输入数量" @input="calculate2(item)"></el-input> 盒 = 
                  {{item.total}}元</el-checkbox>
                </p>
            </el-form-item>
            <el-form-item label="调货数量：">
                <p v-for="(item,index) in list2" :key="index" v-show="item.checked">
                {{item.name}}：{{item.money}}元/盒 x 
                  {{item.num}} 盒 = 
                  {{item.total}}元
                </p>
            </el-form-item>
            <p style="color:#E51C23">提示：预存款将加上 {{totalPrice2}} 元</p>
            <p style="color:#E51C23;text-indent: 42px;">库存将加上 {{numAll2}} 盒</p>
         </el-form>
       </div>
     </div>
      <p style="text-align:center;margin-top:20px">
        <el-button>确认调货</el-button>
      </p>
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
      moneyDialogVisible:false,
      cargoDialogVisible:false,
      numAll:0,
      numAll1:0,
      numAll2:0,
      form:{
        name:"1212"
      },
      list:[
        {
          name:"篮球",
          money:2,
          num:null,
          total:0,
          checked:false,
        }, {
          name:"足球",
          money:2,
          num:null,
          total:0,
          checked:false,
        },
      ],
      list1:[
        {
          name:"篮球",
          money:2,
          num:null,
          total:0,
          checked:false,
        }, {
          name:"足球",
          money:2,
          num:null,
          total:0,
          checked:false,
        },
      ],    
      list2:[
        {
          name:"篮球",
          money:2,
          num:null,
          total:0,
          checked:false,
        }, {
          name:"足球",
          money:2,
          num:null,
          total:0,
          checked:false,
        },
      ],
      params: {
        page: 1,
        size: 10
      }
    };
  },
  computed: {
    totalPrice() {
      let totals = 0,
      nums = 0;
      this.list.forEach(ele => {
        if (ele.checked) {
          nums += parseInt(ele.num);
          totals += ele.total;
        }
      });
      this.numAll = nums;
      return totals;
    },
    totalPrice1() {
      let totals1 = 0,
      nums1 = 0;
      this.list1.forEach(ele => {
        if (ele.checked) {
          nums1 += parseInt(ele.num);
          totals1 += ele.total;
        }
      });
      this.numAll1= nums1;
      return totals1;
    },
    totalPrice2() {
      let totals2 = 0,
      nums2 = 0;
      this.list2.forEach(ele => {
        if (ele.checked) {
          nums2 += parseInt(ele.num);
          totals2 += ele.total;
        }
      });
      this.numAll2= nums2;
      return totals2;
    }
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
    },
    // 单个商品数量输入
    calculate(item){
      for (const iterator of this.list) {
        if (iterator.name == item.name) {
          iterator.total = item.money * item.num;
        }
      }
    },
    calculate1(item){
      for (const iterator of this.list1) {
        if (iterator.name == item.name) {
          iterator.total = item.money * item.num;
        }
      }
    }, 
    calculate2(item){
      for (const iterator of this.list2) {
        if (iterator.name == item.name) {
          iterator.total = item.money * item.num;
        }
      }
    },
    //根据充值人电话查询信息
    searchPerson(){
      console.log('111111111111111111',);
    },
    // 预存款充值
    recharge(){
      this.moneyDialogVisible = true;
    },
    // 预存款调货
    cargo(){
      this.cargoDialogVisible = true;
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
  .el-icon-search {
    cursor: pointer;
    font-size: 24px;
  }
  .cargoBox{
    display: flex;
    justify-content: flex-start;
    &>div{
      width: 50%;
      height:auto;
    }
    .border_r{
      border-right: 1px solid #bbb;
    }
  }
}
</style>
