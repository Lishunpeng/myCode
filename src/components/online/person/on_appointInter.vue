<template>
	<div id="on_appointInter">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			面试预约
		</header>
		<div class="container">
			<div><span>公司名称：</span>{{comData.sp_application_company}}</div>
			<div><span>面试主题：</span>{{comData.sp_application_title}}</div>
			<div><span>招聘人数：</span>{{comData.sp_application_number}}人</div>
			<div><span>面试时间：</span>{{comData.sp_application_bespoke_start_time}}至{{comData.sp_application_bespoke_end_time}}</div>
			<div><span>面试时长：</span>{{comData.sp_application_every_time}}分钟</div>
			<div><span>面试职位：</span>{{comData.sp_application_position}}</div>
			<div><span>预约时间：</span>{{comData.sp_application_start_time}}</div>
			<div><span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span><i :class="statusList[status].myClass" v-if="status!=-1">{{statusList[status].name}}</i></div>
		</div>
		<div class="btn" @click="showAlert" v-if="status==1">预约</div>
		<div :class="['alertContainer',alertShow?'show':'hide']">
			<h3>请选择预约的简历和职位</h3>
			<div class="alertContent">
				<p>选择职位：</p>
				<select class="recritSelect">
					<option v-for="data in recruitList" v-text="data" :value="data"></option>
				</select>
			</div>
			<div class="alertContent">
				<p>选择简历：</p>
				<select class="resumeSelect">
					<option v-for="data in resumeList" v-text="data.resume_title" :value="data.id"></option>
				</select>
			</div>
			<div class="btnBox">
				<button type="button" class="btn" @click="sure">确定</button>
				<button type="button" class="btn" @click="close">关闭</button>					
			</div>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui';
	export default{
		name:'on_appointInter',
		data(){
			return{
				resumeList:[],
				recruitList:[],
				alertShow:false,
				getId:'',
				comData:'',
				getNowtimestamp:'',
				status:-1,
				statusList:[{myClass:'grey',name:'未开始'},{myClass:'origin',name:'预约中'},{myClass:'grey',name:'已结束'}]
			}
		},
		created(){
			this.getNowtimestamp = Date.parse(new Date());
			this.getId = this.$route.query.id;
			this.myfun.getAxios({path:'/app/userApplication/'+this.getId},res=>{
				console.log(res);
				this.comData = res.content.application;
				this.status = this.myfun.sp_isTimePast(this.getNowtimestamp,this.comData.sp_application_bespoke_start_time,this.comData.sp_application_bespoke_end_time);
				console.log(this.status)
				this.comData.sp_application_bespoke_end_time = this.myfun.getMyDate(this.comData.sp_application_bespoke_end_time,true);
				this.comData.sp_application_bespoke_start_time = this.myfun.getMyDate(this.comData.sp_application_bespoke_start_time,true);
				this.comData.sp_application_start_time = this.myfun.getMyDate(this.comData.sp_application_start_time,true);
				this.recruitList = this.comData.sp_application_position.split('、');
				this.myfun.getAxios({path:'/app/userSpSignUpChangeResumeInfo'},res=>{
					this.resumeList = res.content;
					console.log(res,'userSpSignUpChangeResumeInfo');
				})
			});
		},
		methods:{
			showAlert(){
				$('.blackBox').show();
				this.alertShow = !this.alertShow;
			},
			sure(){
				//1.申请ID-简历ID-职位名称
				var resume_id = $('.resumeSelect option:selected').val();
				var recrit_name = $('.recritSelect option:selected').val();
				this.close();
				if(!resume_id || !recrit_name){
					return Toast('简历或者职位不能为空！');
				}
				this.myfun.getAxios({path:'/app/personalApplication/'+this.getId+'-'+resume_id+'-'+encodeURI(recrit_name)},res=>{
					Toast(res.msg)
				})
			},
			close(){
				$('.blackBox').hide();
				this.alertShow = !this.alertShow;
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
.container{padding: 20px 30px;border-top:2px solid #E1E1E1;height: auto;background: #fff;
	div{color: #535353;margin: 15px 0;};
	div.origin{color: #FF6000;}
	div.grey{color: #FF6000;}
	span{color: #999999;}
	i.origin{color: #FF6000;}
	i.grey{color: #b5b5b5;}
}
.btn{margin: 0;width: 100%;border-radius:0;position: fixed;left: 0;top: auto;bottom: 0;}
.alertContainer{border-radius:15px;padding-bottom:30px;min-height: 300px;width: 500px;background: #fff;z-index: 10000;position: fixed;left: calc(50% - 250px);justify-content: center;top: calc(50% - 150px);
	h3{height: 90px;line-height: 90px;border-bottom: 1px solid #E1E1E1;color: #FF6000;text-align: center;}
	.alertContent{
		display: flex;height: 100px;padding: 20px;
		p{flex: 3;line-height: 70px;}
		select{flex: 5;border: 2px solid #e1e1e1;}
	}
	.btnBox{text-align: center;margin-top: 15px;
		.btn{display: inline-block;margin: 0;width: 40%;border: none;height: 60px;line-height: 60px;position: static;border-radius:5px;}
	}
}
</style>