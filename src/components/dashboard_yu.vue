
<template>
  <div class="dashboard_page">
    <!-- 头部 -->
    <div class="dashboard_header">
      <span class="fs14">2020/8/5 下午16:28:04</span>
      <span class="fs14 header_title">Aslink监控</span>
      <span class="fs14 pointer">全屏显示</span>
    </div>
    <!-- 展示数据 -->
    <div class="view_main">
      <!-- 上半部分 -->
      <div class="view_main_top">
        <div class="view_main_top_l">
          <div class="fs14 view_main_title">各航司实时总量</div>
          <p>川航：66666</p>
        </div>
        <div class="view_main_top_m">456</div>
        <div class="view_main_top_r">64</div>
      </div>
      <!-- 下半部分 -->
      <div class="view_main_bottom"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dashboard_page",
  data() {
    return {
      nowTime:"" //当前时间
    };
  },
  created () {


  },
  mounted () {
    
  },
  beforeDestroy(){

  },
  methods: {
  

  }
};
</script>
<style lang="scss">
p{
  margin: 0;
  padding: 0;
}
.dashboard_page{
  .pointer{cursor: pointer;}
  .fs12{font-size: 12px;}
  .fs14{font-size: 14px;}
  .fs16{font-size: 16px;}
  color: #fff;
  word-break: break-all;
  width: 100vw;
  height: 100vh;
  background-color: #17273b;
  .dashboard_header{
    background-color: #1c344f;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
    .header_title{
      font-size: 20px;
      letter-spacing: 3px;
    }
  }
  .view_main{
    outline: 1px solid red;
    width: 100%;
    height: calc(100vh - 60px);
    padding: 0 10px;
    box-sizing: border-box;
    .view_main_title{
      height: 36px;
      line-height: 36px;
      background-color: #1c344f;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .view_main_top{
      display: flex;
      height: 40%;
      .view_main_top_l{
        outline: 1px solid red;
        padding-right: 10px;
        width: 25%;
        &>p{
          font-size: 12px;
          height: 30px;
          padding: 0 10px;
          box-sizing: border-box;
        }
      }
      .view_main_top_m{
        width: 50%;
      }
      .view_main_top_r{
      outline: 1px solid red;
        width: 25%;
      }
    }
    .view_main_bottom{
      padding-left: 10px;
      display: flex;
      height: 60%;

    }
  }

}
</style>
