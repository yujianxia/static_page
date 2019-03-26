<template>
	<div class="index">
		<el-container>
			<el-header class="header" style="background-color: #4491f0;">
				<div class='index_name'>路由后台管理系统</div>
				<div class="index_leftOperation">
					<span>当前账户:
						<b class="name">1232</b>
					</span>
					<span >修改密码</span>
					<span >退出</span>
				</div>
			</el-header>
			<el-container>
				<el-aside class="menu" style="width: 250px;min-height: 900px">
					<el-row class="tac self_menu">
					
					</el-row>
				</el-aside>

				<el-main>

					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>	

<script>
export default {
  name: "index",
  data() {
    return {}}
    }
</script>	

<style scoped>

</style>

<style>
.el-aside {
  height: min-height(100vh - 60px);
  height: -webkit-calc(100vh - 60px);
  height: -moz-calc(100vh - 60px);
  height: -o-calc(100vh - 60px);
  background-color: rgb(84, 92, 100);
}
.el-menu-item-group__title {
  font-size: 14px;
}
</style>

