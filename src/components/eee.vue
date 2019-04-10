// 个人预存款充值记录
<template>
  <div class="cargo-count-page">
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
  </div>
</template>
<script>
export default {
  name: "cargo",
  data() {
    return {
      numAll1:0,
      numAll2:0,
      form:{
        name:"1212"
      },
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
    };
  },
  computed: {
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
  }
};
</script>
<style lang="scss">
.pointer {
  cursor: pointer;
  color: #3f51b5;
}
.cargo-count-page{
  p {
    margin: 0;
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
