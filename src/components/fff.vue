// 预存款提货
<template>
  <div class="pickup-count-page">
    <el-form ref="form" :model="form" label-width="250px">
      <el-form-item label="提货人电话：">
        <el-input style="width:300px" size="medium" placeholder="请输入用户ID/手机号" v-model="form.name"></el-input>
        <i style="font-size:24px;" @click="searchPerson" class="el-icon-search"></i>
      </el-form-item>
      <el-form-item label="提货人姓名：">
        预存款充值预存款充值预存款充值预
      </el-form-item>
      <el-form-item label="提货人电话：">
        qwqw
      </el-form-item>
      <el-form-item label="我的库存商品：">
        <p v-for="(item,index) in list" :key="index">
          <el-checkbox v-model="item.checked" :label="item.name">{{item.name}}：{{item.money}}元/盒 x
            <el-input v-model="item.num" style="width:120px" size="medium" placeholder="输入数量" @input="calculate(item)"></el-input> 盒 = {{item.total}}元
          </el-checkbox>
        </p>
      </el-form-item>
      <el-form-item label="调货数量：">
        <p v-for="(item,index) in list" :key="index" v-show="item.checked">
          {{item.name}}：{{item.money}}元/盒 x {{item.num}} 盒 = {{item.total}}元
        </p>
      </el-form-item>
      <el-form-item label="收货人姓名：">
        <el-input style="width:300px" size="medium" placeholder="请输入收货人姓名" v-model="form.harvestName"></el-input>
      </el-form-item>
      <el-form-item label="收货人电话：">
        <el-input style="width:300px" size="medium" placeholder="请输入收货人电话" v-model="form.harvestPhone"></el-input>
      </el-form-item>
      <el-form-item label="收货人地址：">
        <el-input style="width:300px" size="medium" placeholder="请选择省份" v-model="form.harvestAddress"></el-input>
        <el-input style="width:300px" size="medium" placeholder="请输入详细地址" v-model="form.harvestAddress"></el-input>
      </el-form-item>
      <p style="text-align:center;color:#E51C23">提示：预存款将加上 {{totalPrice}} 元</p>
      <p style="text-align:center;color:#E51C23">库存将加上 {{numAll}} 盒</p>
      <p style="text-align:center;margin-top:20px">
        <el-button>确认充值</el-button>
      </p>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "pickup",
  data() {
    return {
      numAll: 0,
      form: {
        name: "1212",
        harvestName:"",
        harvestPhone:"",
        harvestAddress:"",
      },
      list: [
        {
          name: "篮球",
          money: 2,
          num: null,
          total: 0,
          checked: false
        },
        {
          name: "足球",
          money: 2,
          num: null,
          total: 0,
          checked: false
        }
      ]
    };
  },
  mounted () {

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
    }
  },
  methods: {
    // 单个商品数量输入
    calculate(item) {
      for (const iterator of this.list) {
        if (iterator.name == item.name) {
          iterator.total = item.money * item.num;
        }
      }
    },
    //根据充值人电话查询信息
    searchPerson() {
      console.log("111111111111111111");
    }
  }
};
</script>
<style lang="scss">
.pointer {
  cursor: pointer;
  color: #3f51b5;
}
.pickup-count-page {
  p {
    margin: 0;
  }
  .el-icon-search {
    cursor: pointer;
    font-size: 24px;
  }
}
</style>
