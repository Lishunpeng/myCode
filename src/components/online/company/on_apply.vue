<template>
	<div id="on_apply">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			申请
		</header>
		<div class="msg">
			<div class="inputBox"><span>公司名称</span><input type="text" placeholder="请输入用户名" :value="on_company" readonly="readonly"/></div>
			<div class="inputBox"><span>面试主题</span><input type="text" placeholder="请输入面试主题" v-model="ms_title"/></div>
			<div class="inputBox"><span>面试职位</span><input type="text" placeholder="请输入面试职位" v-model="ms_job"/></div>
			<div class="tips">提示：多个职位用顿号隔开（如：行政、厨师等）</div>
			<div class="inputBox"><span>招聘人数</span><input type="text" placeholder="请输入招聘人数" v-model="ms_people"/></div>
			<div class="inputBox on_datatime"><span>面试日期</span>
				<mt-datetime-picker v-model="on_msDate_hide"  ref="on_msDate" :startDate="on_startDate" :endDate="on_endTime" type="datetime" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" hour-format="{value} 时" minute-format="{value} 分" @confirm="chooseDatatime('on_msDate_hide','on_msDate_show')">
				</mt-datetime-picker>
				<input type="text" placeholder="请选择面试时间" v-model="on_msDate_show" @click="myshow('on_msDate')" readonly="readonly"/>
			</div>
			<!--<div class="inputBox"><span>面试时分</span>
				<mt-datetime-picker v-model="on_msTime_hide"  ref="on_msTime" type="time" hour-format="{value} 时" minute-format="{value} 分" @confirm="chooseTime('on_msTime_hide','on_msTime_show')">
				</mt-datetime-picker>
				<input type="text" placeholder="请选择面试时间" v-model="on_msTime_show" @click="myshow('on_msTime')" readonly="readonly"/>
			</div>-->
			<div class="inputBox on_datatime"><span>预约开始</span>
				<mt-datetime-picker v-model="on_appointStart_hide"  ref="on_appointStart" :startDate="on_startDate" :endDate="on_endTime" type="datetime" year-format="{value}年" month-format="{value}月" date-format="{value}日" hour-format="{value}时" minute-format="{value}分" @confirm="chooseDatatime('on_appointStart_hide','on_appointStart_show')">
				</mt-datetime-picker>
				<input type="text" placeholder="请选择预约开始时间" v-model="on_appointStart_show" @click="myshow('on_appointStart')" readonly="readonly"/>
			</div>
			<div class="inputBox on_datatime"><span>预约结束</span>
				<mt-datetime-picker v-model="on_appointEnd_hide"  ref="on_appointEnd" :startDate="on_startDate" :endDate="on_endTime" type="datetime" year-format="{value}年" month-format="{value}月" date-format="{value}日" hour-format="{value}时" minute-format="{value}分" @confirm="chooseDatatime('on_appointEnd_hide','on_appointEnd_show')">
				</mt-datetime-picker>
				<input type="text" placeholder="请选择预约结束时间" v-model="on_appointEnd_show" @click="myshow('on_appointEnd')" readonly="readonly"/>
			</div>
			<div class="inputBox"><span>面试时长</span><input type="text" placeholder="请输入面试时长（分）" v-model="ms_time"/></div>
			<div class="tips">提示：面试时长为面试一位求职者的时间</div>
			<!--<div class="inputBox"><span>入职时间：</span>
				<mt-datetime-picker v-model="inJobTime_hide"  ref="in_picker" :startDate="_startDate" :endDate="_endTime" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="chooseInJobTime">
				</mt-datetime-picker>
				<input type="text" placeholder="请选择入职时间"  v-model="inJobTime_show" @click="myshow('in_picker')" readonly="readonly"/>
			</div>-->
		</div>
		<div class="btn" @click="save">提交</div>
	</div>
</template>

<script>
	import { MessageBox,DatetimePicker,Toast} from 'mint-ui';
	export default{
		name:'on_apply',
		data(){
			return{
				on_company:'',//公司名称
				on_startDate:'',//开始时间
				on_endTime:'',//结束时间
				on_msDate_hide:'',//面试日期
				on_msDate_show:'',//面试日期
				on_appointStart_hide:'',//预约开始时间
				on_appointStart_show:'',//预约开始时间
				on_appointEnd_hide:'',//预约结束时间
				on_appointEnd_show:'',//预约结束时间
				ms_time:'',//面试时长
				ms_title:'',//面试主题
				ms_job:'',//面试职位
				ms_people:'',//面试人数
			}
		},
		created(){
			this.on_msDate_hide = new Date();
			this.on_appointStart_hide = new Date();
			this.on_appointEnd_hide = new Date();
			this.on_endTime = new Date('2100-01-01');
			this.on_startDate = new Date();
			this.myfun.getAxios({path:'/app/applicationMsg'},res=>{
				console.log(res,'applicationMsg');
				this.on_company = res.content;
			})
		},
		methods:{
			//显示
			myshow(str){
				this.$refs[str].open();
			},
 			chooseDatatime(hideAttr,showAttr){
 				this[showAttr] = this.myfun.getMyDate(this[hideAttr],true);
 			},
 			//提交
 			save(){
 				
 				if(!this.ms_time || !this.ms_title || !this.ms_job || !this.ms_people || !this.on_appointStart_show || !this.on_appointEnd_show || !this.on_msDate_show){
 					return	MessageBox('提示','信息不能为空！');
 				}
 				var appointStart = this.myfun.timeToTimestamp(this.on_appointStart_show);
 				var appointEnd = this.myfun.timeToTimestamp(this.on_appointEnd_show);
 				var msDate = this.myfun.timeToTimestamp(this.on_msDate_show);
 				if(appointStart >= appointEnd){
 					return	MessageBox('提示','预约开始时间不能大于或等于结束时间！');
 				}
 				else if(appointEnd >= msDate){
 					return	MessageBox('提示','面试时间必须在预约结束后进行！');
 				}else if(!this.$intNumber.test(this.ms_people)){
 					return	MessageBox('提示','招聘人数必须是整数！');
 				}else if(!this.$intNumber.test(this.ms_time)){
 					return	MessageBox('提示','面试时间必须是整数！');
 				}
 				var postData = {
 					'spApplication.sp_application_company':this.on_company,
 					'spApplication.sp_application_title':this.ms_title,
 					'spApplication.sp_application_position':this.ms_job,
 					'spApplication.sp_application_number':this.ms_people,
 					'spApplication.sp_application_start_time':this.on_msDate_show,
 					'spApplication.sp_application_bespoke_start_time':this.on_appointStart_show,
 					'spApplication.sp_application_bespoke_end_time':this.on_appointEnd_show,
 					'spApplication.sp_application_every_time':this.ms_time,
 				}
 				this.myfun.postAxios({path:'/app/addApplication'},postData,res=>{
 					this.$router.push({path:'on_applyList',query:{state:1}});
 					Toast(res.msg);
 				})
 			}
		}
	}
</script>

<style lang="less" scoped="scoped">
#on_apply{
	.btn{width: 100%;position: fixed;margin: 0;left: 0;bottom: 0;top: auto;border-radius:0 ;}
	.msg{
    	.link a{float: right;}
        .inputBox{
        	border-bottom: 1px solid #e1e1e1;
            padding-left:30px;
            height: 90px;
            width: 100%;
            display: flex;
            span{flex: 3;line-height: 90px;}
            input{border: none;flex: 10;padding: 0 10px;margin-bottom: 2px;}
        }
        .tips{height: 50px;line-height: 50px;color: #B5B5B5;background: #F5F5F5;font-size: 26px;padding: 0 30px;}
        margin-top: 30px;
        background:#fff;
    } 
    .picker-selected{overflow: auto!important;}
}
</style>