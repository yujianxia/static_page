// 个人预存款调货
<template>
  <div class="person-cargo-count-page">
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
          <el-table-column prop="date" label="收货人库存" align="center">
          </el-table-column>
          <el-table-column prop="date" label="调货状态" align="center">
          </el-table-column>
          <el-table-column prop="date" label="调货日期" align="center">
          </el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination style="text-align:right" background @current-change="handleCurrentChange" :current-page.sync="params.page" :page-size="params.size" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
  </div>
</template>
<script>
import DataModel from "../common/dataModel";
export default {
  name: "personCargo",
  components: {
    DataModel
  },
  data() {
    return {
      transferData: [
        {
          title: "今日调货",
          value: 111,
          unit:"笔"
        },
        {
          title: "本月调货",
          value: 2222,
          unit:"笔"
        },
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
    },
    //根据充值人电话查询信息
    searchPerson(){
      console.log('111111111111111111',);
    }
  }
};
</script>
<style lang="scss">
.pointer {
  cursor: pointer;
  color: #3f51b5;
}
.person-cargo-count-page{
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
