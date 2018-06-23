<template>
	<div id="on_appointDetail">
		<header><span class="left" @click="$router.back(-1)"></span>{{appointData[appointState].name}}</header>
		<div class="container">
			<div class="header">
				<div class="left">
					<p v-text="applyDetail.sp_application_title"></p>
				</div>
				<div class="right">
					<div :class="appointData[appointState].myClass">
						<span></span>
						<p v-text="appointData[appointState].name"></p>
					</div>
				</div>
			</div>
			<div class="content">
				<div><span>公司名称：</span>{{applyDetail.sp_application_company}}</div>
				<div><span>面试职位：</span>{{applyDetail.sp_application_position}}</div>
				<div><span>招聘人数：</span>{{applyDetail.sp_application_number}}人</div>
				<div><span>面试时间：</span>{{applyDetail.sp_application_start_time}}</div>
				<div><span>预约时间：</span>{{applyDetail.sp_application_bespoke_start_time}}到{{applyDetail.sp_application_bespoke_end_time}}</div>
				<div><span>面试时长：</span>{{applyDetail.sp_application_every_time}}分钟</div>
				<!--<div><span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>我的</div>-->
			</div>
			<!--<div class="btn" v-if="appointState==0">进入面试</div>-->
		</div>
	</div>
</template>

<script>
	export default{
		name:'on_appointDetail',
		data(){
			return{
				appointData:[
					{name:'申请失败',myClass:'unUse'},
					{name:'申请中',myClass:'appointing'},
					{name:'申请成功',myClass:'success'}
				],
				appointState:0,
				getId:'',
				applyDetail:''
			}
		},
		created(){
			this.appointState = this.$route.query.state;
			this.getId = this.$route.query.id;
			this.myfun.getAxios({path:'/app/application/'+this.getId},res=>{
				console.log(res,'application');
				this.applyDetail = res.content.application;
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped="scoped">
	.container{height: auto;background: #fff;
		.btn{width: 100%;position: fixed;margin: 0;left: 0;bottom: 0;top: auto;border-radius:0 ;}
		.header{height: auto;padding: 20px 30px;overflow: hidden;position: relative;
			.left{width: 70%;height:auto;border-right:3px dotted #e1e1e1;float: left;
				p{padding-right: 10px;font-size: 32px;font-weight: bold;color: #1B1B1B;height: 100%;line-height:60px;height: auto;}
			}
			.right{width: 30%;height:60px;position: absolute;top: calc(50% - 30px);left: auto;right: 15px;
				div{line-height: 60px;}
				span{width: 40px;height: 40px;background: no-repeat center;background-size:100% 100%;display: block;float: left;margin:10px 20px;}
				p{float: left;}
				.success{
					span{background-image: url(../../../assets/image/on_successIcon.png);}
					p{color: #2AC845;}
				}
				.unUse{
					span{background-image: url(../../../assets/image/on_unUseIcon.png);}
					p{color: #FF0000;}
				}
				.appointing{
					span{background-image: url(../../../assets/image/on_appointingIcon.png);}
					p{color: #FF6000;}
				}
				 
			}
		}
		.content{padding: 20px 30px;border-top:2px solid #E1E1E1;
			div{color: #535353;margin: 15px 0;};
			span{color: #999999;}
		}
	}
</style>