<template>
	<div class="index">
		<el-container>
			<el-header class="header" style="background-color: #4491f0;">
				<div class="index_leftOperation">
					<span @click="isShow = !isShow">写代码一时爽，一直写一直爽。</span>
				</div>
			</el-header>
			<el-container>
				<el-aside v-show="isShow" class="menu" style="width: 250px">
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
		return {
			isShow:true
		}
		},
		methods: {
	}
	}
</script>	

<style scoped>

</style>

<style>
.el-aside {
  height: calc(100vh - 60px);
  height: -webkit-calc(100vh - 60px);
  height: -moz-calc(100vh - 60px);
  height: -o-calc(100vh - 60px);
  background-color: rgb(84, 92, 100);
}
.el-menu-item-group__title {
  font-size: 14px;
}
.index_leftOperation{
	font-size:18px;
}
</style>

