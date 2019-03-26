<template>
  <div class="admin-doing-setting-page">
    <p>
      <el-button icon="el-icon-circle-plus" @click="addDialogVisible = true">添加商品</el-button>
    </p>
    <el-table :data="tableList" border style="width: 100%">
      <el-table-column prop="id" label="商品id" width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="department" label="型号" align="center"></el-table-column>
      <el-table-column prop="tel" label="颜色" width="110" align="center"></el-table-column>
      <el-table-column prop="time" label="生成厂家" width="120" align="center"></el-table-column>
      <el-table-column prop="login_account" label="积分兑换" align="center"></el-table-column>
      <el-table-column prop="password" label="运营中心" align="center"></el-table-column>
      <el-table-column prop="password" label="核心代理" align="center"></el-table-column>
      <el-table-column prop="password" label="公星" align="center"></el-table-column>
      <el-table-column prop="password" label="合伙人" align="center"></el-table-column>
      <el-table-column prop="password" label="V咖会员" align="center"></el-table-column>
      <el-table-column prop="password" label="体验会员" align="center"></el-table-column>
      <el-table-column prop="password" label="计算业绩" width="100" align="center"></el-table-column>
      <el-table-column prop="password" label="代理商品" width="100" align="center"></el-table-column>
      <el-table-column prop="password" label="扫码发货" width="100" align="center"></el-table-column>
      <el-table-column prop="password" label="状态" width="100" align="center"></el-table-column>
      <el-table-column prop="password" label="库存" width="100" align="center"></el-table-column>
      <el-table-column prop="password" label="运费" width="100" align="center"></el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template>
          <span class="pointer">运费</span>
          <span class="pointer">修改</span>
          <span class="pointer">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    <!-- 添加商品弹框 -->
    <el-dialog :visible.sync="addDialogVisible" width="930px" title="添加商品" :modal-append-to-body="false" :lock-scroll="false" center>
      <el-form :inline="true" :model="addInfo" class="add-dialog" label-position="right" label-width="160px">
        <el-form-item label="商品名称：">
          <el-input v-model="addInfo.name" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="商品型号：">
          <el-input v-model="addInfo.tel" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="商品颜色：">
          <el-input v-model="addInfo.login_account" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家：">
          <el-input v-model="addInfo.password" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="体验会员：">
          <el-input v-model="addInfo.name" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="零售价：">
          <el-input v-model="addInfo.tel" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="合伙人：">
          <el-input v-model="addInfo.login_account" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="V咖会员：">
          <el-input v-model="addInfo.password" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="核心总代：">
          <el-input v-model="addInfo.name" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="公量：">
          <el-input v-model="addInfo.tel" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="运营中心：">
          <el-input v-model="addInfo.login_account" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="库存：">
          <el-input v-model="addInfo.password" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <br>
        <br>
        <br>
        <el-form-item label="积分兑换：">
          <el-input v-model="addInfo.password" size="medium" style="width:150px" placeholder="单行输入"></el-input>
          +
          <el-input v-model="addInfo.password" size="medium" style="width:150px" placeholder="单行输入"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="每箱小盒数：">
          <el-input v-model="addInfo.password" size="medium" style="width:150px" placeholder="单行输入"></el-input>
        </el-form-item>

        <el-form-item label="业绩分红奖励：" class="reset_width140">
          <el-input v-model="addInfo.password" size="medium" style="width:100px" placeholder="单行输入">
          </el-input>元/盒
        </el-form-item>
        <el-form-item label="同级：" class="reset_width60">
          <el-input v-model="addInfo.password" size="medium" style="width:100px" placeholder="单行输入">
          </el-input>元/盒
        </el-form-item>
        <el-form-item label="是否计算业绩：">
          <el-radio-group v-model="addInfo.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <br>
        <el-form-item label="是否扫码发货：">
          <el-radio-group v-model="addInfo.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否上下架：">
          <el-radio-group v-model="addInfo.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属类别：">
          <el-radio-group v-model="addInfo.resource">
            <el-radio label="精选"></el-radio>
            <el-radio label="活动"></el-radio>
            <el-radio label="福利"></el-radio>
            <el-radio label="积分"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品描述：">
          <el-input type="textarea" style="width:300px" v-model="addInfo.login_account" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addBusinessCenter">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 修改商品弹框 -->
    <el-dialog :visible.sync="updateDialogVisible" width="930px" title="修改商品" :modal-append-to-body="false" :lock-scroll="false" center>
      <el-form :inline="true" :model="addInfo" class="add-dialog" label-position="right" label-width="160px">
        <el-form-item label="商品名称：">
          <el-input v-model="addInfo.name" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="商品型号：">
          <el-input v-model="addInfo.tel" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="商品颜色：">
          <el-input v-model="addInfo.login_account" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家：">
          <el-input v-model="addInfo.password" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="体验会员：">
          <el-input v-model="addInfo.name" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="零售价：">
          <el-input v-model="addInfo.tel" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="合伙人：">
          <el-input v-model="addInfo.login_account" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="V咖会员：">
          <el-input v-model="addInfo.password" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="核心总代：">
          <el-input v-model="addInfo.name" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="公量：">
          <el-input v-model="addInfo.tel" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="运营中心：">
          <el-input v-model="addInfo.login_account" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="库存：">
          <el-input v-model="addInfo.password" size="medium" placeholder="单行输入"></el-input>
        </el-form-item>
        <br>
        <br>
        <br>
        <el-form-item label="积分兑换：">
          <el-input v-model="addInfo.password" size="medium" style="width:150px" placeholder="单行输入"></el-input>
          +
          <el-input v-model="addInfo.password" size="medium" style="width:150px" placeholder="单行输入"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="每箱小盒数：">
          <el-input v-model="addInfo.password" size="medium" style="width:150px" placeholder="单行输入"></el-input>
        </el-form-item>

        <el-form-item label="业绩分红奖励：" class="reset_width140">
          <el-input v-model="addInfo.password" size="medium" style="width:100px" placeholder="单行输入">
          </el-input>元/盒
        </el-form-item>
        <el-form-item label="同级：" class="reset_width60">
          <el-input v-model="addInfo.password" size="medium" style="width:100px" placeholder="单行输入">
          </el-input>元/盒
        </el-form-item>
        <el-form-item label="是否计算业绩：">
          <el-radio-group v-model="addInfo.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <br>
        <el-form-item label="是否扫码发货：">
          <el-radio-group v-model="addInfo.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否上下架：">
          <el-radio-group v-model="addInfo.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属类别：">
          <el-radio-group v-model="addInfo.resource">
            <el-radio label="精选"></el-radio>
            <el-radio label="活动"></el-radio>
            <el-radio label="福利"></el-radio>
            <el-radio label="积分"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品描述：">
          <el-input type="textarea" style="width:300px" v-model="addInfo.login_account" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addBusinessCenter">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 添加运费弹框 -->
    <el-dialog :visible.sync="freightDialogVisible" width="730px" title="添加运费" :modal-append-to-body="false" :lock-scroll="false" center>
      <el-form :inline="true" :model="addInfo" class="freight-dialog" label-position="right" label-width="160px">
        <el-form-item label="北京：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="上海：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="天津：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="重庆：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="河北：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="山西：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="辽宁：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="吉林：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="黑龙江：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="江苏：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="浙江：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="安徽：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="福建：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="江西：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="山东：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="河南：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="湖北：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="湖南：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="广东：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="海南：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="四川：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="贵州：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>

        <el-form-item label="云南：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="陕西：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="甘肃：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="青海：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>

        <el-form-item label="内蒙古：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="广西：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>

        <el-form-item label="西藏：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="新疆：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>

        <el-form-item label="宁夏：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="台湾：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>

        <el-form-item label="香港：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>
        <el-form-item label="澳门：">
          <el-input v-model="addInfo.name" size="medium" placeholder="多少元"></el-input>/箱
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBusinessCenter">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "doingSetting",
  data() {
    return {
      tableList: [
        {
          id: "0",
          name: "小红",
          department: 1,
          tel: "14725836978",
          time: "2019-01-01",
          login_account: "14725836978",
          password: "123456789",
          resource: ""
        }
      ],
      addDialogVisible: false,
      updateDialogVisible: false,
      freightDialogVisible: true,
      checkList: [],
      addInfo: {
        id: "0",
        name: "小红",
        department: 1,
        tel: "14725836978",
        time: "2019-01-01",
        login_account: "12445",
        password: "1234",
        resource: ""
      }
    };
  },
  methods: {
    addBusinessCenter() {
      this.tableList.push(this.addInfo);
      this.getList();
      this.addDialogVisible = false;
    },
    getList() {}
  }
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
  color: #3f51b5;
}
.admin-doing-setting-page {
  .el-pagination {
    margin-top: 10px;
    text-align: right;
  }
  .freight-dialog {
    .el-input {
      width: 120px;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .add-dialog {
    .el-input {
      width: 240px;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
    .reset_width140 {
      .el-form-item__label {
        width: 140px !important;
      }
    }
    .reset_width60 {
      .el-form-item__label {
        width: 60px !important;
      }
    }
  }
  .select-permission {
    padding: 0 45px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #bbbbbb;
    position: relative;
    .permission-check-list {
      .el-checkbox {
        margin: 40px 0;
        width: 20%;
      }
    }
    .order-check-list {
      position: absolute;
      top: 68px;
      left: 306px;
      width: 400px;
      .el-checkbox {
        margin: 0;
        width: 33.3%;
      }
    }
  }
}
</style>

