<template>
	<div id="on_appointDetail">
		<header><span class="left" @click="$router.back(-1)"></span>{{appointData[appointState].name}}</header>
		<div class="container">
			<div class="header">
				<div class="left">
					<p v-text="appointInfo.sp_application_title"></p>
				</div>
				<div class="right">
					<div :class="appointData[appointState].myClass">
						<span></span>
						<p v-text="appointData[appointState].name"></p>
					</div>
				</div>
			</div>
			<div class="content">
				<div><span>公司名称：</span>{{appointInfo.sp_application_company}}</div>
				<div><span>面试职位：</span>{{appointInfo.sp_application_position}}</div>
				<div><span>招聘人数：</span>{{appointInfo.sp_application_number}}人</div>
				<div><span>预约时间：</span>{{appointInfo.sp_application_bespoke_start_time}}到{{appointInfo.sp_application_bespoke_end_time}}</div>
				<div><span>面试时间：</span>{{appointInfo.sp_application_start_time}}</div>
				<div><span>面试时长：</span>{{appointInfo.sp_application_every_time}}分钟</div>
				<!--<div><span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>我的</div>-->
				<div><span>面试简历：</span>{{resumeTitle}}</div>
				<div v-if="spNumber"><span>面试顺序：</span>{{spNumber}}号</div>
			</div>
			<div class="btn" v-if="appointState==3" @click="interMS">进入面试</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	export default{
		name:'on_appointDetail',
		data(){
			return{
				appointData:[
					{name:'预约中',myClass:'appointing'},
					{name:'预约中',myClass:'appointing'},
					{name:'预约中',myClass:'appointing'},
					{name:'预约成功',myClass:'success'},
					{name:'预约失败',myClass:'unUse'},
					{name:'已录用',myClass:'success'},
					{name:'未录用',myClass:'unUse'}
//					{name:'已面试',myClass:'isInterview'},
				],
				appointState:-1,
				getId:'',
				appointInfo:{},
				resumeTitle:'',
				spNumber:'',
				isMsOpen:-1
			}
		},
		created(){
			this.appointState = this.$route.query.state;
			console.log(this.appointState,'this.appointState');
			this.spNumber = parseInt(this.$route.query.number)<10? '0'+parseInt(this.$route.query.number):parseInt(this.$route.query.number);
			this.resumeTitle = this.$route.query.resume_title;
			this.getId = this.$route.query.id;
			this.myfun.getAxios({path:'/app/userApplication/'+this.getId},res=>{
				this.appointInfo = res.content.application;
				this.isMsOpen = this.myfun.msTimeJuedy(this.appointInfo.sp_application_start_time);
				console.log(this.isMsOpen);
			})
		},
		methods:{
			interMS(){
				if(this.isMsOpen){
					this.$router.push({path:'../online_wait',query:{isCompany:0,id:this.getId,msOrder:this.spNumber,msTime:this.appointInfo.sp_application_every_time}});
				}else{
					MessageBox('提示','面试还没开始！');
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.container{height: auto;background: #fff;
		.btn{width: 100%;position: fixed;margin: 0;left: 0;bottom: 0;top: auto;border-radius:0;a{width: 100%;height: 100%;display: block;color: #fff;}}
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
				.isInterview{
					span{background-image: url(../../../assets/image/on_isInterviewIcon.png);}
					p{color: #666666;}
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