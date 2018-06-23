<template>
	<div class="on_msDetail">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			面试详情
		</header>
		<div class="container">
			<div><span>面试主题：</span>{{applyDetail.sp_application_title}}</div>
			<div><span>公司名称：</span>{{applyDetail.sp_application_company}}</div>
			<div><span>招聘人数：</span>{{applyDetail.sp_application_number}}人</div>
			<div><span>预约时间：</span>{{applyDetail.sp_application_bespoke_start_time}}至{{applyDetail.sp_application_bespoke_end_time}}</div>
			<div><span>面试时间：</span>{{applyDetail.sp_application_start_time}}</div>
			<div :class="appointTitle[appointState].myClass"><span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>{{appointTitle[appointState].name}}</div>
			<router-link :to="{path:'on_enterPeople',query:{id:getId,isMsOpen:isMsOpen}}">
				<div class="bottom"><span>报名人数：</span>{{num}}人<span class="rightLink"></span></div>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		name:'on_msDetail',
		data(){
			return{
				applyDetail:{},
				appointState:-1,
				appointTitle:[{myClass:'grey',name:'未开始'},{myClass:'origin',name:'预约中'},{myClass:'grey',name:'已结束'}],
				num:'',
				getId:'',
				isMsOpen:-1
			}
		},
		created(){
			this.appointState = this.$route.query.state;
			this.getId = this.$route.query.id;
			this.myfun.getAxios({path:'/app/application/'+this.getId},res=>{
				console.log(res,'application');
				this.applyDetail = res.content.application;
				this.isMsOpen = this.myfun.msTimeJuedy(this.applyDetail.sp_application_start_time);
				this.num = res.content.num;
			})
		},
		methods:{}
	}
</script>


<style lang="less" scoped="scoped">
.container{padding: 20px 30px;border-top:2px solid #E1E1E1;height: auto;background: #fff;padding-bottom: 0;
	div{color: #535353;margin: 15px 0;};
	div.origin{color: #FF6000;}
	div.grey{color: grey;}
	span{color: #999999;}
	.bottom{height: 90px;border-top: 2px solid #e1e1e1;line-height: 90px;margin: 0;transition: background-color 0.3s;
		span.rightLink{background: url(../../../assets/image/linkRight_col.png) no-repeat center;background-size:100% 100%;width: 20px;height: 40px;display: block;float: right;margin:25px;}
		&:active{background: #e1e1e1;}
	}
}
</style>